import { type NextPage } from "next";
import Head from "next/head";
import { Resizable } from "re-resizable";
import { useState, useEffect } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { RiPolaroid2Fill } from "react-icons/ri";
import { FaBrush } from "react-icons/fa";
import { GoCode } from "react-icons/go";
import Modal from "~/components/ui/Modal";
import { LoadingPage } from "~/components/ui/loading";
import { ProjectView } from "~/components/projectview";
import { BsPlus } from "react-icons/bs";
import { BsFillDiamondFill } from "react-icons/bs";

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
      {data && data.map((fullProject) => (
        <ProjectView {...fullProject} key={fullProject.project.id} />
      ))}
      <div
        onClick={handleModalOpen}
        className="flex border h-[280px] border-dashed border-white-100/50 text-8xl text-white-100/50 shadow-lg transition
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

  const { data } = api.showcases.getShowcaseById.useQuery({
    id: showcaseId,
  });

  if (!data) return null;

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
          <p className="my-auto ml-4 text-[20px] font-bold text-yellow-200">
            {data.title}
          </p>
          <button className="absolute right-0 h-[45px] rounded-sm bg-yellow-200 px-3 font-semibold text-black-600 hover:brightness-75">
            Grab Snippet
          </button>
        </div>
        <Resizable
          defaultSize={{ width: 1350, height: 700 }}
          minWidth={400}
          maxWidth={1350}
          minHeight={300}
          onResizeStop={(e, direction, ref, d) => {
            setWidth(width + d.width);
            setHeight(height + d.height);
          }}
          className="mx-auto mt-4 overflow-y-auto overflow-x-hidden bg-black-500/40 scrollbar-hide"
        >
          <BsFillDiamondFill className="absolute -right-7 -bottom-7 text-5xl text-white-100/50 scale-x-[-1]" />
          <BsFillDiamondFill className="absolute -left-7 -bottom-7 text-5xl text-white-100/50 scale-x-[-1]" />
          <div className="p-16">
            <ShowcaseProjects showcaseId={showcaseId} />
          </div>
        </Resizable>
      </main>
    </>
  );
};

export default Showcase;
