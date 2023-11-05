'use strict'
const GA = require('./ga.js')
require('dotenv').config()

const recipes = require('./modified_nutrition.json')

let possibles = []
let population = []
var { POP_SIZE = 1000, MAX_ITEMS = 50, GOAL_CALORIES = 2500, GOAL_CARBS = 200, GOAL_FAT = 50, MIN_CALORIES = 50, NUM_GEN = 250, GOAL_PROTEIN = 150, MUTATION_CHANCE = 0.0025 } = process.env

GOAL_CALORIES = process.argv[2] || GOAL_CALORIES
GOAL_CARBS = (GOAL_CALORIES * .5) / 4
GOAL_FAT = (GOAL_CALORIES) * .275 / 9

console.log("Goal calories:", parseInt(GOAL_CALORIES))
console.log("Goal protein:", parseInt(GOAL_PROTEIN))
console.log("Population size:", POP_SIZE)
console.log("Number of generations:", NUM_GEN)
console.log("Mutation chance:", MUTATION_CHANCE)

// sanitize recipies for GA
for (let time of recipes) {
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
                ingredients:  meal.ingredients
            })

        }
    }
}
for (let i = 0; i < POP_SIZE; i++) {
    population.push(randomDay())
}


function randomDay() {
    let numFoods = 5
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


function fitness(h) {
    let variety = h.numFoods
    for (let i = 0; i < h.foods.length; i++) {
        for (let j = 0; j < h.foods.length; j++) {
            if (i == j) continue
            if (h.foods[i].place== h.foods[j].place) {
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
    if (protein > GOAL_PROTEIN) protein = GOAL_PROTEIN

    const diffCalories = Math.abs(cals - GOAL_CALORIES);
    const diffProtein = Math.abs(protein - GOAL_PROTEIN);
    const diffFat = Math.abs(fat - GOAL_FAT);
    const diffCarbs = Math.abs(carbs - GOAL_CARBS);
    //process.exit(1)
    const totalDifference = (GOAL_CALORIES - diffCalories) * (GOAL_PROTEIN - diffProtein) * ((GOAL_FAT - diffFat) / 100) * ((GOAL_CARBS - diffCarbs) / 100)
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
    let calDiff = (GOAL_CALORIES - Math.abs(GOAL_CALORIES - cals))
    let f = ((calDiff + ((calDiff / 2) * (variety / h.numFoods))) * protein) + (100/diffCarbs) + (100/diffFat)
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
        if(Math.random() < 0.1){
            a.foods = a.foods.splice(-1)
        }
    }
    return a;
}


GA.init({ population, fitness, selection, crossover, random: randomDay, mutation, mchance: MUTATION_CHANCE })

console.log("Generating a meal...")

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
    console.log(i.time, "|", i.name, "|", i.place, "|", "Calories:", i.calories, "Protein:", i.protein, "Carbs", i.carbs, "Fat", i.fat)
    c += i.calories
    p += i.protein
    ca += i.carbs
    f += i.fat
}


console.log()
console.log("GOAL Calories", GOAL_CALORIES)
console.log("GOAL Protein", GOAL_PROTEIN)
console.log("GOAL Carbs", GOAL_CARBS)
console.log("GOAL Fat", GOAL_FAT)
console.log("--------")

console.log("Calories:", c)
console.log("Protein:", p)
console.log("Carbs:", ca)
console.log("Fat:", f)
console.log("Mutations:", GA.mCount())

//console.log(JSON.stringify(pop[0], null, 2))


