import { AiOutlineUser, AiOutlineSetting } from "react-icons/ai";
import type { NextPage } from "next";
import { useUser } from "@clerk/nextjs";
import { UserShowcases } from "../../components/UserShowcases";

const Dashboard: NextPage = () => {
  const { user } = useUser();

  return (
    <main className="absolute left-[50%] my-40 ml-[-30vw] w-[60vw]">
      <div className="block">
        <div className="flex float-left mt-2">
          <span>
            <AiOutlineUser className="mt-[2px] text-2xl text-white-100" />
          </span>
          <span className="ml-2 text-xl text-white-100">{user?.username}</span>
        </div>

        <div className="flex float-right">
          <span>
            <button className="flex rounded border-[1px] border-white-100/25 p-2 text-white-100/50 hover:bg-white-100/10">
              <AiOutlineSetting className="mt-1" />
              <span>&nbsp;Settings</span>
            </button>
          </span>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-x-4 gap-y-4 pb-20 min-[1100px]:grid-cols-4">
        <UserShowcases />
      </div>
    </main>
  );
};

export default Dashboard;
