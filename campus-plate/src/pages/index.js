import Image from "next/image";
import NavBar from "@/components/navbar/navbar";
import BackgroundVideo from '@/components/BackgroundVideo';

// const inter = Inter({ subsets: ["latin"] });
import Head from "next/head";

export default function Home() {

  return (
    <>
      <Head>
        {" "}
        <title>CampusPlate</title>
        <link rel="icon" href="/chef.ico" />
      </Head>

      <div className="relative">
        <NavBar />
        <BackgroundVideo />
        <div className="absolute border- w-full min-h-screen flex items- justify-center z-0 ">
          <div className="text-white flex flex-col text-center space-y-[20px] mt-[35vh] sm:mt-[28vh] px-[20px]">
            {" "}
            <h1 className="text-white text-4xl sm:text-6xl font-bold">
              This is CampusPlate{" "}
            </h1>
            <h1 className="text-white text-3xl sm:text-4xl font-semibold">
              Let us help you decide what to eat{" "}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
