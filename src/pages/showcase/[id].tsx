import { type NextPage } from "next";
import Head from "next/head";
import { Resizable } from "re-resizable";
import { useState, useEffect } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import querystring from "querystring";
import { GoCode } from "react-icons/go";

const Showcase: NextPage = () => {
  const [width, setWidth] = useState(1050);
  const [height, setHeight] = useState(700);
  const [input, setInput] = useState("");

  const router = useRouter();
  const queryStr = querystring.stringify(router.query);

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
      <main className="absolute z-10 my-28 w-[100vw] px-6 py-4 md:left-[50%] md:ml-[-400px] md:w-[800px] lg:left-[50%] lg:ml-[-550px] lg:w-[1100px]">
        <div className="flex relative">
          <GoCode className="h-[45px] w-[40px] rounded-sm bg-yellow-200 p-2 text-black-600" />
          <div className="ml-3 -mt-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="h-[30px] pb-[3px] w-[300px] font-bold rounded-sm border-2 border-black-600 px-[6px] text-[18px] text-yellow-200 bg-yellow-200 hover:border-yellow-200 focus:border-yellow-200 focus:outline-none"
            />
            <div className="text-yellow-200 font-semibold">
              <button className="rounded-sm px-2 hover:bg-yellow-200 hover:text-black-600">
                Insert
              </button>
              <button className="rounded-sm px-2 hover:bg-yellow-200 hover:text-black-600">
                Remove
              </button>
            </div>
          </div>
          <button className="h-[45px] px-3 rounded-sm font-semibold text-black-600 bg-yellow-200 text-black-600 absolute right-0">
            Grab Snippet
          </button>
        </div>
        <Resizable
          defaultSize={{ width: 1050, height: 700 }}
          minWidth={400}
          maxWidth={1050}
          minHeight={300}
          onResizeStop={(e, direction, ref, d) => {
            setWidth(width + d.width);
            setHeight(height + d.height);
          }}
          className="mx-auto mt-4 border-2 border-yellow-200"
        >
          <div className="p-8">
            <h1 className="text-white-100 text-2xl">Projects</h1>
          </div>
        </Resizable>
      </main>
    </>
  );
};

export default Showcase;
