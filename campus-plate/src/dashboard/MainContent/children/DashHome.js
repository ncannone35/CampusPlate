import MealPlan from "@/dashboard/components/mealPlan";
import { useState } from "react";
import ViewMealTab from "@/dashboard/components/viewMealTab";
import axios from "axios";
import Loading from "@/components/navbar/loading";
import classNames from "classnames";
import PreferenceBarModal from "@/dashboard/PreferenceBar/prefBar";

const DashHome = ({ preferences, setIsPrefbarOpen }) => {
  const [date, setDate] = useState(new Date());

  const mealsTesting = {
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

  const [meals, setMeals] = useState(null);

  const [isGenerating, setIsGenerating] = useState(false);

  const [showPreference, setShowPreference] = useState(false);

  const handleFirstGenClick = () => {
    setShowPreference(true);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    // setIsPrefbarOpen(false);

    // const proteinGoal = preferences?.calories;
    // const caloriesGoal = preferences?.protein;
    // console.log(proteinGoal);
    // console.log(caloriesGoal);
    setIsGenerating(true);
    try {
      const request = {};
      const proteinGoal = preferences.protein;
      const caloriesGoal = preferences.calories;
      console.log(proteinGoal);
      console.log(caloriesGoal);
      const { data } = await axios.get("/api/generatemeal", {
        params: { GOAL_PROTEIN: proteinGoal, GOAL_CALORIES: caloriesGoal },
      });
      if (data) {
        const randomNumber = Math.floor(Math.random() * 4);
        // console.log(randomNumber)
        setMeals({ ...data, randomNumber });
        // setMeals(data);
      }
    } catch (error) {
      console.log("something is wrong");
    }
    setIsGenerating(false);
  };

  return (
    <>
      <div className="flex flex-col relative">
        <div
          id="headerContainer"
          className="flex flex-col border- pt-[55px] pb-[40px] space-y-[10px] border-b-[0.11rem] border-heavy"
        >
          {/* <h1 className="text-2xl font-semibold text-black">Home</h1> */}
          <h1 className="text-3xl font-semibold text-black">
            What should I eat today?
          </h1>

          <h2 className="text-2xl font-semibold text-blacktext">
            Today is {date.toDateString()}
          </h2>

          <div className="h-[176px] border- flex items-center w-full border-">
            <section
              className={classNames(
                "transition duration-1000	",
                meals !== null ? "opacity-1" : "opacity-0"
              )}
            >
              <ViewMealTab
                meals={meals?.foods}
                mealSelectd={mealSelected}
                setMealSelected={setMealSelected}
              />
              {/* {meals !== null && (
                <ViewMealTab
                  meals={meals.foods}
                  mealSelectd={mealSelected}
                  setMealSelected={setMealSelected}
                />
              )} */}
            </section>
          </div>

          <div
            id="instruction"
            className="flex flex-row justify-between border- items-center max-w-[850px] h-[60px]"
          >
            <h1 className="text-xl border-">
              {meals === null ? (
                <> Go generate your meal plans for the day!</>
              ) : (
                <> Your suggested meal plan is below</>
              )}
            </h1>

            <div
              id="genAndLoad"
              className="flex flex-row border- space-x-[10px] items-center justify-center "
            >
              <div
                className={classNames(
                  "transition duration-700	",
                  isGenerating ? "opacity-1" : "opacity-0"
                )}
              >
                <Loading height={60} width={60} />{" "}
              </div>
              {/* {isGenerating && <Loading height={60} width={60} />} */}
              <button
                onClick={handleGenerate}
                className="tracking-widest text-lg font-semibold border- h-[40px] px-2 rounded-3xl bg- text-black hover:text-white bg-white hover:bg-[#fbbf24] transition border-[3px] border-bgColor hover:scale-110"
              >
                Generate{" "}
              </button>
            </div>
          </div>
        </div>

        <div id="mealPlanSection" className="border- mt-[20px]">
          <div
            className={classNames(
              "transition duration-1000	",
              meals !== null ? "opacity-1" : "opacity-0"
            )}
          >
            {/* <MealPlan meal={meals?.foods?.[mealSelected]} /> */}
            <MealPlan
              meal={meals?.foods?.[mealSelected]}
              random={meals?.randomNumber}
            />
          </div>
          {/* {meals !== null && <MealPlan meal={meals?.foods?.[mealSelected]} />} */}
        </div>
      </div>
    </>
  );
};
export default DashHome;
