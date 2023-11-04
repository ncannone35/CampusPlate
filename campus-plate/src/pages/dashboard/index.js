import { useEffect, useState } from "react";
import DashHome from "@/dashboard/MainContent/children/DashHome";
import SideBar from "@/dashboard/SideBar/sidebar";
import MainContent from "@/dashboard/MainContent/maincontent";
import PreferenceBarModal from "@/dashboard/PreferenceBar/prefBar";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Head from "next/head";

// this will throw in the sideBar and render main content according
const DashBoardHome = () => {
  const [selectedComponent, setSelectedComponent] = useState(<DashHome />);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPrefbarOpen, setIsPrefbarOpen] = useState(false);

  const handleToggle = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const handleLinkClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <>
      <Head>
        {" "}
        <title>CampusPlate-Dashboard</title>
      </Head>

      <div className="relative flex min-h-screen">
    
        <div className="w-full">
          <SideBar
            isSidebarOpen={isSidebarOpen}
            isPrefbarOpen={isPrefbarOpen}
            setIsPrefbarOpen={setIsPrefbarOpen}
            handleLinkClick={handleLinkClick}
            selectedComponent={selectedComponent}
          />
          <MainContent children={selectedComponent} />
        </div>
        {isPrefbarOpen && (
          <PreferenceBarModal handleCloseBar={setIsPrefbarOpen} />
        )}
      </div>
    </>
  );
};

export default withPageAuthRequired(DashBoardHome);

