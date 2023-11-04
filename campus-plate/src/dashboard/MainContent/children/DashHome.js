import MealPlan from "@/dashboard/components/mealPlan";
import { useState } from "react";
import ViewMealTab from "@/dashboard/components/viewMealTab";


const DashHome = ({preferences}) => {

    const [date, setDate] = useState(new Date());

    const meals=[

        "breakfast", "lunch", "dinner", "meal4"
    ]

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
            <ViewMealTab meals={meals} mealSelectd={mealSelected} setMealSelected={setMealSelected} />
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
          <MealPlan meal={meals[mealSelected]}/>
        </div>
      </div>
    </>
  );
};
export default DashHome;


    const meals = {
      foods: [
        {
          time: "Breakfast (8am-10:30am)",
          place: "Street",
          name: "Buttermilk Biscuit",
          calories: 200,
          protein: 5,
          carbs: 29,
          fat: 8,
        },
        {
          time: "Breakfast (8am-10:30am)",
          place: "Bistro Saute",
          name: "Egg",
          calories: 180,
          protein: 15,
          carbs: 1,
          fat: 12,
        },
        {
          time: "Continental (7am-8am)",
          place: "Wok",
          name: "Steel Cut Oatmeal",
          calories: 200,
          protein: 0,
          carbs: 36,
          fat: 4,
        },
        {
          time: "Dinner (5pm-8pm)",
          place: "Wok",
          name: "Coconut Jasmine Rice",
          calories: 190,
          protein: 3,
          carbs: 35,
          fat: 3,
        },
        {
          time: "Dinner (5pm-8pm)",
          place: "Wok",
          name: "Coconut Jasmine Rice",
          calories: 190,
          protein: 3,
          carbs: 35,
          fat: 3,
        },
        {
          time: "Late Lunch (2:30pm-3:30pm)",
          place: "Soup",
          name: "Cream of Mushroom Soup",
          calories: 160,
          protein: 6,
          carbs: 13,
          fat: 7,
        },
        {
          time: "Late Lunch (2:30pm-3:30pm)",
          place: "Soup",
          name: "Cream of Mushroom Soup",
          calories: 160,
          protein: 6,
          carbs: 13,
          fat: 7,
        },
        {
          time: "Late Lunch (2:30pm-3:30pm)",
          place: "Bistro",
          name: "Pulled Pork",
          calories: 230,
          protein: 22,
          carbs: 0,
          fat: 15,
        },
        {
          time: "Lunch (11:30am-2:30pm)",
          place: "Bistro Oven",
          name: "Flower City Sausage & Pepperoni Pizza",
          calories: 160,
          protein: 7,
          carbs: 15,
          fat: 7,
        },
        {
          time: "Lunch (11:30am-2:30pm)",
          place: "Allgood",
          name: "White Rice",
          calories: 120,
          protein: 2,
          carbs: 27,
          fat: 0,
        },
        {
          time: "Lunch (11:30am-2:30pm)",
          place: "Bistro Oven",
          name: "Flower City Sausage & Pepperoni Pizza",
          calories: 160,
          protein: 7,
          carbs: 15,
          fat: 7,
        },
        {
          time: "Lunch (11:30am-2:30pm)",
          place: "Bistro Oven",
          name: "Flower City Sausage & Pepperoni Pizza",
          calories: 160,
          protein: 7,
          carbs: 15,
          fat: 7,
        },
        {
          time: "Lunch (11:30am-2:30pm)",
          place: "Allgood",
          name: "Grilled Chicken Breast",
          calories: 120,
          protein: 22,
          carbs: 0,
          fat: 2,
        },
        {
          time: "Lunch (11:30am-2:30pm)",
          place: "Bistro Oven",
          name: "Flower City Sausage & Pepperoni Pizza",
          calories: 160,
          protein: 7,
          carbs: 15,
          fat: 7,
        },
        {
          time: "Lunch (11:30am-2:30pm)",
          place: "Fruit & Yogurt Bar",
          name: "Nonfat Plain Greek Yogurt",
          calories: 110,
          protein: 19,
          carbs: 6,
          fat: 0,
        },
      ],
      numFoods: 15,
    };
