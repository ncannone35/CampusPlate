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
        console.log(removed_items)
        // const combinations = generate_meal_combos(all_meals)
    }
}

function generate_meal_combos(inputList) {
    if (inputList.length === 0) {
    return [[]]; // Return an array containing an empty list as the base case.
  }

  const [currentObject, ...restObjects] = inputList;
  const combinationsOfRest = generate_meal_combos(restObjects);

  const result = [];

  for (const combination of combinationsOfRest) {
    for (let i = 0; i <= combination.length; i++) {
      const newCombination = [...combination.slice(0, i), currentObject, ...combination.slice(i)];
      result.push(newCombination);
      console.log(result)
    }
  }

  return result;

}