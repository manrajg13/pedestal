import Link from "next/link";
import { SignOutButton, useClerk, useUser } from "@clerk/nextjs";

export const Navbar = () => {
  const clerk = useClerk();
  const user = useUser();

  return (
    <div className="absolute left-[50%] z-40 ml-[-30vw] w-[60vw] py-5">
      <div className="float-left">
        <Link
          className="group absolute min-w-[120px] rounded-sm bg-orange-200 px-4 py-5"
          href="/"
        >
          <span className="absolute -mt-[24px] -ml-6 min-w-[120px] rounded-sm bg-yellow-200 px-[8px] py-[9px] text-center text-sm font-bold text-black-500 duration-150  ease-out group-hover:-ml-5 group-hover:-mt-[22px]">
            PEDESTAL
          </span>
        </Link>
      </div>

      <div className="float-right flex font-bold text-white-100/75">
        {!user.isSignedIn && (
          <span>
            <button
              className="rounded border-[1px] border-yellow-200 px-4 py-1 text-yellow-200 duration-300 ease-out  hover:bg-yellow-200/[15%]"
              onClick={() => clerk.openSignIn({})}
            >
              Sign in
            </button>
          </span>
        )}
        {!!user.isSignedIn && (
          <div>
            <Link href="/dashboard">
              <span className="px-6 duration-300 ease-out hover:text-yellow-200">
                Dashboard
              </span>
            </Link>
            <a className="px-4 py-1 duration-300 ease-out  hover:text-yellow-200">
              <SignOutButton>Sign out</SignOutButton>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
