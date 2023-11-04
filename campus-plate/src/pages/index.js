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
      <BackgroundVideo /> 
    </>
  );
}
