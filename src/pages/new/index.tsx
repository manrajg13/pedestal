import { FaBrush } from "react-icons/fa";
import { GoCode } from "react-icons/go";
import { MdPhotoAlbum } from "react-icons/md";
import Link from "next/link";
import { useState } from "react";
import type { NextPage } from "next";
import { useClerk, useUser } from "@clerk/nextjs";

const NewProject: NextPage = () => {
  const [name, setName] = useState("");
  const isUserSignedIn = useUser().isSignedIn;
  const clerk = useClerk();

  if (!isUserSignedIn) {
    return <div onLoad={void clerk.openSignIn({})}></div>
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <main className="absolute left-[50%] my-40 ml-[-30vw] grid w-[60vw] text-center">
      <h1 className="mt-32 text-4xl font-bold text-white-100">New Showcase</h1>
      <p className="mt-4 text-white-100/75">
        Curate a display for your projects effortlessly
      </p>

      <form
        onSubmit={submitHandler}
        className="mx-auto mt-16 w-[500px] rounded bg-black-500 px-2 text-white-100"
      >
        <input
          autoFocus
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a name for your showcase"
          className="mt-1 h-[50px] w-[100%] rounded-tl-lg rounded-tr-lg border-b-[1px] border-white-100/25 bg-black-500 px-2 placeholder:text-white-100/50 focus:outline-none"
        />
        <div className="grid my-2 text-white-100/50">
          <Link
            href="/gallery"
            type="submit"
            className="flex px-2 py-2 text-left rounded hover:bg-black-300"
          >
            <div className="mt-1 w-[25px] text-lg text-yellow-200">
              <FaBrush className="mx-auto" />
            </div>
            <span>&nbsp;Art Gallery</span>
          </Link>
          <Link
            href="/portfolio"
            className="flex px-2 py-2 text-left rounded hover:bg-black-300"
          >
            <div className="mt-[2px] w-[25px] text-[20px] text-yellow-200">
              <GoCode className="mx-auto" />
            </div>
            <span>&nbsp;Code Portfolio</span>
          </Link>
          <Link
            href="album"
            className="flex px-2 py-2 text-left rounded hover:bg-black-300"
          >
            <div className="mt-[3px] w-[25px] text-lg text-yellow-200">
              <MdPhotoAlbum className="mx-auto" />
            </div>
            <span>&nbsp;Photo Album</span>
          </Link>
        </div>
      </form>
    </main>
  );
};

export default NewProject;
