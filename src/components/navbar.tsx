import Link from "next/link";
import { useClerk, useUser } from "@clerk/nextjs";
import { Dropdown } from "./ui/dropdown";

export const Navbar = () => {
  const clerk = useClerk();
  const isUserSignedIn = useUser().isSignedIn;

  return (
    <div className="fixed w-[100vw] z-10 py-4 px-6 lg:ml-[-550px] lg:left-[50%] lg:w-[1100px]">
      <div className="float-left mt-2 ml-3">
        <Link
          className="group absolute min-w-[40px] rounded-sm bg-orange-200 px-[16px] py-[18px]"
          href="/"
        >
          <span className="absolute -mt-[24px] -ml-6 min-w-[40px] rounded-sm bg-yellow-200 py-1 text-center text-xl font-bold text-black-600 duration-150 ease-out group-hover:-ml-5 group-hover:-mt-[22px]">
            P
          </span>
        </Link>
      </div>

      <div className="flex float-right text-white-100/75">
        {!isUserSignedIn && (
          <span>
            <button
              className="rounded border-[1px] border-yellow-200 px-4 py-1 mt-1 text-yellow-200 duration-300 ease-out hover:bg-yellow-200/[15%]"
              onClick={() => clerk.openSignIn({})}
            >
              Sign in
            </button>
          </span>
        )}
        <div className="flex py-2">
          {isUserSignedIn && (
            <span className="hover:text-yellow-200 hover:cursor-pointer">
            <Link href="/dashboard">
              <span className="px-6 duration-300 ease-out">
                Dashboard
              </span>
            </Link>
            </span>
          )}
          {isUserSignedIn && <Dropdown />}
        </div>
      </div>
    </div>
  );
};
