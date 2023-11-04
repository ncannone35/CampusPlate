import { useState } from 'react';

const PreferenceBarModal = ({ handleCloseBar }) => {

  const [preferences, setPreferences] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    // ... other preferences
  });
  
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setPreferences({ ...preferences, [name]: checked });
  };

  return (
    <div id="prefBarModal" className="w-full h-full absolute  sm:ml-[240px] ">
      {/* handles onClick and close PrefBar */}
      <div
        id="bgModal"
        className="w-full h-full bg-black opacity-50 absolute z-0"
        onClick={() => handleCloseBar(false)}
      ></div>
      <div
        id="prefBar"
        className="flex w-full h-full items-center justify-center bg-red- px-[20px]"
      >
        <div className="flex flex-col h-[80%] w-[400px] bg-white z-30 rounded-lg py-[20px] px-[10px]">
          <div id="prefBarHeader" className="flex flex-row">
            <h1 className="text-xl font-medium"> Preferences </h1>
          </div>

          <div id="prefBarContent" className="overflow-y-auto">
            {/* Checklist for dietary preferences */}
            <form>
              <div className="flex flex-col space-y-4">
                {['Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Paleo'].map((preference) => (
                  <label key={preference} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name={preference.toLowerCase()}
                      checked={preferences[preference.toLowerCase()] || false}
                      onChange={handleCheckboxChange}
                    />
                    <span>{preference}</span>
                  </label>
                ))}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferenceBarModal;
