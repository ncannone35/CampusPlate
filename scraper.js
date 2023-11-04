const request = require('sync-request')
const fs = require('fs').promises
const cheerio = require('cheerio')
let recipeUrl = 'https://dining.rochester.edu/wp-content/themes/nmc_dining/ajax-content/recipe.php?recipe='
let mealsUrl = 'https://dining.rochester.edu/locations/douglass-dining/?date='

function currDateString() {
    let today = new Date();
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
    let day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}


generateNutritionFile('nutrition.json')

async function generateNutritionFile(path) {
    console.log("Generating nutrition file...this will take a minute")
    await fs.writeFile(path, JSON.stringify(getMealsByTime(), undefined, 4))
    console.log("All done")
}

async function readNutritionFile(path) {
    let data = await fs.readFile(path, 'binary')
    return Buffer.from(data).toString()
}

function getMealsByTime() {
    let url = mealsUrl + currDateString()
    let res = request('GET', url)
    let data = res.body.toString()
    const $ = cheerio.load(data)

    let times = []
    $('#menu-tabs').find('.c-tabs-nav__link-inner').each((i, elm) => {
        times.push({
            label: $(elm).text(),
            places: []
        })
    })

    $('#menu-tabs').find('.c-tab').each((i, elm) => {
        let $n = $(elm)
        $n.find('[id^="menu-station-data"]').each((j, elm2) => {
            let $b = $(elm2)

            let nn = $b.children(":first").children(":first").text();
            times[i].places.push({ name: '', meals: [] })
            $b.find('a.show-nutrition').each((k, elm3) => {
                let $c = $(elm3)
                times[i].places[j].meals.push({
                    name: $c.text(),
                    id: $c.attr('data-recipe'),
                    info: getRecipeAtIndex($c.attr('data-recipe'))
                })
            })
            /*console.log(times[i])
            for(let place of times[i].places){
              console.log(place)
            }
            */
        })
        $n.find('.toggle-menu-station-data').each((k, em) => {
            times[i].places[k].name = $(em).text()
        })

    })

    return times


}


function getRecipeAtIndex(i) {

    let res = request('POST', `${recipeUrl}${i}`)
    let data = JSON.parse(res.getBody('utf8'))
    if (!data.success) return {}
    //we don't like whitespace in this household
    data.html = data.html.replace(/\s/g, '')


    //fuck html, lets just hope that the responses are consistent (fingers crossed emoji)
    let name = data.html.split('<h2>')[1].split('</h2>')[0]
    let protein = data.html.split('Protein</b>')[1].split('</th>')[0]
    let cals = data.html.split('Calories')[1]
    let fat = data.html.split('Total Fat</b>')[1].split('</th>')[0]
    let carbs = data.html.split('Total Carbohydrates</b>')[1].split('</th>')[0]
    cals = cals.split('</th>')[0]
    cals = cals.slice(4)


    let recipe = {
        name: name,
        protein: protein,
        calories: parseInt(cals),
        fat: fat,
        carbs: carbs
    }

    return recipe

}

module.exports = {

    getRecipeAtIndex,
    generateNutritionFile,
    readNutritionFile

}
