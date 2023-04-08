import { RiPolaroid2Fill } from "react-icons/ri";
import { FaBrush } from "react-icons/fa";
import { GoCode } from "react-icons/go";
import Link from "next/link";
import Image from "next/image";
import { type RouterOutputs } from "~/utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type ShowcaseWithUser = RouterOutputs["showcases"]["getAll"][number];

export const ShowcaseView = (props: ShowcaseWithUser) => {
  const { showcase, author } = props;
  return (
    <div
      key={showcase.type}
      className="group relative rounded bg-white-100/[5%] hover:cursor-pointer hover:bg-yellow-200"
    >
      <Link href={`/showcase/${showcase.id}`}>
        {showcase.type == "code" && (
          <div className="flex h-[140px] w-full rounded-tl-sm rounded-tr-sm bg-white-100/[15%]">
            <GoCode className="mx-auto my-auto text-9xl text-white-100/50" />
          </div>
        )}
        {showcase.type == "art" && (
          <div className="flex h-[140px] w-full rounded-tl-sm rounded-tr-sm bg-white-100/[15%]">
            <FaBrush className="mx-auto my-auto text-8xl text-white-100/50" />
          </div>
        )}
        {showcase.type == "photo" && (
          <div className="flex h-[140px] w-full rounded-tl-sm rounded-tr-sm bg-white-100/[15%]">
            <RiPolaroid2Fill className="mx-auto my-auto text-[110px] text-white-100/50" />
          </div>
        )}
        <div className="inline-flex h-[155px] w-full">
          <div className="relative px-5 py-4 group-hover:text-black-500">
            <span
              key={showcase.id}
              className="flex break-all font-semibold text-white-100 group-hover:text-black-600"
            >
              {showcase.title}
            </span>
          </div>
        </div>
      </Link>
      <Link
        href={`/${author.username}`}
        className="group/author absolute bottom-6 left-5 flex text-xs"
      >
        <Image
          className="group/author rounded-full"
          src={author.profileImageUrl}
          alt={"user.png"}
          width={34}
          height={34}
        />
        <div className="ml-2">
          <p className="font-bold text-white-100/75 group-hover/author:underline group-hover:text-black-600">
            {author.username}
          </p>
          <p className="mt-[2px] text-white-100/50 group-hover:text-black-600">
            {dayjs(showcase.createdOn).fromNow()}
          </p>
        </div>
      </Link>
    </div>
  );
};
