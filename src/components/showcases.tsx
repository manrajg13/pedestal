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
import { LoadingPage } from './ui/loading';

dayjs.extend(relativeTime);

type ShowcaseWithUser = RouterOutputs["showcases"]["getAll"][number];

export const Showcases = () => {
  const { data, isLoading } = api.showcases.getAll.useQuery();

  if (isLoading) return <LoadingPage />

  if (!data) 
    return (
      <main className="absolute left-[50%] ml-[-30vw] mt-60 w-[60vw] text-center text-xl text-white-100">
        Something went wrong
      </main>
    )

  const ShowcaseView = (props: ShowcaseWithUser) => {
    const { showcase, author } = props;

    return (
      <div key={showcase.type}>
        <div className="group relative h-[305px] w-auto rounded bg-white-100/[5%] hover:cursor-pointer hover:bg-yellow-200">
          {showcase.type == "code" && (
            <div className="flex h-[140px] w-[100%] rounded-tl-sm rounded-tr-sm bg-white-100/[15%]">
              <GoCode className="mx-auto my-auto text-9xl text-white-100/50" />
            </div>
          )}
          {showcase.type == "art" && (
            <div className="flex h-[140px] w-[100%] rounded-tl-sm rounded-tr-sm bg-white-100/[15%]">
              <FaBrush className="mx-auto my-auto text-8xl text-white-100/50" />
            </div>
          )}
          {showcase.type == "photo" && (
            <div className="flex h-[140px] w-[100%] rounded-tl-sm rounded-tr-sm bg-white-100/[15%]">
              <RiPolaroid2Fill className="mx-auto my-auto text-[110px] text-white-100/50" />
            </div>
          )}
          <div className="inline-flex pb-3">
            <div className="relative px-5 pt-4 group-hover:text-black-500">
              <span
                key={showcase.id}
                className="flex font-semibold break-all text-white-100 group-hover:text-black-600"
              >
                {showcase.title}
              </span>
            </div>
          </div>
          <div className="absolute flex text-xs left-5 bottom-6">
            <Image
              className="rounded-full"
              src={author.profileImageUrl}
              alt={"Profile image"}
              width={34}
              height={30}
            />
            <div className="ml-2">
              <p className="font-bold text-white-100/75 group-hover:text-black-600">
                {author.username}
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
        className="group flex h-[305px] w-auto rounded border-[1px] border-dashed border-white-100/50 hover:cursor-pointer hover:border-yellow-200"
      >
        <div className="inline-flex pb-3 mx-auto my-auto">
          <span className="text-8xl text-white-100/50 group-hover:text-yellow-200">
            <VscNewFolder />
          </span>
        </div>
      </Link>
    </>
  );
};
