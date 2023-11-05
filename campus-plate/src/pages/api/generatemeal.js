'use strict'
const GA = require('../../lib/ga.js')

async function handler(req, res) {
    function fitness(h) {
        let g_calories = GOAL_CALORIES 
        let g_protein = GOAL_PROTEIN
        let g_fat = GOAL_FAT
        let g_carbs = GOAL_CARBS
        if(MEAL_TIME == 'Breakfast (9am-10:30am)'){
            g_calories = GOAL_CALORIES * .3
            g_protein = GOAL_PROTEIN* .3
            g_fat = GOAL_FAT* .3
            g_carbs = GOAL_CARBS* .3
        }
        else if(MEAL_TIME == 'Brunch (10:30am-2:30am)'){
            g_calories = GOAL_CALORIES * .3
            g_protein = GOAL_PROTEIN* .3
            g_fat = GOAL_FAT* .3
            g_carbs = GOAL_CARBS* .3
        }
        else if(MEAL_TIME == 'Dinner (5pm-8pm)'){
            g_calories = GOAL_CALORIES * .3
            g_protein = GOAL_PROTEIN* .3
            g_fat = GOAL_FAT* .3
            g_carbs = GOAL_CARBS* .3
        }
        let variety = h.numFoods
        for (let i = 0; i < h.foods.length; i++) {
            for (let j = 0; j < h.foods.length; j++) {
                if (i == j) continue
                if (h.foods[i].place == h.foods[j].place) {
                    variety -= 0.5
                }
            }
        }
        let cals = 0
        let protein = 0
        let carbs = 0
        let fat = 0
        for (let f of h.foods) {
            cals += f.calories
            protein += f.protein
            carbs += f.carbs
            fat += f.fat
        }
        if (protein > g_protein) protein = g_protein 

        const diffCalories = Math.abs(cals - g_calories);
        const diffProtein = Math.abs(protein - g_protein);
        const diffFat = Math.abs(fat - g_fat);
        const diffCarbs = Math.abs(carbs - g_carbs);
        //process.exit(1)
        const totalDifference = (g_calories - diffCalories) * (g_protein- diffProtein) * ((g_fat- diffFat) / 100) * ((g_carbs- diffCarbs) / 100)
        //return totalDifference
        const fit = (1 / diffCalories) + (1 / diffProtein) + (1 / diffFat) + (1 / diffCarbs)
        //return fit

        // Sum the differences
        // let calDiff = (GOAL_CALORIES - Math.abs(GOAL_CALORIES - cals))
        // let c = (calDiff + ((calDiff / 2) * (variety / h.numFoods)))
        // const totalDifference = (GOAL_CALORIES - diffCalories) * (GOAL_PROTEIN - diffProtein) * ((GOAL_FAT - diffFat) / 100) * ((GOAL_CARBS - diffCarbs) / 100) * (variety / h.numFoods)
        // return totalDifference
        // // Calculate fitness score, higher is better
        // // Adding 1 to prevent division by zero
        // const fitness = 1 / (1 + totalDifference);
        let calDiff = (g_calories- Math.abs(g_calories- cals))
        let f = ((calDiff + ((calDiff / 2) * (variety / h.numFoods))) * protein) + (100 / diffCarbs) + (100 / diffFat)
        return f


        //return fitness * (variety / h.numFoods)
    }

    function selection(pop) {
        return pop.slice(0, POP_SIZE / 4)
    }

    function randomFood(a) {
        return a.foods[Math.floor(Math.random() * a.foods.length)]
    }

    function crossover(a, b) {

        let n = {
            foods: []
        }
        n.numFoods = parseInt((a.numFoods + b.numFoods) / 2)

        for (let i = 0; i < n.numFoods; i++) {
            if (Math.random() < 0.5) {
                n.foods.push(randomFood(a))
            } else {
                n.foods.push(randomFood(b))
            }
        }
        return n

    }
    function mutation(a) {
        for (let i = 0; i < a.foods.length; i++) {
            if (Math.random() < 0.1) {
                let ind = parseInt(Math.random() * possibles.length)
                a.foods.push(possibles[ind])
            }
            if (Math.random() < 0.1) {
                a.foods = a.foods.splice(-1)
            }
        }
        return a;
    }
    function randomDay() {
        let numFoods = 2
        let day = {
            numFoods,
            foods: []
        }
        for (let i = 0; i < numFoods; i++) {
            let ind = parseInt(Math.random() * possibles.length)
            day.foods.push(possibles[ind])
        }
        return day

    }

    var recipes = await fetch('https://storage.googleapis.com/bucket-campusdining/nutrition.json')
    recipes = await recipes.json()
    var { POP_SIZE = 1000, MAX_ITEMS = 50, GOAL_CALORIES = 2500, GOAL_CARBS = 200, GOAL_FAT = 50, MIN_CALORIES = 50, NUM_GEN = 250, GOAL_PROTEIN = 150, MUTATION_CHANCE = 0.0025, MEAL_TIME = '' } = req.query
    let possibles = []
    let population = []
    // let pp = req.nextUrl.searchParams.get('protein') || 150
    // let cc = req.nextUrl.searchParams.get('calories') || 2500

    GOAL_CALORIES = process.argv[2] || GOAL_CALORIES
    // GOAL_CARBS = (GOAL_CALORIES * .5) / 4
    // GOAL_FAT = (GOAL_CALORIES) * .275 / 9
    // sanitize recipies for GA
    for (let time of recipes) {
        possibles = []
        MEAL_TIME = time.label
        console.log(time.label)
        if(time.label == 'Continental (8am-9am)') continue
        for (let place of time.places) {
            for (let meal of place.meals) {
                if (meal.info.calories < MIN_CALORIES) continue;
                possibles.push({
                    time: time.label,
                    place: place.name,
                    name: meal.name,
                    calories: meal.info.calories,
                    protein: parseInt(meal.info.protein),
                    carbs: parseInt(meal.info.carbs),
                    fat: parseInt(meal.info.fat),
                    ingredients: meal.ingredients
                })

            }
        }
        for (let i = 0; i < POP_SIZE; i++) {
            population.push(randomDay())
        }
        GA.init({ population, fitness, selection, crossover, random: randomDay, mutation, mchance: MUTATION_CHANCE })

        for (let i = 0; i < NUM_GEN; i++) {
            GA.evolve()
        }

        let pop = GA.getPop()
        let c = 0
        let p = 0
        let ca = 0
        let f = 0
        pop[0].foods.sort((a, b) => { return (`${a.time}`).localeCompare(b.time) })
        for (let i of pop[0].foods) {
            //console.log(i.time, "|", i.ingredients, "|", i.place, "|", "Calories:", i.calories, "Protein:", i.protein, "Carbs", i.carbs, "Fat", i.fat)
            c += i.calories
            p += i.protein
            ca += i.carbs
            f += i.fat
        }
        // res.status(200).json(pop[0])
        console.log(pop[0])
    }
}


handler({query:{}})