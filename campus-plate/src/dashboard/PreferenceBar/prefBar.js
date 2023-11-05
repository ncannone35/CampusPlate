import { useState } from "react";
import classNames from "classnames";

const PreferenceBarModal = ({
  handleCloseBar,
  handleGenerate,
  showPreference,
  preferences,
  setPreferences,
}) => {
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setPreferences({ ...preferences, [name]: checked });
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;

    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [id]: value,
    }));
  };

  return (
    <div id="prefBarModal" className="w-full h-full absolute sm:ml-[240px]  ">
      {/* handles onClick and close PrefBar */}
      <div
        id="bgModal"
        className="w-full h-full bg-black opacity-50 absolute z-0"
        onClick={() => handleCloseBar(false)}
      ></div>
      <div
        id="prefBar"
        className="flex w-full items- mt-[25vh] ml-[10vw] bg-red- bg- px-[20px] py-[]"
      >
        <div className="flex flex-col  w-[400px] bg-white z-30 rounded-lg b  px-[20px] pb-[30px] ">
          <div
            id="prefBarHeader"
            className="flex flex-row py-[20px] border-b-[0.11rem] border-heavy justify-between border-"
          >
            <h1 className="text-xl font-medium"> Dietary Preferences </h1>

            <a onClick={() => handleCloseBar(false)} className="hover:scale-150 hover:text-standout transition">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </a>
          </div>

          <div
            id="prefBarContent"
            className="overflow-y-auto border- py-[20px]"
          >
            {/* Checklist for dietary preferences */}
            <form>
              <div className="flex flex-col space-y-4 border- items- px-1">
                {/* {['Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Paleo'].map((preference) => (
                  <label key={preference} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name={preference.toLowerCase()}
                      checked={preferences[preference.toLowerCase()] || false}
                      onChange={handleCheckboxChange}
                    />
                    <span>{preference}</span>
                  </label>
                ))} */}
                <div>
                  <label
                    for="calories"
                    className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                  >
                    Calories goal
                  </label>
                  <input
                    id="calories"
                    value={preferences.calories}
                    type="number"
                    name="numberInput"
                    min="500"
                    max="3500"
                    className="transition w-1/2 px-4 py-2 border-[2px] border-bgColor placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-standout focus:border-standout"
                    onChange={handleInputChange}
                  />
                  {/* className="w-1/2 rounded-xl focus:outline-none focus:ring
                  focus:ring-standout" */}
                </div>
                <div>
                  <label
                    for="protein"
                    className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                  >
                    Protein goal
                  </label>
                  <input
                    id="protein"
                    value={preferences.protein}
                    type="number"
                    name="numberInput"
                    min="0"
                    max="500"
                    // style={{ outline: "none" }}
                    className="transition w-1/2 px-4 py-2 border-[2px] border-bgColor placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-standout focus:border-standout"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </form>
            {/* <button onClick={handleGenerate} className="">
              Generate!
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferenceBarModal;
