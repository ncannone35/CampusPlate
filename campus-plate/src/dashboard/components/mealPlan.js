
import Image from "next/image";

const MealPlan = ({meal}) => {


    

    return (
      <div className="flex flex-col space-y-[20px] border-">
        <div id="breakfast" className="flex flex-col relative ">
          <Image
            src="/breakfast_long.avif"
            width={300}
            height={400}
            className="h-full rounded-2xl"
          />
          <div
            id="modal"
            className="w-[300px] h-full absolute bg-black opacity-50 z-0 rounded-2xl"
          >
            {" "}
          </div>
          <div className="w-[300px] h-full z-30 absolute flex flex-col  items-center justify-center space-y-[15px] ">
            <h1 className="font-semibold text-3xl text-white w-[150px] tracking-wide capitalize">
              {" "}
              {meal}
            </h1>
            <div
              id="nutrition"
              className="text-xl text-white flex flex-col space-y-[px] border-[] w-[150px]"
            >
              <h1> Calories: 400 </h1>
              <h1> Protein: 20g </h1>
              <h1> Fat: 20g </h1>
              <h1> Carbs: 20g </h1>
            </div>
          </div>
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


}


const IndividualMeal = ({meal}) => {


    return (


        <></>
    );
}

export default MealPlan;