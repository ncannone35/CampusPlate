import classNames from "classnames";

const ViewMealTab = ({ meals, mealSelectd, setMealSelected }) => {
  return (
    <div className="flex flex-row space-x-[50px] border- w-[355px] sm:w-[500px] lg:w-full overflow-x-auto py-[40px] border- px-[10px]">
      {meals?.map((meal, index) => (
        <div key={index} className="">
          {index === 0 && (
            // Render something for index 1
            <a
              onClick={() => setMealSelected(index)}
              className={classNames(
                "flex flex-col border-[0.8px] border-bgColor space-y-[10px] px-[10px] py-[10px] w-[120px] rounded-3xl items-center justify-center transition hover:cursor-pointer shadow-xl	 ",
                mealSelectd === index
                  ? "bg-standout"
                  : "bg-white hover:bg-bgColor hover:scale-110"
              )}
            >
              <a className="border-[1.5px] border-bgColor bg-white flex items-center justify-center py-[10px] px-[15px] rounded-[300px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-egg-fried"
                >
                  <circle cx="11.5" cy="12.5" r="3.5" />
                  <path d="M3 8c0-3.5 2.5-6 6.5-6 5 0 4.83 3 7.5 5s5 2 5 6c0 4.5-2.5 6.5-7 6.5-2.5 0-2.5 2.5-6 2.5s-7-2-7-5.5c0-3 1.5-3 1.5-5C3.5 10 3 9 3 8Z" />
                </svg>
              </a>
              <h1 className="text-lg capitalize tracking-wide">
                {" "}
                {meal?.time.split(" ")[0]}
              </h1>
            </a>
          )}
          {index === 1 && (
            <a
              onClick={() => setMealSelected(index)}
              className={classNames(
                "flex flex-col border-[0.8px] border-bgColor space-y-[10px] px-[10px] py-[10px] w-[120px] rounded-3xl items-center justify-center transition hover:cursor-pointer shadow-xl	 ",
                mealSelectd === index
                  ? "bg-standout"
                  : "bg-white hover:bg-bgColor hover:scale-110"
              )}
            >
              {" "}
              <a className="border-[1.5px] border-bgColor bg-white flex items-center justify-center py-[10px] px-[15px] rounded-[300px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-salad"
                >
                  <path d="M7 21h10" />
                  <path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z" />
                  <path d="M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1" />
                  <path d="m13 12 4-4" />
                  <path d="M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2" />
                </svg>
              </a>
              <h1 className="text-lg capitalize tracking-wide">
                {" "}
                {meal?.time.split(" ")[0]}
              </h1>{" "}
            </a>
          )}
          {index === 2 && (
            <a
              onClick={() => setMealSelected(index)}
              className={classNames(
                "flex flex-col border-[0.8px] border-bgColor space-y-[10px] px-[10px] py-[10px] w-[120px] rounded-3xl items-center justify-center transition hover:cursor-pointer shadow-xl	 ",
                mealSelectd === index
                  ? "bg-standout"
                  : "bg-white hover:bg-bgColor hover:scale-110"
              )}
            >
              {" "}
              <a className="border-[1.5px] border-bgColor bg-white flex items-center justify-center py-[10px] px-[15px] rounded-[300px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-pizza"
                >
                  <path d="M15 11h.01" />
                  <path d="M11 15h.01" />
                  <path d="M16 16h.01" />
                  <path d="m2 16 20 6-6-20A20 20 0 0 0 2 16" />
                  <path d="M5.71 17.11a17.04 17.04 0 0 1 11.4-11.4" />
                </svg>
              </a>
              <h1 className="text-lg capitalize tracking-wide">
                {" "}
                {meal?.time.split(" ")[0]}
              </h1>{" "}
            </a>
          )}
          {index !== 1 && index !== 2 && index !== 0 && (
            <a
              onClick={() => setMealSelected(index)}
              className={classNames(
                "flex flex-col border-[0.8px] border-bgColor space-y-[10px] px-[10px] py-[10px] w-[120px] rounded-3xl items-center justify-center transition hover:cursor-pointer shadow-xl	 ",
                mealSelectd === index
                  ? "bg-standout"
                  : "bg-white hover:bg-bgColor hover:scale-110"
              )}
            >
              {" "}
              <a className="border-[1.5px] border-bgColor bg-white flex items-center justify-center py-[10px] px-[15px] rounded-[300px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-sandwich"
                >
                  <path d="M3 11v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3" />
                  <path d="M12 19H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3.83" />
                  <path d="m3 11 7.77-6.04a2 2 0 0 1 2.46 0L21 11H3Z" />
                  <path d="M12.97 19.77 7 15h12.5l-3.75 4.5a2 2 0 0 1-2.78.27Z" />
                </svg>
              </a>
              <h1 className="text-lg capitalize tracking-wide">
                {" "}
                {meal?.time.split(" ")[0]}
              </h1>{" "}
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default ViewMealTab;
