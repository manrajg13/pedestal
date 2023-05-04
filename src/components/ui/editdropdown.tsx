import { type Showcase } from "@prisma/client";
import { useState } from "react";
import { api } from "~/utils/api";

export const EditDropdown = (props: { showcase: Showcase }) => {
  const ctx = api.useContext();
  const { mutate } = api.showcases.update.useMutation({
    onSuccess: () => {
      void ctx.showcases.invalidate();
    }
  });
  const data = props.showcase;

  const [cBackground, setCBackground] = useState(data.c_background);
  const [cWidth, setCWidth] = useState(data.c_width);
  const [cHeight, setCHeight] = useState(data.c_height);
  const [cGapSize, setCGapSize] = useState(data.c_gap);
  const [cColumns, setCColumns] = useState(data.c_cols);

  const [pBorderColor, setPBorderColor] = useState(data.p_border_color);
  const [pBackground, setPBackground] = useState(data.p_background);
  const [pBorderWeight, setPBorderWeight] = useState(data.p_border_weight);
  const [pBorderRoundness, setPBorderRoundness] = useState(
    data.p_border_roundness
  );
  const [pHeight, setPHeight] = useState(data.p_height);

  const [tIconColor, setTIconColor] = useState(data.t_icon);
  const [tTextColor, setTColor] = useState(data.t_text_color);
  const [tIconSize, setTIconSize] = useState(data.t_icon_size);
  const [tTitleSize, setTTitleSize] = useState(data.t_title_size);
  const [tDescSize, setTDescSize] = useState(data.t_description_size);
  const [tLinkSize, setTLinkSize] = useState(data.t_link_size);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    mutate({
      id: data.id,
      c_background: cBackground,
      c_width: cWidth,
      c_height: cHeight,
      c_gap: cGapSize,
      c_cols: cColumns,
      p_border_color: pBorderColor,
      p_background: pBackground,
      p_border_weight: pBorderWeight,
      p_border_roundness: pBorderRoundness,
      p_height: pHeight,
      t_icon: tIconColor,
      t_text_color: tTextColor,
      t_icon_size: tIconSize,
      t_title_size: tTitleSize,
      t_description_size: tDescSize,
      t_link_size: tLinkSize,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="absolute right-6 z-20 mt-4 w-[300px] border-white-100/25 bg-black-500/70 p-6 text-sm font-semibold text-white-100">
      <p className="mb-4 text-base font-bold">Customize</p>

      <p>Container</p>
      <div className="mt-2 mb-4">
        <div className="mt-1 flex">
          <input
            type="color"
            value={cBackground}
            onChange={(e) => setCBackground(e.target.value)}
          />
          <p>Background</p>
        </div>

        <div className="mt-1 flex">
          <input
            type="range"
            min={400}
            max={1350}
            value={cWidth}
            onChange={(e) => setCWidth(parseInt(e.target.value))}
          />
          <p>Width</p>
        </div>

        <div className="mt-1 flex">
          <input
            type="range"
            min={200}
            max={1200}
            value={cHeight}
            onChange={(e) => setCHeight(parseInt(e.target.value))}
          />
          <p>Height</p>
        </div>

        <div className="mt-1 flex">
          <input
            type="range"
            min={0}
            max={40}
            value={cGapSize}
            onChange={(e) => setCGapSize(parseInt(e.target.value))}
          />
          <p>Gap Size</p>
        </div>

        <div className="mt-1 flex">
          <input
            type="range"
            min={0}
            max={8}
            value={cColumns}
            onChange={(e) => setCColumns(parseInt(e.target.value))}
          />
          <p>Columns</p>
        </div>
      </div>

      <p>Projects</p>
      <div className="mt-2 mb-4">
        <div className="mt-1 flex">
          <input
            type="color"
            value={pBorderColor}
            onChange={(e) => setPBorderColor(e.target.value)}
          />
          <p>Border</p>
        </div>

        <div className="mt-1 flex">
          <input
            type="color"
            value={pBackground}
            onChange={(e) => setPBackground(e.target.value)}
          />
          <p>Background</p>
        </div>

        <div className="mt-1 flex">
          <input
            type="range"
            min={0}
            max={20}
            value={pBorderWeight}
            onChange={(e) => setPBorderWeight(parseInt(e.target.value))}
          />
          <p>Border Weight</p>
        </div>

        <div className="mt-1 flex">
          <input
            type="range"
            min={0}
            max={40}
            value={pBorderRoundness}
            onChange={(e) => setPBorderRoundness(parseInt(e.target.value))}
          />
          <p>Border Roundness</p>
        </div>

        <div className="mt-1 flex">
          <input
            type="range"
            min={100}
            max={400}
            value={pHeight}
            onChange={(e) => setPHeight(parseInt(e.target.value))}
          />
          <p>Height</p>
        </div>
      </div>

      <p>Text</p>
      <div className="mt-2">
        <div className="mt-1 flex">
          <input
            type="color"
            value={tIconColor}
            onChange={(e) => setTIconColor(e.target.value)}
          />
          <p>Icon</p>
        </div>

        <div className="mt-1 flex">
          <input
            type="color"
            value={tTextColor}
            onChange={(e) => setTColor(e.target.value)}
          />
          <p>Text</p>
        </div>

        <div className="mt-1 flex">
          <input
            type="range"
            min={0}
            max={80}
            value={tIconSize}
            onChange={(e) => setTIconSize(parseInt(e.target.value))}
          />
          <p>Icon Size</p>
        </div>

        <div className="mt-1 flex">
          <input
            type="range"
            min={12}
            max={40}
            value={tTitleSize}
            onChange={(e) => setTTitleSize(parseInt(e.target.value))}
          />
          <p>Title Size</p>
        </div>

        <div className="mt-1 flex">
          <input
            type="range"
            min={12}
            max={40}
            value={tDescSize}
            onChange={(e) => setTDescSize(parseInt(e.target.value))}
          />
          <p>Description Size</p>
        </div>

        <div className="mt-1 flex">
          <input
            type="range"
            min={12}
            max={40}
            value={tLinkSize}
            onChange={(e) => setTLinkSize(parseInt(e.target.value))}
          />
          <p>Link Size</p>
        </div>

        <button type="submit" className="mt-6 w-full bg-yellow-200 p-2 pb-3 hover:brightness-75">
          Apply
        </button>
      </div>
    </form>
  );
};
