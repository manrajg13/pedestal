import type { GetStaticProps, NextPage } from "next";
import { FaCalendar } from "react-icons/fa";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import Image from "next/image";
import { api } from "../utils/api";

dayjs.extend(relativeTime);

const ProfileShowcases = (props: { userId: string }) => {
  const { data, isLoading } = api.showcases.getShowcaseByUserId.useQuery({
    userId: props.userId,
  });

  if (isLoading) return <LoadingPage />;
  if (!data || data.length === 0)
    return (
      <div className="text-center text-white-100">User has not posted.</div>
    );

  return (
    <div className="mt-16 grid grid-cols-3 gap-x-4 gap-y-4 pb-20 max-sm:grid-cols-2 lg:grid-cols-4">
      {data.map((fullShowcase) => (
        <ShowcaseView {...fullShowcase} key={fullShowcase.showcase.id} />
      ))}
    </div>
  );
};

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { data } = api.profile.getUserByUsername.useQuery({
    username,
  });

  if (!data) return <div>404</div>;

  const dateData = new Date(data.createdOn);
  const date = `${dateData.toLocaleDateString("default", {
    month: "long",
  })} ${dateData.getDate()}, ${dateData.getFullYear()}`;

  if (!date) return null;

  return (
    <>
      <Head>
        <title>{data.username}</title>
      </Head>
      <main className="absolute z-10 w-[100vw] py-4 px-6 md:left-[50%] md:ml-[-400px] md:w-[800px] lg:left-[50%] lg:ml-[-550px] lg:w-[1100px]">
        <div className="mx-auto mt-24">
          <div>
            <Image
              className="mx-auto rounded-full border-white-100/75"
              src={data.profileImageUrl}
              alt={"user.png"}
              width={120}
              height={120}
            />
          </div>
          <div className="text-center text-white-100">
            <h1 className="mt-6 text-xl font-bold">{data.username}</h1>
          </div>
          <div className="text-center text-white-100/75">
            <div className="inline-flex">
              <span className="mt-[3px] mr-1">
                <FaCalendar />
              </span>
              <span>Joined {date}</span>
            </div>
          </div>
          <div className="mt-4 h-[1px] w-full bg-white-200/25" />
          <div className="mt-8">
            <ProfileShowcases userId={data.id} />
          </div>
        </div>
      </main>
    </>
  );
};

import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import superjson from "superjson";
import Head from "next/head";
import { LoadingPage } from "~/components/ui/loading";
import { ShowcaseView } from "~/components/showcaseview";

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: superjson, // optional - adds superjson serialization
  });

  const slug = context.params?.slug;

  if (typeof slug !== "string") throw new Error("no slug");

  const username = slug;
  await ssg.profile.getUserByUsername.prefetch({ username });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      username,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};
export default ProfilePage;
