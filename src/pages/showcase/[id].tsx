import { type NextPage } from "next";
import Head from "next/head";
import { Resizable } from "re-resizable";
import { useState } from "react";

const Showcase: NextPage = () => {
  const [width, setWidth] = useState(1050);
  const [height, setHeight] = useState(700);

  return (
    <>
      <Head>
        <title>Showcase</title>
      </Head>
      <main className="absolute left-[50%] ml-[-708px] mt-24 flex w-[1416px] gap-2">
        <h1></h1>
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
