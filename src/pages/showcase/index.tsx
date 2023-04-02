import { Resizable } from "re-resizable";
import { useState } from "react";
import { RouterOutputs } from "~/utils/api";

type ShowcaseWithUser = RouterOutputs["showcases"]["getAll"][number];

const Showcase = () => {
  const [width, setWidth] = useState(1050);
  const [height, setHeight] = useState(700);

  return (
    <main className="absolute left-[50%] ml-[-708px] mt-24 flex w-[1416px] gap-2">
      <h1></h1>
      <Resizable
        defaultSize={{ width: 1050, height: 700 }}
        onResizeStop={(e, direction, ref, d) => {
          setWidth(width + d.width);
          setHeight(height + d.height);
        }}
        className="mx-auto border-2 border-yellow-200"
      ></Resizable>
    </main>
  );
};

export default Showcase;
