import { type NextPage } from "next";
import Head from "next/head";
import { Resizable } from "re-resizable";
import { useState, useEffect } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { GoCode } from "react-icons/go";
import Modal from "~/components/ui/Modal";
import { LoadingPage } from "~/components/ui/loading";
import { ProjectView } from "~/components/projectview";

const ShowcaseProjects = (props: { showcaseId: string }) => {
  const { data, isLoading } = api.projects.getProjectsByShowcaseId.useQuery({
    showcaseId: props.showcaseId,
  });

  if (isLoading) return <LoadingPage />;
  if (!data || data.length === 0)
    return (
      <div className="text-center mt-60 text-white-100">
        This showcase doesn&#39;t have any projects yet, try clicking insert to
        make one.
      </div>
    );

  return (
    <div className="grid grid-cols-4 gap-5">
      {data.map((fullProject) => (
        <ProjectView {...fullProject} key={fullProject.project.id} />
      ))}
    </div>
  );
};

const Showcase: NextPage = () => {
  const [width, setWidth] = useState(1050);
  const [height, setHeight] = useState(700);
  const [input, setInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { asPath } = useRouter();
  const showcaseId = asPath.replace("/showcase/", "");

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const { data } = api.showcases.getShowcaseById.useQuery({
    id: showcaseId
  });

  useEffect(() => {
    if (data) {
      setInput(data.title);
    }
  }, [data]);

  if (!data) return null;

  return (
    <>
      <Head>
        <title>Showcase</title>
      </Head>
      <main className="absolute left-[50%] my-28 ml-[-700px] w-[1400px] px-6 py-4">
        <div className="relative flex">
          <GoCode className="h-[45px] w-[40px] rounded-sm bg-yellow-200 p-2 text-black-600" />
          <div className="ml-3 -mt-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="h-[30px] w-[300px] rounded-sm border-2 border-black-600 bg-yellow-200 px-[6px] pb-[3px] text-[18px] font-bold text-yellow-200 hover:border-yellow-200 focus:border-yellow-200 focus:outline-none"
            />
            <div className="font-semibold text-yellow-200">
              <button
                onClick={handleModalOpen}
                className="rounded-sm px-2 hover:bg-yellow-200 hover:text-black-600"
              >
                Insert
              </button>
              <Modal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                showcaseId={showcaseId}
              />
              <button className="rounded-sm px-2 hover:bg-yellow-200 hover:text-black-600">
                Remove
              </button>
            </div>
          </div>
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
          <div className="p-16">
              <ShowcaseProjects showcaseId={showcaseId} />
          </div>
        </Resizable>
      </main>
    </>
  );
};

export default Showcase;
