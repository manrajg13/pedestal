import { type NextPage } from "next";
import Head from "next/head";
import { Resizable } from "re-resizable";
import { useState } from "react";
import { api, RouterOutputs } from "~/utils/api";
import { useRouter } from 'next/router';
import { LoadingPage } from "~/components/ui/loading";

const Showcase: NextPage = () => {
  const [width, setWidth] = useState(1050);
  const [height, setHeight] = useState(700);
  const [input, setInput] = useState("");
  
  const router = useRouter();
  const {id} = router.query;

  const { data } = api.showcases.getShowcaseById.useQuery({
    id: id + "",
  });

  return (
    <>
      <Head>
        <title>Showcase</title>
      </Head>
      <main className="absolute z-10 my-32 w-[100vw] py-4 px-6 md:left-[50%] md:ml-[-400px] md:w-[800px] lg:left-[50%] lg:ml-[-550px] lg:w-[1100px]">
        <input
          autoFocus
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={data?.title}
          className="mt-1 h-[50px] w-full rounded-tl-lg rounded-tr-lg border-b-[1px] border-white-100/25 bg-black-500 px-2 placeholder:text-white-100/50 focus:outline-none"
        />
        <Resizable
          defaultSize={{ width: 1050, height: 700 }}
          minWidth={400}
          maxWidth={1050}
          minHeight={300}
          onResizeStop={(e, direction, ref, d) => {
            setWidth(width + d.width);
            setHeight(height + d.height);
          }}
          className="mx-auto border-2 border-yellow-200"
        ></Resizable>
      </main>
    </>
  );
};

export default Showcase;