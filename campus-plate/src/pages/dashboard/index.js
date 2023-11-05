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

      <div className="relative flex flex-col min-h-screen">
        <div className="flex justify-end pr-4 p-2 border-">
          <button
            onClick={handleToggle}
            aria-controls="logo-sidebar"
            type="button"
            className="inline-flex items-center p-2 mt-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
        </div>
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
