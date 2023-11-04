import MealPlan from "@/dashboard/components/mealPlan";
import { useState } from "react";
import ViewMealTab from "@/dashboard/components/viewMealTab";

const DashHome = ({ preferences }) => {
  const [date, setDate] = useState(new Date());

  const meals = {
    foods: [
      {
        time: "Breakfast (9am-10:30am)",
        place: "Bistro Saute",
        calories: 365,
        protein: 34,
        carbs: 6,
        fat: 23,
        ingredients: [
          "Egg",
          "Turmeric Tofu Scramble",
          "Baby Spinach",
          "Diced Yellow Onion",
        ],
      },
      {
        time: "Brunch (10:30am-2:30pm)",
        place: "Wok",
        calories: 480,
        protein: 29,
        carbs: 47,
        fat: 18,
        ingredients: [
          "Choice of Rice",
          "Ground Beef Bulgogi",
          "Kimchi",
          "Pickled Radish",
        ],
      },
      {
        time: "Continental (8am-9am)",
        place: "Bistro Oven",
        calories: 540,
        protein: 30,
        carbs: 46,
        fat: 27,
        ingredients: [
          "Flower City Breakfast Sausage Pizza",
          "Flower City Breakfast Egg & Cheese Pizza",
          "Hard Cooked Egg",
          "Cantaloupe",
          "Pineapple",
        ],
      },
      {
        time: "Dinner (5pm-8pm)",
        place: "Street",
        calories: 595,
        protein: 38,
        carbs: 55,
        fat: 26,
        ingredients: [
          "Beef Taco Filling",
          "Seasoned Black Beans",
          "Seasoned Roasted Corn",
          "Diced Avocado",
          "Fire-Roasted Salsa",
          "Fresh Sliced Jalapenos",
        ],
      },
      {
        time: "Dinner (5pm-8pm)",
        place: "Bistro",
        calories: 520,
        protein: 36,
        carbs: 32,
        fat: 31,
        ingredients: [
          "Italian Pulled Pork",
          "Rosemary & Honey Roasted Carrots",
          "Shaved Parmesan",
        ],
      },
    ],
    numFoods: 5,
  };
  const [mealSelected, setMealSelected] = useState(0);

  return (
    <>
      <div className="flex flex-col">
        <div
          id="headerContainer"
          className="flex flex-col border- py-[55px] space-y-[10px] border-b-[0.11rem] border-heavy"
        >
          {/* <h1 className="text-2xl font-semibold text-black">Home</h1> */}
          <h1 className="text-3xl font-semibold text-black">
            What should I eat today?
          </h1>

          <h2 className="text-2xl font-semibold text-blacktext">
            Today is {date.toDateString()}
          </h2>

          <section className="py-[30px]">
            <ViewMealTab
              meals={meals.food}
              mealSelectd={mealSelected}
              setMealSelected={setMealSelected}
            />
          </section>

          <div
            id="instruction"
            className="flex flex-row justify-between border- items-center w-[50%]"
          >
            <h1 className="text-xl border-">
              Your suggested meal plan is below
            </h1>

            <button className="tracking-widest text-base font-semibold border- px-2 py-[2px] rounded-3xl bg- text-[#fbbf24] hover:text-white bg-white hover:bg-[#fbbf24] transition-colors border-2 border-heavy">
              {" "}
              Generate{" "}
            </button>
          </div>
        </div>

        <div id="mealPlanSection" className="border- mt-[20px]">
          <MealPlan meal={meals[mealSelected]} />
        </div>
      </div>
    </>
  );
};
export default DashHome;
