import '@/styles/globals.css'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Josefin_Sans} from "next/font/google";
import Head from 'next/head';


const inter = Josefin_Sans({ subsets: ["latin"] });


export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
    </UserProvider>
  );
}
