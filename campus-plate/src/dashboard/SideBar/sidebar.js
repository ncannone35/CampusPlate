import DashHome from "../MainContent/children/DashHome";
import MealHistory from "../MainContent/children/MealHistory";
import Calculator from "../MainContent/children/CaloriesCal";
import { useUser } from "@auth0/nextjs-auth0/client";

const SideBar = ({
  handleLinkClick,
  selectedComponent,
  isSidebarOpen,
  isPrefbarOpen,
  setIsPrefbarOpen,
}) => {
  const { user, error, isLoading } = useUser();

  const handleLogout = () => {
    window.location.href = '/api/auth/logout';
  };

  return (
    // <aside
    //   id="logo-sidebar"
    //   className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 duration-700"
    //   aria-label="Sidebar"
    // >
    <aside
      id="logo-sidebar"
      className={` fixed border- w-[240px] top-0 left-0 z-40 h-screen transition-transform duration-700 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } sm:translate-x-0`}
    >
      <div className="h-full py-[50px] overflow-y-auto bg-bgColor border-r-[0.11rem] border-heavy">
        <div
          href="/"
          className="flex flex-col items-center mb-[0px] border- justify-center space-y-[20px] "
        >
          {/* <span className="mt-[15px] ml-[2px] self-center text-lg font-bold whitespace-nowrap dark:text-white">
            ReviCID
          </span> */}
          <img
            src={user.picture}
            alt={user.name}
            className="rounded-full h-20 w-20"
          />

          <h1 className="text-xl border- font-medium"> Hello, {user.name}</h1>
        </div>
        <ul className="space-y-4 font-normal mt-[100px] border- px-2">
          <li>
            <a
              onClick={() => handleLinkClick(<DashHome />)}
              className={`transition flex items-center p-2  border- cursor-pointer rounded-lg dark:text-white${
                selectedComponent.type === DashHome
                  ? " text-support bg-gray-50"
                  : " text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500 hover:text-support"
              }`}
            >
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
                class="lucide lucide-chef-hat"
              >
                <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
                <line x1="6" x2="18" y1="17" y2="17" />
              </svg>
              <span className="ml-3 text-lg mt-[4px]">Home</span>
            </a>
          </li>
          <li>
            <a
              onClick={() => handleLinkClick(<Calculator />)}
              className={`transition flex items-center p-2  border- cursor-pointer rounded-lg dark:text-white${
                selectedComponent.type === Calculator
                  ? " text-support bg-gray-50"
                  : " text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500 hover:text-support"
              }`}
            >
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
                class="lucide lucide-calculator"
              >
                <rect width="16" height="20" x="4" y="2" rx="2" />
                <line x1="8" x2="16" y1="6" y2="6" />
                <line x1="16" x2="16" y1="14" y2="18" />
                <path d="M16 10h.01" />
                <path d="M12 10h.01" />
                <path d="M8 10h.01" />
                <path d="M12 14h.01" />
                <path d="M8 14h.01" />
                <path d="M12 18h.01" />
                <path d="M8 18h.01" />
              </svg>
              <span className="ml-3 text-lg mt-[4px]">Calories Calculator</span>
            </a>
          </li>
          <li>
            <a
              onClick={() => handleLinkClick(<MealHistory />)}
              className={`transition flex items-center p-2  border- cursor-pointer rounded-lg dark:text-white${
                selectedComponent.type === MealHistory
                  ? " text-support bg-gray-50"
                  : " text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500 hover:text-support"
              }`}
            >
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
                class="lucide lucide-history"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M12 7v5l4 2" />
              </svg>
              <span className="ml-3 text-lg mt-[4px]">Meal History</span>
            </a>
          </li>

          <li>
            <a
              onClick={() => setIsPrefbarOpen(!isPrefbarOpen)}
              className="flex items-center p-2 cursor-pointer rounded-lg dark:text-white hover:text-support transition-colors hover:bg-gray-50"
            >
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
                class="lucide lucide-utensils-crossed"
              >
                <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" />
                <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" />
                <path d="m2.1 21.8 6.4-6.3" />
                <path d="m19 5-7 7" />
              </svg>
              <span className="ml-3 text-lg mt-[3px]">Preference</span>
            </a>
          </li>

          <li>
            <a
              onClick={handleLogout} 
              className="flex items-center p-2 cursor-pointer rounded-lg dark:text-white hover:text-support transition-colors hover:bg-gray-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-log-out"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span className="ml-3 text-lg mt-[3px]">Logout</span>
            </a>
          </li>

        </ul>
      </div>
    </aside>
  );
};
export default SideBar;
