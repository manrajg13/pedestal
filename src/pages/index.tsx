import { type NextPage } from "next";
import { useClerk, useUser } from "@clerk/nextjs";
import Link from "next/link";

const Home: NextPage = () => {
  const clerk = useClerk();
  const isUserSignedIn = useUser().isSignedIn;

  return (
    <main className="flex h-screen w-screen scale-[90%] max-sm:scale-[75%]">
      <div className="my-auto pt-16 max-sm:-mt-1">
        <div className="z-0 mb-10 text-[4.5rem] font-bold leading-none text-white-100">
          <div className="absolute z-10 ml-[280px] mt-[-105px] h-[300px] w-[380px] bg-yellow-200"></div>
          <div className="absolute z-30 ml-[240px] mt-[-80px] h-[480px] w-[340px] bg-black-500"></div>
          <div className="absolute z-20 ml-[263px] mt-[-70px] h-[265px] w-[330px] bg-orange-200"></div>

          <div className="relative z-40 ml-12 min-w-[620px]">
            <span className="text-yellow-200">&#60;</span>
            <span>Get Noticed</span>
            <span className="text-yellow-200">&#62;</span>
            <h1>Showcase Your</h1>
            <span>Projects</span>
            <span className="text-yellow-200">/</span>
            <span>*</span>
          </div>
        </div>

        <div className="relative z-30 -mt-6 ml-[210px] min-w-[400px] text-[17px] leading-5 text-white-100/90">
          <span className="font-semibold text-yellow-100">PEDESTAL</span>
          <span> is a quick and easy way to</span>
          <p>create professional showcases of your projects.</p>
        </div>

        <Link
          href={!isUserSignedIn ? "/" : "/dashboard"}
          onClick={!isUserSignedIn ? () => clerk.openSignIn() : undefined}
          className="relative z-30 ml-[355px] mt-1 text-yellow-200"
        >
          <div className="group relative z-30 mt-3 ml-[365px] w-[170px] rounded-sm bg-orange-200 py-4 text-center text-xs font-semibold text-white-100 ease-out hover:cursor-pointer">
            <button className="absolute -top-2 -left-[10px] w-[170px] rounded-sm bg-yellow-200 py-4 text-xs font-semibold text-white-100 duration-100 hover:cursor-pointer group-hover:-top-1 group-hover:-left-[6px]">
              GET STARTED
            </button>
            &nbsp;
          </div>
        </Link>
      </div>
    </main>
  );
};

export default Home;
