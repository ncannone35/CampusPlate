import Image from "next/image";
import classNames from "classnames";
import { useState, useEffect } from 'react';

const MealPlan = ({ meal, random }) => {
  const [breakfastImage, setBreakfastImage] = useState('');
  const [lunchImage, setLunchImage] = useState('');
  const [dinnerImage, setDinnerImage] = useState('');

  useEffect(() => {
    const images = {
      breakfast: ['/breakfast.jpeg', '/breakfast2.jpg', '/breakfast3.jpg', '/breakfast4.jpg'],
      lunch: ['/lunch.jpeg', '/lunch2.jpg', '/lunch3.jpg', '/lunch4.jpg'],
      dinner: ['/dinner1.jpeg', '/dinner2.jpg', '/dinner.webp', '/dinner4.jpg'],
    };

    // Randomize images for each meal
    setBreakfastImage(images.breakfast[random]);
    setLunchImage(images.lunch[random]);
    setDinnerImage(images.dinner[random]);
  }, [random]);

  const mealImage = meal?.time.includes("Breakfast")
    ? breakfastImage
    : meal?.time.includes("Brunch")
    ? lunchImage
    : dinnerImage;

  return (
    <div className="flex border- max-w-[850px]">
      <div
        id="breakfast"
        className="flex flex-col relative border- w-[400px] h-[420px]"
      >
        <Image
          src={mealImage}
          width={300}
          height={500}
          className="rounded-2xl w-full object-cover h-full"
        />
        <div
          id="modal"
          className="w-full h-full absolute border- bg-black opacity-50 z-0 rounded-2xl"
        >
          {" "}
        </div>
        <div className="w-full h-full z-30 absolute flex flex-col border- items-center justify-center">
          <div
            id="nutrition"
            className="text-xl text-white flex flex-col space-y-[px] border- max-w-[170px] w-full"
          >
            <h1 className="font-semibold text-3xl mb-[10px] border- text-white  tracking-wide capitalize">
              {meal?.time.split(" ")[0]}
            </h1>
            <h1> Calories: {meal?.calories} </h1>
            <h1> Protein: {meal?.protein}g </h1>
            <h1> Carbs: {meal?.carbs}g </h1>
            <h1> Fat: {meal?.fat}g </h1>
          </div>
        </div>
      </div>

      <div id="ingredientsWrapper" className="border- w-full pl-[20px]">
        <ul id="ingredients" className="flex flex-col border- space-y-[10px]">
          {(meal?.ingredients || []).map((item, index) => (
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
