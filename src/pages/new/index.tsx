import { FaBrush } from "react-icons/fa";
import { GoCode } from "react-icons/go";
import { MdPhotoAlbum } from "react-icons/md";
import Link from "next/link";
import { useState } from "react";
import { type NextPage } from "next";

const NewProject: NextPage = () => {
  const [name, setName] = useState("");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <main className="absolute grid w-[60vw] left-[50%] ml-[-30vw] my-40 text-center">
      <h1 className="mt-32 text-white-100 text-4xl font-bold">New Showcase</h1>
      <p className="mt-4 text-white-100/75">
        Curate a display for your projects effortlessly
      </p>

      <form
        onSubmit={submitHandler} 
        className="mx-auto mt-16 px-2 w-[500px] rounded text-white-100 bg-black-500">
        <input
          autoFocus
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a name for your showcase"
          className="px-2 mt-1 h-[50px] w-[100%] rounded-tl-lg rounded-tr-lg placeholder:text-white-100/50 border-b-[1px] border-white-100/25 focus:outline-none bg-black-500"
        />
        <div className="grid my-2 text-white-100/50">
          <Link href="/gallery" type="submit" className="flex px-2 py-2 rounded text-left hover:bg-black-300">
              <div className="w-[25px] mt-1 text-yellow-200 text-lg">
                <FaBrush className="mx-auto" />
              </div>
              <span>&nbsp;Art Gallery</span>
          </Link>
          <Link href="/portfolio" className="flex px-2 py-2 rounded text-left hover:bg-black-300">
            <div className="w-[25px] mt-[2px] text-yellow-200 text-[20px]">
              <GoCode className="mx-auto" />
            </div>
            <span>&nbsp;Code Portfolio</span>
          </Link>
          <Link href="album" className="flex px-2 py-2 rounded text-left hover:bg-black-300">
            <div className="w-[25px] mt-[3px] text-yellow-200 text-lg">
              <MdPhotoAlbum className="mx-auto" />
            </div>
            <span>&nbsp;Photography Album</span>
          </Link>
        </div>
      </form>
    </main>
  );
}

export default NewProject