import { type NextPage } from "next";
import Head from "next/head";
import { Resizable } from "re-resizable";
import { useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { RiPolaroid2Fill } from "react-icons/ri";
import { FaBrush } from "react-icons/fa";
import { GoCode } from "react-icons/go";
import Modal from "~/components/ui/Modal";
import { LoadingPage } from "~/components/ui/loading";
import { ProjectView } from "~/components/projectview";
import { BsPlus } from "react-icons/bs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AiFillEdit } from "react-icons/ai";
import { BsFillDiamondFill } from "react-icons/bs";
import { useClerk, useUser } from "@clerk/nextjs";
import { EditDropdown } from "~/components/ui/editdropdown";

dayjs.extend(relativeTime);

const ShowcaseProjects = (props: { showcaseId: string }) => {
  const { data, isLoading } = api.projects.getProjectsByShowcaseId.useQuery({
    showcaseId: props.showcaseId,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { asPath } = useRouter();
  const showcaseId = asPath.replace("/showcase/", "");

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  if (isLoading) return <LoadingPage />;

  return (
    <div className="grid grid-cols-4 gap-5">
      {data &&
        data.map((fullProject) => (
          <ProjectView {...fullProject} key={fullProject.project.id} />
        ))}
      <div
        onClick={handleModalOpen}
        className="flex h-[280px] border border-dashed border-white-100/50 text-8xl text-white-100/50 shadow-lg transition
                    hover:cursor-pointer hover:border-white-100 hover:text-white-100"
      >
        <BsPlus className="m-auto" />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        showcaseId={showcaseId}
      />
    </div>
  );
};

const Showcase: NextPage = () => {
  const [width, setWidth] = useState(1050);
  const [height, setHeight] = useState(700);
  const { asPath } = useRouter();
  const showcaseId = asPath.replace("/showcase/", "");
  const isUserSignedIn = useUser().isSignedIn;
  const clerk = useClerk();
  const [showDropdown, setShowDropdown] = useState(false)

  const { data } = api.showcases.getShowcaseById.useQuery({
    id: showcaseId,
  });

  if (!data) return null;

  if (!isUserSignedIn) return <div onLoad={void clerk.openSignIn({})}></div>;

  return (
    <>
      <Head>
        <title>Showcase</title>
      </Head>
      <main className="absolute left-[50%] my-28 ml-[-700px] w-[1400px] px-6 py-4">
        <div className="relative flex">
          {data.type == "code" && (
            <GoCode className="h-[45px] w-[40px] rounded-sm bg-yellow-200 p-2 text-black-600" />
          )}
          {data.type == "photo" && (
            <RiPolaroid2Fill className="h-[45px] w-[40px] rounded-sm bg-yellow-200 p-2 text-black-600" />
          )}
          {data.type == "art" && (
            <FaBrush className="h-[45px] w-[40px] rounded-sm bg-yellow-200 p-3 text-black-600" />
          )}
          <div className="ml-4 -mt-1 text-[21px] font-bold text-yellow-200">
            <p>{data.title}</p>
            <p className="flex text-xs font-semibold">
              Created {dayjs(data.createdOn).fromNow()}
            </p>
          </div>
          <button onClick={() => setShowDropdown(!showDropdown)} className="absolute bottom-0 right-0 my-auto flex rounded-sm border-[1px] border-yellow-200 py-1 px-3 text-yellow-200 hover:bg-yellow-200/10">
            <AiFillEdit className="mt-1 mr-2" />
            <p>Edit</p>
          </button>
        </div>
        
        {showDropdown &&
          <EditDropdown />
        }

        <Resizable
          defaultSize={{ width: 1350, height: 700 }}
          minWidth={400}
          maxWidth={1350}
          minHeight={300}
          onResizeStop={(e, direction, ref, d) => {
            setWidth(width + d.width);
            setHeight(height + d.height);
          }}
          className="mx-auto mt-4 overflow-hidden bg-black-500/40 scrollbar-hide"
        >
          <BsFillDiamondFill className="absolute -right-7 -bottom-7 scale-x-[-1] text-5xl text-white-100/50" />
          <BsFillDiamondFill className="absolute -left-7 -bottom-7 scale-x-[-1] text-5xl text-white-100/50" />
          <div className="p-16">
            <ShowcaseProjects showcaseId={showcaseId} />
          </div>
        </Resizable>
      </main>
    </>
  );
};

export default Showcase;
