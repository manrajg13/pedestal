import { useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Head from "next/head";
import { LoadingPage } from "~/components/ui/loading";
import { api } from "~/utils/api";
import { ShowcaseView } from "~/components/showcaseview";
import Link from "next/link";
import { VscNewFolder } from "react-icons/vsc";

const DashboardShowcases = (props: { userId: string }) => {
  const { data, isLoading } = api.showcases.getShowcaseByUserId.useQuery({
    userId: props.userId,
  });

  if (isLoading) return <LoadingPage />;
  if (!data || data.length === 0)
    return (
      <Link
        href="/new"
        className="group flex h-[305px] w-auto rounded border-[1px] border-dashed border-white-100/50 hover:cursor-pointer hover:border-yellow-200"
      >
        <div className="mx-auto my-auto inline-flex pb-3">
          <span className="text-8xl text-white-100/50 group-hover:text-yellow-200">
            <VscNewFolder />
          </span>
        </div>
      </Link>
    );

  return (
    <div className="mt-16 grid grid-cols-3 gap-x-4 gap-y-4 pb-20 max-sm:grid-cols-2 lg:grid-cols-4">
      {data.map((fullShowcase) => (
        <ShowcaseView {...fullShowcase} key={fullShowcase.showcase.id} />
      ))}
      <Link
        href="/new"
        className="group flex h-[305px] w-auto rounded border-[1px] border-dashed border-white-100/50 hover:cursor-pointer hover:border-yellow-200"
      >
        <div className="mx-auto my-auto inline-flex pb-3">
          <span className="text-8xl text-white-100/50 group-hover:text-yellow-200">
            <VscNewFolder />
          </span>
        </div>
      </Link>
    </div>
  );
};

const Dashboard = () => {
  const { user } = useUser();
  const isUserSignedIn = useUser().isSignedIn;
  const clerk = useClerk();

  if (!isUserSignedIn) return <div onLoad={void clerk.openSignIn({})}></div>;
  if (!user) return null;
  if (!user.username) return null;

  return (
    <>
      <Head>
        <title>user.username</title>
      </Head>
      <main className="absolute z-10 my-40 w-[100vw] py-4 px-6 md:left-[50%] md:ml-[-400px] md:w-[800px] lg:left-[50%] lg:ml-[-550px] lg:w-[1100px]">
        <div className="block">
          <div className="float-left mt-2 flex">
            <span>
              <Image
                className="rounded-full"
                src={user.profileImageUrl}
                alt={"user.png"}
                width={30}
                height={30}
              />
            </span>
            <span className="ml-2 text-xl text-white-100">
              {user?.username}
            </span>
          </div>
        </div>

        <div className="mt-16">
          <DashboardShowcases userId={user.id} />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
