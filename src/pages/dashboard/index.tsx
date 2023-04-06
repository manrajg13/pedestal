import { AiOutlineSetting } from "react-icons/ai";
import { useClerk, useUser } from "@clerk/nextjs";
import { Showcases } from "../../components/showcases";
import Image from "next/image";

const Dashboard = () => {
  const { user } = useUser();
  const isUserSignedIn = useUser().isSignedIn;
  const clerk = useClerk();

  if (!isUserSignedIn) return <div onLoad={void clerk.openSignIn({})}></div>
  if (!user) return null
  if (!user.username) return null

  return (
    <main className="absolute my-40 w-[100vw] z-10 py-4 px-6 lg:ml-[-550px] lg:left-[50%] lg:w-[1100px] md:w-[800px] md:ml-[-400px] md:left-[50%]">
      <div className="block">
        <div className="flex float-left mt-2">
          <span>
          <Image
              className="rounded-full"
              src={user.profileImageUrl}
              alt={"user.png"}
              width={30}
              height={30}
            />
          </span>
          <span className="ml-2 text-xl text-white-100">{user?.username}</span>
        </div>

        <div className="flex float-right">
          <span>
            <button className="flex rounded border-[1px] border-white-100/50 p-2 text-white-100/75 hover:bg-white-100/10">
              <AiOutlineSetting className="mt-1" />
              <span>&nbsp;Filter</span>
            </button>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 pb-20 mt-16 gap-x-4 gap-y-4 max-sm:grid-cols-2 lg:grid-cols-4">
        <Showcases />
      </div>
    </main>
  );
};

export default Dashboard;
