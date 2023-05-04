import { FaBrush } from "react-icons/fa";
import { GoCode } from "react-icons/go";
import { type ChangeEvent, useState } from "react";
import { type NextPage } from "next";
import { useClerk, useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import { AiFillCheckCircle } from "react-icons/ai";
import { VscNewFolder } from "react-icons/vsc";
import toast from "react-hot-toast";
import Head from "next/head";
import { RiPolaroid2Fill } from "react-icons/ri";

const CreateShowCase = () => {
  const { mutate } = api.showcases.create.useMutation();
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState("code");

  const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.value);
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (input === "") {
      toast.custom(() => (
        <div className="rounded-3xl bg-red-200 px-10 py-3 text-white-100">
          Enter a name for the showcase first
        </div>
      ));
      return;
    }

    if (input.length > 60) {
      toast.custom(() => (
        <div className="rounded-3xl bg-red-200 px-10 py-3 text-white-100">
          Choose a name shorter than 60 characters
        </div>
      ));
      return;
    }

    mutate({ 
      title: input, 
      type: selected,
      c_background: "#262626",
      c_width: 1350,
      c_height: 700,
      c_gap: 20,
      c_cols: 4,
      p_border_color: "#e4e4e4",
      p_background: "3b3b3b",
      p_border_weight: 1,
      p_border_roundness: 1,
      p_height: 280,
      t_icon: "#e4e4e4",
      t_text_color: "#e4e4e4",
      t_icon_size: 48,
      t_title_size: 18,
      t_description_size: 16,
      t_link_size: 14,
    });

    window.location.href = "/dashboard"
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-12 w-[400px] rounded bg-black-500 px-2 pb-[1px] text-white-100 sm:w-[500px]"
    >
      <input
        autoFocus
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit;
          }
        }}
        placeholder="Enter a name for your showcase"
        className="mt-1 h-[50px] w-[100%] rounded-tl-lg rounded-tr-lg border-b-[1px] border-white-100/25 bg-black-500 px-2 placeholder:text-white-100/50 focus:outline-none"
      />
      <ul className="my-2 grid w-full gap-1 text-white-100/50">
        <li className="inline-flex rounded hover:bg-black-300">
          <input
            checked={selected === "code"}
            onChange={handleTypeChange}
            type="radio"
            id="code"
            name="type"
            value="code"
            className="peer hidden"
          />
          <label
            htmlFor="code"
            className="inline-flex w-full cursor-pointer rounded-tl rounded-bl border-[1px] border-black-500 p-2 peer-checked:border-r-0 peer-checked:border-yellow-200 peer-checked:text-yellow-200"
          >
            <div className="mt-[3px] w-[25px] text-lg text-yellow-200">
              <GoCode className="mx-auto text-[20px] -mt-[2px]" />
            </div>
            <span>&nbsp;Code Portfolio</span>
          </label>
          <label
            htmlFor="code"
            className="hidden cursor-pointer items-center rounded-tr rounded-br border-[1px] pr-3 text-lg text-yellow-200 peer-checked:flex peer-checked:border-[1px] peer-checked:border-l-0 peer-checked:border-yellow-200"
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
            className="peer hidden"
          />
          <label
            htmlFor="art"
            className="inline-flex w-full cursor-pointer rounded-tl rounded-bl border-[1px] border-black-500 p-2 peer-checked:border-r-0 peer-checked:border-yellow-200 peer-checked:text-yellow-200"
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
            className="peer hidden"
          />
          <label
            htmlFor="photo"
            className="inline-flex w-full cursor-pointer rounded-tl rounded-bl border-[1px] border-black-500 p-2 peer-checked:border-r-0 peer-checked:border-yellow-200 peer-checked:text-yellow-200"
          >
            <div className="mt-1 w-[25px] text-lg text-yellow-200">
              <RiPolaroid2Fill className="mx-auto -mt-[3px] text-[20px]" />
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
        className="mb-2 w-full rounded bg-yellow-200 p-3 text-sm text-black-600 hover:brightness-75"
        type="submit"
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
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main className="absolute w-[100vw] py-4 px-6 text-center lg:left-[50%] lg:ml-[-550px] lg:w-[1100px]">
        <h1 className="mx-auto mt-36 inline-flex text-7xl text-yellow-200">
          <VscNewFolder />
        </h1>
        <h1 className="mt-8 text-4xl font-bold text-white-100">New Showcase</h1>
        <p className="mt-2 text-white-100/75">
          Curate a web display for your projects with ease
        </p>
        <CreateShowCase />
      </main>
    </>
  );
};

export default NewProject;
