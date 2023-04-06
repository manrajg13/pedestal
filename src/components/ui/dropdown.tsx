import { useClerk, useUser } from "@clerk/nextjs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { GoGear } from "react-icons/go";
import { useEffect, useRef, useState } from "react";
import { RiShutDownLine } from "react-icons/ri";
import { useRouter } from "next/router";
import type { MouseEventHandler } from "react";
import Link from "next/link";
import Image from "next/image";

const UserProfileImgUrl = () => {
  const { user } = useUser();

  if (!user) return null;
  if (!user.username) return null;

  return (
    <div>
      <Image
        className="rounded-full"
        src={user.profileImageUrl}
        alt={"user.png"}
        width={26}
        height={26}
      />
    </div>
  );
};

export const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { signOut } = useClerk();
  const router = useRouter();

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    setIsOpen((current: boolean) => !current);
  };

  async function handleSignOut() {
    await router.push("/");
    void signOut();
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const { user } = useUser();

  if (!user) return null;
  if (!user.username) return null;

  return (
    <div ref={ref}>
      <button
        onClick={handleClick}
        className="-mt-1 duration-300 ease-out hover:cursor-pointer hover:text-yellow-200"
      >
        <span className="mt-[2px] flex text-3xl">
          <UserProfileImgUrl />
          <MdOutlineKeyboardArrowDown />
        </span>
      </button>
      <div className={isOpen ? "" : "hidden"}>
        <div className="absolute right-6 top-14 w-[200px] rounded-sm bg-black-500 p-2 font-medium">
          <Link href={`/${user.username}`}>
            <button className="inline-flex w-[100%] rounded-sm px-3 py-1 text-white-100/75 hover:cursor-pointer hover:bg-white-100/[6%]">
              <span className="mt-1 mr-2">
                <GoGear />
              </span>
              Profile
            </button>
          </Link>
          <button
            onClick={() => void handleSignOut()}
            className="rounded=sm inline-flex w-[100%] px-3 py-1 text-red-200 hover:cursor-pointer hover:bg-white-100/[6%]"
          >
            <span className="mt-[4px] mr-2">
              <RiShutDownLine />
            </span>
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};
