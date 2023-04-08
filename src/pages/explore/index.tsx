import { useClerk, useUser } from "@clerk/nextjs";
import Head from "next/head";
import { LoadingPage } from "~/components/ui/loading";
import { api } from "~/utils/api";
import { ShowcaseView } from "~/components/showcaseview";

const ExploreShowcases = () => {
  const { data, isLoading } = api.showcases.getAll.useQuery();

  if (isLoading) return <LoadingPage />;
  if (!data || data.length === 0) return null;

  return (
    <div className="mt-16 grid grid-cols-3 gap-x-4 gap-y-4 pb-20 max-sm:grid-cols-2 lg:grid-cols-4">
      {data.map((fullShowcase) => (
        <ShowcaseView {...fullShowcase} key={fullShowcase.showcase.id} />
      ))}
    </div>
  );
};

const ExplorePage = () => {
  const { user } = useUser();
  const isUserSignedIn = useUser().isSignedIn;
  const clerk = useClerk();

  if (!isUserSignedIn) return <div onLoad={void clerk.openSignIn({})}></div>;
  if (!user) return null;
  if (!user.username) return null;

  return (
    <>
      <Head>
        <title>Explore</title>
      </Head>
      <main className="absolute z-10 my-40 w-[100vw] py-4 px-6 md:left-[50%] md:ml-[-400px] md:w-[800px] lg:left-[50%] lg:ml-[-550px] lg:w-[1100px]">
        <div className="block">
          <div className="float-left mt-2 flex">
            <span className="ml-2 text-xl text-white-100">
              Explore
            </span>
          </div>
        </div>

        <div className="mt-16">
          <ExploreShowcases />
        </div>
      </main>
    </>
  );
};

export default ExplorePage;
