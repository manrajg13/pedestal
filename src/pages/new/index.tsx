import { FaBrush } from "react-icons/fa";
import { GoCode } from "react-icons/go";
import { MdPhotoAlbum } from "react-icons/md";
import { ChangeEvent, useState } from "react";
import type { NextPage } from "next";
import { useClerk, useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import { AiFillCheckCircle } from "react-icons/ai";
import { useRouter } from 'next/router';
import { VscNewFolder } from "react-icons/vsc";

const CreateShowCase = () => {
  const { mutate} = api.showcases.create.useMutation();
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState("code");
  const router = useRouter();

  const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.value);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await router.push("/dashboard");
  }

  console.log(selected);

  return (
    <form onSubmit={() => void handleSubmit} className="mx-auto mt-12 w-[400px] rounded bg-black-500 px-2 text-white-100 sm:w-[500px]">
      <input
        autoFocus
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        min={1}
        max={20}
        placeholder="Enter a name for your showcase"
        className="mt-1 h-[50px] w-[100%] rounded-tl-lg rounded-tr-lg border-b-[1px] border-white-100/25 bg-black-500 px-2 placeholder:text-white-100/50 focus:outline-none"
      />
      <ul className="grid w-full gap-1 my-2 text-white-100/50">
        <li className="inline-flex rounded hover:bg-black-300">
          <input
            checked={selected === "code"}
            onChange={handleTypeChange}
            type="radio"
            id="code"
            name="type"
            value="code"
            className="hidden peer"
          />
          <label
            htmlFor="code"
            className="inline-flex w-full cursor-pointer rounded-tl rounded-bl border-[1px] border-black-500 p-2 peer-checked:border-yellow-200 peer-checked:border-r-0 peer-checked:text-yellow-200"
          >
            <div className="mt-[3px] w-[25px] text-lg text-yellow-200">
              <GoCode className="mx-auto" />
            </div>
            <span>&nbsp;Code Portfolio</span>
          </label>
          <label
            htmlFor="code"
            className="hidden cursor-pointer items-center rounded-tr rounded-br pr-3 text-lg border-[1px] text-yellow-200 peer-checked:flex peer-checked:border-[1px] peer-checked:border-l-0 peer-checked:border-yellow-200"
          >
            <AiFillCheckCircle />
          </label>
        </li>
        <li className="inline-flex rounded hover:bg-black-300">
          <input
            checked={selected === "art"}
            onChange={handleTypeChange}
            type="radio"
            id="art"
            name="type"
            value="art"
            className="hidden peer"
          />
          <label
            htmlFor="art"
            className="inline-flex w-full cursor-pointer rounded-tl rounded-bl border-[1px] border-black-500 p-2 peer-checked:border-yellow-200 peer-checked:border-r-0 peer-checked:text-yellow-200"
          >
            <div className="mt-1 w-[25px] text-lg text-yellow-200">
              <FaBrush className="mx-auto" />
            </div>
            <span>&nbsp;Art Gallery</span>
          </label>
          <label
            htmlFor="art"
            className="hidden cursor-pointer items-center rounded-tr rounded-br pr-3 text-lg text-yellow-200 peer-checked:flex peer-checked:border-[1px] peer-checked:border-l-0 peer-checked:border-yellow-200"
          >
            <AiFillCheckCircle />
          </label>
        </li>
        <li className="inline-flex rounded hover:bg-black-300">
          <input
            checked={selected === "photo"}
            onChange={handleTypeChange}
            type="radio"
            id="photo"
            name="type"
            value="photo"
            className="hidden peer"
          />
          <label
            htmlFor="photo"
            className="inline-flex w-full cursor-pointer rounded-tl rounded-bl border-[1px] border-black-500 p-2 peer-checked:border-yellow-200 peer-checked:border-r-0 peer-checked:text-yellow-200"
          >
            <div className="mt-1 w-[25px] text-lg text-yellow-200">
              <MdPhotoAlbum className="mx-auto" />
            </div>
            <span>&nbsp;Photo Album</span>
          </label>
          <label
            htmlFor="photo"
            className="hidden cursor-pointer items-center rounded-tr rounded-br pr-3 text-lg text-yellow-200 peer-checked:flex peer-checked:border-[1px] peer-checked:border-l-0 peer-checked:border-yellow-200"
          >
            <AiFillCheckCircle />
          </label>
        </li>
      </ul>
      <button
        className="w-full p-3 mb-2 text-sm bg-yellow-200 rounded text-black-500 hover:brightness-75"
        type="submit"
        onClick={() => mutate({ title: input, type: selected })}
      >
        Create new project
      </button>
    </form>
  );
};

const NewProject: NextPage = () => {
  const isUserSignedIn = useUser().isSignedIn;
  const clerk = useClerk();

  if (!isUserSignedIn) {
    return <div onLoad={void clerk.openSignIn({})}></div>;
  }

  return (
    <main className="absolute text-center w-[100vw] py-4 px-6 lg:ml-[-550px] lg:left-[50%] lg:w-[1100px]">
      <h1 className="inline-flex mx-auto text-yellow-200 text-7xl mt-36"><VscNewFolder /></h1>
      <h1 className="mt-8 text-4xl font-bold text-white-100">New Showcase</h1>
      <p className="mt-2 text-white-100/75">
        Curate a web display for your projects with ease
      </p>
      <CreateShowCase />
    </main>
  );
};

export default NewProject;
