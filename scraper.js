const request = require('sync-request')
const fs = require('fs').promises
const cheerio = require('cheerio')
let recipeUrl = 'https://dining.rochester.edu/wp-content/themes/nmc_dining/ajax-content/recipe.php?recipe='
let mealsUrl = 'https://dining.rochester.edu/locations/douglass-dining/?date='

let vegitarian = "M75.044 82.359s66.457 76.966 87.043 209.62l24.035.062c5.324-29.491 12.661-58.378 21.294-87.043 4.291-14.327 12.032-26.49 18.335-39.851 4.932-10.513 19.799-8.818 29.447-11.689 12.433-3.696 26.305-11.214 32.563-23.045 2.933-5.621 4.361-11.934 5-18.196.307-3.097.35-6.215.307-9.289-.043-1.778-1.174-6.55-.535-7.933 0 0 2.724-5.823 5.822-6.567 0 0-25.934-7.452-55.03 2.54 0 0-34.945 8.43-42.379 37.089 0 0-7.408 20.2 3.019 26.411 0 0 36.18-44.107 41.979-39.441 0 0-29.569 36.76-40.06 51.092 0 0-22.222 46.068-31.617 80.144 0 0-33.345-152.853-99.223-163.904"
let vegan = "M202.735 195.161c-1.357 0-2.458-1.101-2.458-2.458 0-1.357 1.101-2.458 2.458-2.458h26.661c.72-2.291 1.358-4.49 1.906-6.58h-19.854c-1.356 0-2.457-1.102-2.457-2.458 0-1.357 1.101-2.458 2.457-2.458h21.01c.495-2.406.826-4.61.974-6.581h-39.578c-1.356 0-2.457-1.101-2.457-2.458 0-1.356 1.101-2.457 2.457-2.457h39.57c-1.061-21.13-14.355-39.031-32.971-46.724-5.618 2.88-11.885 4.414-18.399 4.414-.666 0-1.341-.017-2.007-.049-.666.032-1.339.049-2.005.049-6.514 0-12.781-1.534-18.399-4.414-19.412 8.021-33.075 27.131-33.075 49.439 0 29.536 53.48 127.998 53.48 127.998s33.924-62.457 47.734-102.805h-25.047M167.183 90.833c0 11.445 4.984 21.699 12.865 28.801 7.881-7.102 12.865-17.356 12.865-28.801 0-11.443-4.984-21.698-12.865-28.799-7.881 7.101-12.865 17.356-12.865 28.799"
let gluten = "M248.285 236.971c3.722-9.46 4.832-19.71 3.309-29.641-9.93-1.522-20.18-.413-29.64 3.309l-4.649-4.649c6.628-2.782 12.844-6.847 18.242-12.245 13.366-13.367 18.709-31.712 16.047-49.065-17.354-2.662-35.699 2.68-49.066 16.047-5.397 5.397-9.463 11.614-12.245 18.242l-7.615-7.615v-41.071c0-1.464-1.186-2.649-2.649-2.649-1.464 0-2.65 1.185-2.65 2.649v35.772l-14.833-14.833c3.876.744 7.857.819 11.754.221 1.602-10.443-1.613-21.481-9.656-29.524-8.043-8.043-19.081-11.257-29.524-9.655-.597 3.897-.523 7.877.222 11.754L58.507 47.193c-3.936 3.603-7.711 7.378-11.314 11.315l88.795 88.795c-8.934-3.158-18.491-4.047-27.772-2.623-2.662 17.353 2.68 35.698 16.047 49.065 13.366 13.366 31.712 18.709 49.066 16.047 1.423-9.28.534-18.838-2.623-27.772l3.075 3.075 1.588 1.589 2 2v105.712c0 1.463 1.186 2.65 2.65 2.65 1.463 0 2.649-1.187 2.649-2.65V193.982l3.29 3.289c-.278 4.176-.113 8.376.523 12.521 4.144.636 8.345.802 12.521.523l8.578 8.579c-1.748 1.379-3.438 2.87-5.052 4.484-13.366 13.366-18.709 31.711-16.047 49.065 17.354 2.662 35.699-2.68 49.066-16.047 1.613-1.614 3.104-3.303 4.484-5.051l61.462 61.462c3.936-3.603 7.711-7.378 11.314-11.315l-64.522-64.521"

vegitarian = vegitarian.replace(/\s+/g, '')
vegan = vegan.replace(/\s+/g, '')
gluten = gluten.replace(/\s+/g, '')

// console.log(vegitarian)
// console.log(vegan)
// console.log(gluten)

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
            // let $child = $b.children
            // .find('div.recipe-icon-wrap')
            // console.log(nn)
            // $b.find('div.recipe-icon-wrap').each((k, elm4) => {
            //     // console.log(elm4.firstChild)
            //     let $child = elm4.children[0].children
            //     console.log($child)
            //     // console.log($wrap.children(":first").children(":first"))
            //     // console.log($wrap.children('svg').children('g').text())
            //     exit(1)
            // })
            // $b.find('div.recipe-icon-wrap').each((k, elm4) => {
            //     let $c = $(elm4)
            //     let dietary = []
            //     let combined_d = ''
            //     $c.find('path').each((x, elm5) => {
            //         let $g = $(elm5)
            //         let d = $g.attr('d').toString()
            //         d = d.replace(/\s+/g, '')
            //         combined_d+=d
            //     })
            //     combined_d.replace(/\s+/g, '')
            //     console.log(combined_d)
            //     if(combined_d.includes(vegan)) {
            //         dietary.push("vegan")
            //     }
            //     if(combined_d.includes(vegitarian)) {
            //         dietary.push("vegitarian")
            //     }
            //     if(combined_d.includes(gluten)) {
            //         dietary.push("gluten")

            //     }
            //     console.log(dietary)
            //     console.log()
            //     console.log()
            //     console.log()
            //     console.log()
            //     console.log()
            // }) 
            $b.find('a.show-nutrition').each((k, elm3) => {
                let $c = $(elm3)
                times[i].places[j].meals.push({
                    name: $c.text(),
                    id: $c.attr('data-recipe'),
                    info: getRecipeAtIndex($c.attr('data-recipe'))
                })
            })


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
    let dietary_restrictions = []
    if (!data.success) return {}

    data.html = data.html.replace(/\s/g, '')

    if(data.html.includes(vegan)) {
        dietary_restrictions.push("vegan")
    }
    if(data.html.includes(vegitarian)) {
        dietary_restrictions.push("vegitarian")
    }
    if(data.html.includes(gluten)) {
        dietary_restrictions.push("gluten")
    }

    let name = data.html.split('<h2>')[1].split('</h2>')[0]
    let protein = data.html.split('Protein</b>')[1].split('</th>')[0]
    let cals = data.html.split('Calories')[1]
    let fat = data.html.split('TotalFat</b>')[1].split('</th>')[0]
    let carbs = data.html.split('TotalCarbohydrate</b>')[1].split('</th>')[0]
    cals = cals.split('</th>')[0]
    cals = cals.slice(4)


    let recipe = {
        name: name,
        protein: protein,
        calories: parseInt(cals),
        fat: fat,
        carbs: carbs,
        dietary_restrictions: dietary_restrictions
    }

    return recipe

}

module.exports = {
    getMealsByTime,
    getRecipeAtIndex,
    generateNutritionFile,
    readNutritionFile

}
