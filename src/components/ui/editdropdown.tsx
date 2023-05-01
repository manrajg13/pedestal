export const EditDropdown = () => {
  return (
    <div className="absolute right-6 z-20 mt-4 w-[300px] border-white-100/25 bg-black-500/70 p-6 text-sm font-semibold text-white-100">
      <p className="mb-4 text-base font-bold">Customize</p>

      <p>Main div</p>
      <div className="mt-2 mb-4">
        <div className="mt-1 flex">
          <input type="color" className="mr-2 h-[20px]" />
          <p>Background</p>
        </div>

        <div className="mt-1 flex">
          <input type="number" className="mr-2 h-[20px] w-[64px] border-[1px] border-white-100/50" />
          <p>Width</p>
        </div>

        <div className="mt-1 flex">
          <input type="number" className="mr-2 h-[20px] w-[64px] border-[1px] border-white-100/50" />
          <p>Height</p>
        </div>
      </div>

      <p>Project divs</p>
      <div className="mt-2 mb-4">
        <div className="mt-1 flex">
          <input type="color" className="mr-2 h-[20px]" />
          <p>Border</p>
        </div>

        <div className="mt-1 flex">
          <input type="color" className="mr-2 h-[20px]" />
          <p>Background</p>
        </div>

        <div className="mt-1 flex">
          <input type="number" className="mr-2 h-[20px] w-[64px] border-[1px] border-white-100/50" />
          <p>Border Weight</p>
        </div>

        <div className="mt-1 flex">
          <input type="number" className="mr-2 h-[20px] w-[64px] border-[1px] border-white-100/50" />
          <p>Width</p>
        </div>

        <div className="mt-1 flex">
          <input type="number" className="mr-2 h-[20px] w-[64px] border-[1px] border-white-100/50" />
          <p>Height</p>
        </div>
      </div>

      <p>Text</p>
      <div className="mt-2">
        <div className="mt-1 flex">
          <input type="checkbox" className="mr-2 h-[20px] w-[64px] border-[1px] border-white-100/50" />
          <p>Icon</p>
        </div>

        <div className="mt-1 flex">
          <input type="color" className="mr-2 h-[20px]" />
          <p>Icon</p>
        </div>

        <div className="mt-1 flex">
          <input type="color" className="mr-2 h-[20px]" />
          <p>Title</p>
        </div>

        <div className="mt-1 flex">
          <input type="color" className="mr-2 h-[20px]" />
          <p>Description</p>
        </div>

        <div className="mt-1 flex">
          <input type="color" className="mr-2 h-[20px]" />
          <p>Link</p>
        </div>

        <div className="mt-1 flex">
          <input type="color" className="mr-2 h-[20px]" />
          <p>Link background</p>
        </div>

        <div className="mt-1 flex">
          <input type="number" className="mr-2 h-[20px] w-[64px] border-[1px] border-white-100/50" />
          <p>Title Size</p>
        </div>

        <div className="mt-1 flex">
          <input type="number" className="mr-2 h-[20px] w-[64px] border-[1px] border-white-100/50" />
          <p>Description Size</p>
        </div>

        <div className="mt-1 flex">
          <input type="number" className="mr-2 h-[20px] w-[64px] border-[1px] border-white-100/50" />
          <p>Link Size</p>
        </div>
      </div>
    </div>
  );
};
