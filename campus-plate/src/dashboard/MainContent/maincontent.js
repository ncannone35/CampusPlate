import DashHome from "./children/DashHome";

const MainContent = ({ children }) => {
  return (
    <div className="sm:ml-[240px]">
      <div className="bg-white pl-[70px] pr-[15px]">
        {/* <DashHome /> */}
        {children}
      </div>
    </div>
  );
};

export default MainContent;
