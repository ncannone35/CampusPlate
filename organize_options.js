'use strict'
var nutrition = require('./nutrition.json')

// console.log(JSON.stringify(nutrition))

for(let meal_time of nutrition) {
    for(let place of meal_time.places) {
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

        console.log(removed_items)
        // const combinations = generate_meal_combos(all_meals)
    }
}

function generate_possible_meals(meals_list) {
    let generated_meals = [[]]
    const HIGH_CALORIE_THRESHOLD = 100
    let high_calorie_meals = []
    let low_calorie_meals = []
    for (let i = 0; i < meals_list.length; i++){
        if(meals_list[i].info.calories > 110) {
            high_calorie_meals.push(meals_list[i])
        }
        else{
            low_calorie_meals.push(meals_list[i])
        }
    }
    let low_cal_combos = allCombinations(low_calorie_meals)
    for(let combos of low_cal_combos) {
        let high_cal_copy = high_calorie_meals
        let meal = high_cal_copy.concat(combos)
        generated_meals.concat(meal)
    } 
    console.log(generated_meals)
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
