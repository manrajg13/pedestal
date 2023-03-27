import Link from "next/link";
import { useClerk, useUser } from "@clerk/nextjs";

export const Navbar = () => {
  const clerk = useClerk();
  const user = useUser();

  return (
    <div className="absolute left-[50%] z-40 ml-[-30vw] w-[60vw] py-5">
      <div className="float-left">
        <Link className="group absolute rounded-sm min-w-[120px] px-4 py-5 bg-orange-200" href="/">
          <span className="absolute px-[8px] -mt-[24px] -ml-6 min-w-[120px] py-[9px] font-bold text-center text-sm rounded-sm text-black-500 ease-out duration-150  bg-yellow-200 group-hover:-ml-5 group-hover:-mt-[22px]">PEDESTAL</span>
        </Link>
      </div>

      <div className="float-right flex font-bold text-white-100/75">
        {!user.isSignedIn && (
          <span>
            <Link href="/dashboard">
              <span className="px-6 ease-out duration-300 hover:text-yellow-200">Dashboard</span>
            </Link>
            <button
              className="px-4 py-1 rounded border-[1px] border-yellow-200 text-yellow-200 ease-out duration-300  hover:bg-yellow-200/[15%]"
              onClick={() => clerk.openSignIn({})}
            >
              Sign in
            </button>
          </span>
        )}
        {!!user.isSignedIn && (
          <button
            className="px-4 py-1 ease-out duration-300  hover:text-yellow-200"
            onClick={() => clerk.signOut({})}
          >
            Sign out
          </button>
        )}
      </div>
    </div>
  );
};
