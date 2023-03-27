import { AiOutlineUser, AiOutlineSetting } from "react-icons/ai";
import { VscNewFolder, VscFolder } from "react-icons/vsc";
import Link from "next/link";
import { NextPage } from "next";

const Dashboard: NextPage = () => {
  return (
    <main className="absolute left-[50%] my-40 ml-[-30vw] w-[60vw]">
      <div className="block">
        <div className="float-left flex">
          <span>
            <AiOutlineUser className="mt-[2px] text-3xl text-white-100" />
          </span>
          <span className="text-3xl text-white-100">Username</span>
        </div>

        <div className="float-right flex">
          <span>
            <button className="rounded border-[1px] border-white-100/25 p-2 text-white-100/50 hover:bg-white-100/10">
              <AiOutlineSetting />
            </button>
          </span>
          <span>
            <Link
              href="/new"
              className="ml-4 flex rounded border-[1px] border-white-100/25 py-[3px] pl-3 pr-4 hover:bg-white-100/10 max-[648px]:pr-2"
            >
              <span className="mt-[-6px] text-2xl text-yellow-200">
                +&nbsp;
              </span>
              <span className="text-white-100 max-[648px]:hidden">
                New Showcase
              </span>
            </Link>
          </span>
        </div>
      </div>

      <div className="grid-cols-q mt-16 grid gap-x-4 gap-y-4 min-[1512px]:grid-cols-2">
        <div className="group flex h-[200px] w-auto rounded bg-white-100/[5%] hover:cursor-pointer hover:bg-yellow-200">
          <div className="my-auto ml-12 inline-flex pb-3">
            <span className="my-auto ml-3 pt-4 text-8xl text-white-100 group-hover:text-black-500 max-[648px]:hidden">
              <VscFolder />
            </span>
            <div className="my-auto pt-3 pl-5 text-white-100 group-hover:text-black-500">
              <span className="mr-2 text-xl font-semibold">Title</span>
              <div className="w-[80%] text-white-100/75 group-hover:text-black-500">
                <p className="text-sm">Description</p>
              </div>
              <div className="mt-3 flex text-xs">
                <span className="text-yellow-200 group-hover:text-black-500">&#11044;&nbsp;</span>
                <span className="ml-1 mt-[2px] text-white-100/75 group-hover:text-black-600">
                  Code
                </span>
                <span className="ml-4 mt-[2px] text-white-100/75 group-hover:text-black-600 max-[700px]:hidden">
                  Created on
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="group flex h-[200px] w-auto rounded border-[1px] border-dashed border-white-100/50 hover:cursor-pointer hover:border-yellow-200">
          <div className="my-auto ml-12 inline-flex pb-3">
            <span className="my-auto ml-3 pt-4 text-8xl text-white-100/50 group-hover:text-yellow-200 max-[648px]:hidden">
              <VscNewFolder />
            </span>
            <div className="my-auto pb-1 pl-5 text-white-100/50 group-hover:text-yellow-200">
              <p className="text-xl font-bold">Create a New Showcase</p>
              <div className="w-[80%]">
                <p className="text-sm">
                  Get started by making an empty Showcase to populate with all
                  your projects
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
