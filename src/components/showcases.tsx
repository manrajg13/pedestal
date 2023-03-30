import { RiPolaroid2Fill } from "react-icons/ri";
import { FaBrush } from "react-icons/fa";
import { GoCode } from "react-icons/go";
import { api } from "~/utils/api";
import Link from "next/link";
import { VscNewFolder } from "react-icons/vsc";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type { RouterOutputs } from "~/utils/api";
import Image from "next/image";

dayjs.extend(relativeTime);

export const Showcases = () => {
  const { data, isLoading } = api.showcases.getAll.useQuery();

  type ShowcaseWithUser = RouterOutputs["showcases"]["getAll"][number];

  if (isLoading) {
    return (
      <main className="absolute left-[50%] ml-[-30vw] w-[60vw]">
        <svg
          className="w-20 mx-auto mt-60 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
        >
          <path
            fill="#fff"
            d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
          ></path>
        </svg>
      </main>
    );
  }

  if (!data)
    return (
      <main className="absolute left-[50%] ml-[-30vw] mt-60 w-[60vw] text-center text-xl text-white-100">
        Something went wrong
      </main>
    );

  const ShowcaseView = (props: ShowcaseWithUser) => {
    const { showcase, author } = props;

    return (
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
          <div className="absolute flex text-xs left-5 bottom-6">
            <Image
              className="rounded-full"
              src={author.profileImageUrl}
              alt={"Profile image"}
              width={30}
              height={30}
            />
            <div className="ml-2">
              <p className="font-bold text-white-100/75 group-hover:text-black-600">
                {author.username!}
              </p>
              <p className="mt-[2px] text-white-100/50 group-hover:text-black-600">
                {dayjs(showcase.createdOn).fromNow()}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {data.map((fullShowcase) => (
        <ShowcaseView {...fullShowcase} key={fullShowcase.showcase.id} />
      ))}
      <Link
        href="/new"
        className="group flex h-[360px] w-auto rounded border-[1px] border-dashed border-white-100/50 hover:cursor-pointer hover:border-yellow-200"
      >
        <div className="inline-flex pb-3 mx-auto my-auto">
          <span className="text-8xl text-white-100/50 group-hover:text-yellow-200 max-[648px]:hidden">
            <VscNewFolder />
          </span>
        </div>
      </Link>
    </>
  );
};
