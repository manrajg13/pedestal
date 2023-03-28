import { type NextPage } from "next";
import Head from "next/head";
import { useUser } from '@clerk/nextjs';

const Home: NextPage = () => {
  const user = useUser();

  return (
    <>
      <Head>
        <title>Pedestal</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen">
        <div className="ml-40 my-auto pt-16">
          <div className="z-0 mb-10 text-[4.9rem] font-bold leading-none text-white-100">

            <div className="absolute z-10 ml-[280px] mt-[-105px] h-[300px] w-[380px] bg-yellow-200"></div>
            <div className="absolute z-30 ml-[240px] mt-[-80px] h-[490px] w-[340px] bg-black-500"></div>
            <div className="absolute z-20 ml-[263px] mt-[-70px] h-[265px] w-[330px] bg-orange-200"></div>
            
            <div className="relative z-40 min-w-[620px]">
              <span className="text-yellow-200">&#60;</span>
              <span>Get Noticed</span>
              <span className="text-yellow-200">&#62;</span>
              <h1>Showcase Your</h1>
              <span>Projects</span>
              <span className="text-yellow-200">/</span>
              <span>*</span>
            </div>
          </div>

          <div className="text-[15px] min-w-[400px] leading-4 -mt-6 ml-[180px] relative z-30 text-white-100">
            <span className="text-yellow-100 font-semibold">PEDESTAL</span>
            <span> is a quick and easy way to create</span>
            <p>showcases of your projects on your personal website.</p>
          </div>

          <div className="relative ml-[355px] z-30 mt-8 text-yellow-200">
            <div className="absolute rounded-sm bg-yellow-200 w-[170px] text-center py-4 -mt-[3px] z-30 text-xs font-semibold text-white-100 ease-out duration-300  hover:ml-1 hover:mt-[1px] hover:cursor-pointer">GET STARTED</div>
            <button className="rounded-sm bg-orange-200 w-[170px] py-4 ml-[10px] mt-[5px] text-xs font-semibold text-white-100">
              &nbsp;
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
