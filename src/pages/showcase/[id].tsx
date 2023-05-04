import { type NextPage } from "next";
import Head from "next/head";
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
import { useClerk, useUser } from "@clerk/nextjs";
import { EditDropdown } from "~/components/ui/editdropdown";
import { type Showcase } from "@prisma/client";

dayjs.extend(relativeTime);

const ShowcaseProjects = (props: { showcase: Showcase }) => {
  const { data, isLoading } = api.projects.getProjectsByShowcaseId.useQuery({
    showcaseId: props.showcase.id,
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

  const containerStyle = {
    "gap": props.showcase.c_gap,
    "grid-template-columns": "repeat(" + props.showcase.c_cols.toString() + ", minmax(0, 1fr))",
  }

  return (
    <div style={containerStyle} className="grid">
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
  const { asPath } = useRouter();
  const showcaseId = asPath.replace("/showcase/", "");
  const isUserSignedIn = useUser().isSignedIn;
  const clerk = useClerk();
  const [showDropdown, setShowDropdown] = useState(false);

  const { data } = api.showcases.getShowcaseById.useQuery({
    id: showcaseId,
  });

  if (!data) return null;

  if (!isUserSignedIn) return <div onLoad={void clerk.openSignIn({})}></div>;

  const containerStyle = {
    "background": data.c_background,
    "width": data.c_width,
    "height": data.c_height,
  }

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
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="absolute bottom-0 right-0 my-auto flex rounded-sm border-[1px] border-yellow-200 py-1 px-3 text-yellow-200 hover:bg-yellow-200/10"
          >
            <AiFillEdit className="mt-1 mr-2" />
            <p>Edit</p>
          </button>
        </div>

        {showDropdown && <EditDropdown showcase={data} />}

        <div style={containerStyle} className="mx-auto w-[1350px] h-[700px] mt-4 overflow-hidden bg-black-500/40 scrollbar-hide">
          <div className="p-16">
            <ShowcaseProjects showcase={data} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Showcase;