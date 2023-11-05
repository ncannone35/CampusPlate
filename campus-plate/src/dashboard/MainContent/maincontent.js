import DashHome from "./children/DashHome";

const MainContent = ({ children }) => {
  return (
    <div className="sm:ml-[240px]">
      <div className="bg-white px-[20px] sm:pl-[70px] ">
        {/* <DashHome /> */}
        {children}
      </div>
    </div>
  );
};

export default MainContent;
