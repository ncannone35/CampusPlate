import MealPlan from "@/dashboard/components/mealPlan";

const MealHistory = ({}) => {
  return (
    <>
      <div className="flex flex-col">
        <div
          id="headerContainer"
          className="flex flex-col border- py-[55px] space-y-[10px] border-b-[0.11rem] border-heavy"
        >
          {/* <h1 className="text-2xl font-semibold text-black">Home</h1> */}
          <h1 className="text-3xl font-semibold text-black">Meal History</h1>

          <h2 className="text-2xl font-semibold text-blacktext">
            Today is Friday, November 3
          </h2>

          <div
            id="instruction"
            className="flex flex-row justify-between border- items-center w-[50%]"
          >
            <h1 className="text-xl border-">
              Your past meal records are below
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};
export default MealHistory;
