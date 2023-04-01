import { AiOutlineSetting } from "react-icons/ai";
import { useClerk, useUser } from "@clerk/nextjs";
import { Showcases } from "../../components/showcases";
import Image from "next/image";

const Dashboard = () => {
  const { user } = useUser();
  const isUserSignedIn = useUser().isSignedIn;
  const clerk = useClerk();

  if (!isUserSignedIn) {
    return <div onLoad={void clerk.openSignIn({})}></div>
  }

  if (!user) {
    return null
  }

  return (
    <main className="absolute left-[50%] my-40 ml-[-27.5vw] w-[55vw]">
      <div className="block">
        <div className="flex float-left mt-2">
          <span>
          <Image
              className="-mt-1 rounded-full"
              src={user.profileImageUrl}
              alt={"Profile image"}
              width={34}
              height={30}
            />
          </span>
          <span className="ml-2 text-xl text-white-100">{user?.username}</span>
        </div>

        <div className="flex float-right">
          <span>
            <button className="flex rounded border-[1px] border-white-100/50 p-2 text-white-100/75 hover:bg-white-100/10">
              <AiOutlineSetting className="mt-1" />
              <span>&nbsp;Settings</span>
            </button>
          </span>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-3 gap-x-4 gap-y-4 pb-20 max-[700px]:grid-cols-1 max-[1100px]:grid-cols-2 min-[1600px]:grid-cols-4">
        <Showcases />
      </div>
    </main>
  );
};

export default Dashboard;
