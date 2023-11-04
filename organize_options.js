'use strict'
const fs = require('fs').promises
const { write } = require('fs')
var nutrition = require('./nutrition.json')

// console.log(JSON.stringify(nutrition))

for(let meal_time of nutrition) {
    for(let place of meal_time.places) {
        if(!(place.name == 'Ice Cream')) {
            let all_meals = [...place.meals]
            let removed_items = []
            for (let i = 0; i < all_meals.length; i++){
                // get rid of 0 cal 0 protein items
                if(!(all_meals[i].info.protein == '0g' && all_meals[i].info.calories == 0)) {
                    // console.log(all_meals[i])
                    removed_items.push(all_meals[i])
                }
            }
            removed_items.sort((a,b) => a.calories - b.calories)
            let generated_meals = generate_possible_meals(removed_items)
            let new_meal_format = format_meals(generated_meals)
            place.meals = new_meal_format

        }
    }
}
writeJsonToFile(nutrition)

function writeJsonToFile(jsonObject, filename = 'modified_nutrition.json') {
  const jsonString = JSON.stringify(jsonObject, null, 2); // The second argument adds indentation for a more readable file

  fs.writeFile(filename, jsonString, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to the file:', err);
    } else {
      console.log(`JSON object has been written to ${filename}`);
    }
  });
}
function generate_possible_meals(meals_list) {
    let generated_meals = []
    const HIGH_CALORIE_THRESHOLD = 100
    let high_calorie_meals = []
    let low_calorie_meals = []
    for (let i = 0; i < meals_list.length; i++){
        let rice_cals = 0 
        let rice_protein = ''
        let rice_fat = ''
        let rice_carbs = ''
        let contains_rice = false
        if(meals_list[i].info.calories > 110) {
            if(meals_list[i].info.name.includes("Rice") ) {
                contains_rice = true
                rice_cals = meals_list[i].info.calories
                rice_carbs = meals_list[i].info.carbs 
                rice_protein = meals_list[i].info.protein
                rice_fat = meals_list[i].info.fat 

            }else {
                high_calorie_meals.push(meals_list[i])
            }
        if(contains_rice) {
            let rice = {
                name: 'Choice of Rice',
                info: {
                    calories: rice_cals,
                    protein: rice_protein,
                    fat: rice_fat,
                    carbs: rice_carbs
                }
            }
            high_calorie_meals.push(rice)
        }
        }
        else{
            low_calorie_meals.push(meals_list[i])
        }
    }
    let low_cal_combos = allCombinations(low_calorie_meals)
    for(let combos of low_cal_combos) {
        let high_cal_copy = high_calorie_meals
        let meal = high_cal_copy.concat(combos)
        generated_meals.push(meal)
    } 
    return generated_meals
}

function allCombinations(arr) {
  const result = [];

  function combine(prefix, subArray) {
    for (let i = 0; i < subArray.length; i++) {
      result.push([...prefix, subArray[i]]);
      combine([...prefix, subArray[i]], subArray.slice(i + 1));
    }
  }

  combine([], arr);

  return result;
}

function format_meals(meals) {
    let formatted_meals = []
    for(let i = 0; i < meals.length; i++) {
        let meal = meals[i]
        // concatenate ingredients of a meal, add all of the cals and protein up
        let ingredients = []
        let cals = 0
        let protein = '0g'
        let carbs = '0g'
        let fat = '0g'
        for(let ingredient of meal) {
            if(!(ingredient.name == 'Choice of Rice' && ingredients.includes('Choice of Rice'))) {
                ingredients.push(ingredient.name)
                cals = cals + ingredient.info.calories
                protein = addGrams([ingredient.info.protein, protein])
                carbs = addGrams([ingredient.info.carbs, carbs])
                fat = addGrams([ingredient.info.fat, fat])
            }
        }
        
        let meal_json = {
            ingredients: ingredients,
            calories: cals,
            protein: protein,
            carbs: carbs,
            fat: fat
        }
        formatted_meals.push(meal_json)
    }
    // console.log(formatted_meals)
    return formatted_meals
}

function addGrams(strings) {
  let totalGrams = 0;

  for (const str of strings) {
    const match = str.match(/(\d+)g/);
    if (match) {
      const grams = parseInt(match[1]);
      totalGrams += grams;
    }
  }
  return `${totalGrams}g`;
}