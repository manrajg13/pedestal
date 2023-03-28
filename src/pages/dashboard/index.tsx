import { AiOutlineUser, AiOutlineSetting } from "react-icons/ai";
import { RiFileUserFill, RiPolaroid2Fill } from "react-icons/ri";
import { VscNewFolder } from "react-icons/vsc";
import { FaBrush } from "react-icons/fa";
import { GoCode } from "react-icons/go";
import Link from "next/link";
import type { NextPage } from "next";
import { api } from "~/utils/api";

const Dashboard: NextPage = () => {
  const { data } = api.showcases.getAll.useQuery();

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
            <button className="flex rounded border-[1px] border-white-100/25 p-2 text-white-100/50 hover:bg-white-100/10">
              <AiOutlineSetting className="mt-1" />
              <span>&nbsp;Settings</span>
            </button>
          </span>
          <span></span>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-x-4 gap-y-4 pb-20 min-[1100px]:grid-cols-4">
        {data?.map((showcase) => (
          <div key={showcase.Type}>
            <div className="group relative h-[360px] w-auto rounded bg-white-100/[5%] hover:cursor-pointer hover:bg-yellow-200">
              {showcase.Type == "Code" && (
                <div className="flex h-[170px] w-[100%] rounded-tl-sm rounded-tr-sm bg-white-100/[15%]">
                  <GoCode className="mx-auto my-auto text-9xl text-white-100/50" />
                </div>
              )}
              {showcase.Type == "Art" && (
                <div className="flex h-[170px] w-[100%] rounded-tl-sm rounded-tr-sm bg-white-100/[15%]">
                  <FaBrush className="mx-auto my-auto text-8xl text-white-100/50" />
                </div>
              )}
              {showcase.Type == "Photo" && (
                <div className="flex h-[170px] w-[100%] rounded-tl-sm rounded-tr-sm bg-white-100/[15%]">
                  <RiPolaroid2Fill className="mx-auto my-auto text-[110px] text-white-100/50" />
                </div>
              )}
              <div className="inline-flex pb-3">
                <div className="relative pt-4 pl-5 group-hover:text-black-500">
                  <span
                    key={showcase.id}
                    className="mr-2 text-sm font-semibold text-white-100 group-hover:text-black-600"
                  >
                    {showcase.Title}
                  </span>
                  <div className="w-[90%] text-white-100/75 group-hover:text-black-500">
                    <p key={showcase.id} className="text-xs">
                      {showcase.Description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute left-5 bottom-6 flex text-xs">
                <RiFileUserFill className="text-4xl text-yellow-200 group-hover:text-black-500" />
                <div className="ml-2">
                  <p className="font-bold text-white-100/75 group-hover:text-black-600">
                    ThisIsYou
                  </p>
                  <p className="mt-[2px] text-white-100/50 group-hover:text-black-600">
                    4 days ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        <Link
          href="/new"
          className="group flex h-[360px] w-auto rounded border-[1px] border-dashed border-white-100/50 hover:cursor-pointer hover:border-yellow-200"
        >
          <div className="mx-auto my-auto inline-flex pb-3">
            <span className="text-8xl text-white-100/50 group-hover:text-yellow-200 max-[648px]:hidden">
              <VscNewFolder />
            </span>
          </div>
        </Link>
      </div>
    </main>
  );
};

export default Dashboard;
