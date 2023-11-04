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
      </Head>
      <NavBar />
      <BackgroundVideo /> {/* This will render the video as a background */}
      <main className="flex flex-col min-h-screen w-full">
        <div
          id="homePageContentContainer"
          className="flex flex-col h-[2000px] w-full bg-transparent" // Ensure the background is transparent
        >
          <div id="introSection">
            {/* Your intro content here */}
          </div>

          <div id="moreLandingPageStuff">
            {/* More content here */}
          </div>
        </div>
      </main>
    </>
  );
}
