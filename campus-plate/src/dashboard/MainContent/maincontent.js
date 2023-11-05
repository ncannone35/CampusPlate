import DashHome from "./children/DashHome";
import { Children, cloneElement } from "react";

const MainContent = ({ children, preferences, setIsPrefbarOpen }) => {
  return (
    <div className="sm:ml-[240px]">
      <div className="bg-white px-[20px] sm:pl-[70px] ">
        {/* <DashHome preferences={preferences} /> */}
        {Children.map(children, (child) =>
          cloneElement(child, { preferences, setIsPrefbarOpen })
        )}
        {/* (child, {preferences}) */}
      </div>
    </div>
  );
};

export default MainContent;
