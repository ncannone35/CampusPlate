import Image from "next/image";
import classNames from "classnames";

const MealPlan = ({ meal }) => {
  return (
    <div className="flex border-">
      <div id="breakfast" className="flex flex-col relative border-">
        <Image
          src="/breakfast_long.avif"
          width={300}
          height={400}
          className="h-full rounded-2xl w-[300px]"
        />
        <div
          id="modal"
          className="w-full h-full absolute bg-black opacity-50 z-0 rounded-2xl"
        >
          {" "}
        </div>
        <div className="w-[300px] h-full z-30 absolute flex flex-col  items-center justify-center space-y-[15px] ">
          <h1 className="font-semibold text-3xl text-white w-[150px] tracking-wide capitalize">
            {meal.time.split(" ")[0]}
          </h1>
          <div
            id="nutrition"
            className="text-xl text-white flex flex-col space-y-[px] border-[] w-[150px]"
          >
            <h1> Calories: {meal.calories} </h1>
            <h1> Protein: {meal.protein}g </h1>
            <h1> Carbs: {meal.carbs}g </h1>
            <h1> Fat: {meal.fat}g </h1>
          </div>
        </div>
      </div>

      <div id="ingredientsWrapper" className="border- w-2/3 px-[20px]">
        <ul id="ingredients" className="flex flex-col border- space-y-[10px]">
          {meal.ingredients.map((item, index) => (
            <li
              className={classNames(
                "border- px-2 py-4 flex justify-between rounded-xl",
                index % 2 == 0 ? "bg-bgColor" : "bg-standout"
              )}
            >
              <a className="font-semibold">{item}</a> <a> I had this </a>
            </li>
          ))}
        </ul>
      </div>

      {/* <div id="lunch" className="flex flex-col relative">
          <Image src="/lunch.jpeg" width={200} height={200} className="" />
          <div
            id="modal"
            className="w-[200px] h-[183px] absolute bg-black opacity-40"
          >
            {" "}
          </div>
          <h1 className="font-semibold text-xl absolute text-white">
            {" "}
            Lunch{" "}
          </h1>
        </div>

        <div id="Dinner" className="flex flex-col relative">
          <Image src="/dinner1.jpeg" width={200} height={200} className="" />
          <div
            id="modal"
            className="w-[200px] h-[200px] absolute bg-black opacity-40"
          >
            {" "}
          </div>
          <h1 className="font-semibold text-xl absolute text-white">
            {" "}
            Dinner{" "}
          </h1>
        </div> */}
    </div>
  );
};

const IndividualMeal = ({ meal }) => {
  return <></>;
};

export default MealPlan;
