import { type NextPage } from "next";
import Head from "next/head";
import { Resizable } from "re-resizable";
import { useState, useEffect } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import querystring from "querystring";
import { GoCode } from "react-icons/go";
import { FaFolderOpen } from "react-icons/fa";
import Link from "next/link";
import Modal from "~/components/ui/Modal";

const Showcase: NextPage = () => {
  const [width, setWidth] = useState(1050);
  const [height, setHeight] = useState(700);
  const [input, setInput] = useState("");
  const [projectCount, setProjectCount] = useState(1);
  const router = useRouter();
  const queryStr = querystring.stringify(router.query);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setProjectCount(projectCount + 1);
  };

  const projects = [];
  for (let i = 0; i < projectCount; i++) {
    projects.push(
      <Link
        href="some_link"
        key={i}
        className="group relative h-[280px] border border-white-100 p-7 text-white-100 shadow-lg transition hover:-translate-y-1
													hover:border-yellow-200 hover:text-yellow-200"
      >
        <FaFolderOpen className="mb-4 text-5xl" />
        <h1 className="text-lg font-bold leading-3">PROJECT NAME</h1>
        <p className="mt-6 leading-4 text-md">
          A small description of the project or some comments, I have no idea.
        </p>
        <div className="absolute inline-flex text-sm bottom-9">
          <p className="mr-1 bg-white-100/[0.2] p-[3px] px-2 text-white-100 group-hover:bg-yellow-200/[0.2] group-hover:text-yellow-200">
            Technologies
          </p>
          <p className="mr-1 bg-white-100/[0.2] p-[3px] px-2 text-white-100 group-hover:bg-yellow-200/[0.2] group-hover:text-yellow-200">
            Used
          </p>
        </div>
      </Link>
    );
  }

  const { data } = api.showcases.getShowcaseById.useQuery({
    id: queryStr.replace("id=", ""),
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
                className="px-2 rounded-sm hover:bg-yellow-200 hover:text-black-600"
              >
                Insert
              </button>
              <Modal
                isOpen={isModalOpen}
                onClose={handleModalClose}
              />
              <button className="px-2 rounded-sm hover:bg-yellow-200 hover:text-black-600">
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
          className="mx-auto mt-4 overflow-x-hidden overflow-y-auto bg-black-500/40 scrollbar-hide"
        >
          <div className="p-16">
            <div className="grid grid-cols-4 gap-5">{projects}</div>
          </div>
        </Resizable>
      </main>
    </>
  );
};

export default Showcase;
