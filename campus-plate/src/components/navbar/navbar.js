import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from 'react';
import logoImg from '../../../public/logo.png';


const NavBar = () => {
  const { user, error, isLoading } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
        <div id="navBarContainer" style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }} className="fixed top-0 w-full">

    {/* <div id="navBarContainer" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }} className="fixed top-0 w-full"> */}
      <div
        id="contentWrapper"
        className="flex flex-row justify-between items-center px-[100px] py-[30px]"
      >
        <div id="logo" className="">
          <Image src={logoImg} alt="CampusPlate Logo" width={200} height={100} className="rounded-xl" />
          {/* <span className="text-2xl font-semibold">CampusPlate</span> */}
        </div>
        <div id="userSection" className="relative">
          {user ? (
            <>
              <button onClick={toggleDropdown} className="flex items-center space-x-[10px] text-white">
                <span className="text-xl font-semibold">{"Welcome " + user.name + "!"}</span>
                <img src={user.picture} alt={user.name} className="rounded-full h-10 w-10" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-50">
                  <a href="/dashboard" className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white">
                    Dashboard
                  </a>
                  <a href="/api/auth/logout" className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white">
                    Logout
                  </a>
                </div>
              )}
            </>
          ) : (
            <a className="text-xl font-semibold text-white" href="/api/auth/login">Login</a>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;

