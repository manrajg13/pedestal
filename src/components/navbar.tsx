import Link from "next/link";
import { useClerk, useUser } from "@clerk/nextjs";
import { UserDropdown } from "./ui/userdropdown";

export const Navbar = () => {
  const clerk = useClerk();
  const isUserSignedIn = useUser().isSignedIn;

  return (
    <div className="fixed z-40 w-[100vw] bg-gradient-to-b from-black-600 py-4 px-6 lg:left-[50%] lg:ml-[-550px] lg:w-[1100px]">
      <div className="float-left mt-2 ml-2">
        <Link
          className="group absolute min-w-[40px] rounded-sm bg-orange-200 px-[16px] py-[18px]"
          href="/"
        >
          <span className="absolute -mt-[24px] -ml-6 min-w-[40px] rounded-sm bg-yellow-200 py-1 text-center text-xl font-bold text-black-600 duration-150 ease-out group-hover:-ml-5 group-hover:-mt-[22px]">
            P
          </span>
        </Link>
      </div>

      <div className="float-right flex text-white-100/75">
        <Link href="/explore" className="mt-1 py-1 px-4 mr-2 hover:text-yellow-200">
          <span>Explore</span>
        </Link>
        {!isUserSignedIn && (
          <span>
            <button
              className="mt-1 rounded border-[1px] border-yellow-200 px-4 py-1 text-yellow-200 duration-300 ease-out hover:bg-yellow-200/[15%]"
              onClick={() => clerk.openSignIn({})}
            >
              Sign in
            </button>
          </span>
        )}
        <div className="flex py-2">
          {isUserSignedIn && <UserDropdown />}
        </div>
      </div>
    </div>
  );
};
