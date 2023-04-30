import { useState } from "react";
import { MdClose } from "react-icons/md";
import { api } from "~/utils/api";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  showcaseId: string;
}

const Modal = ({ isOpen, onClose, showcaseId }: ModalProps) => {
  const { mutate, isLoading: isPosting } = api.projects.create.useMutation();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [tag1, setTag1] = useState("");
  const [tag2, setTag2] = useState("");
  const [tag3, setTag3] = useState("");
  const [link, setLink] = useState("");

  function handleOnSave() {
    mutate({
      name: name,
      description: desc,
      tag_1: tag1,
      tag_2: tag2,
      tag_3: tag3,
      link: link,
      showcaseId: showcaseId,
    });

    onClose()
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20">
            <div onClick={onClose} className="inset-0">
              <div className="fixed inset-0 bg-[#000]/70"></div>
            </div>
            <div className="z-10 inline-block w-[380px] overflow-hidden bg-black-600 px-8 py-8 text-left font-medium text-white-100/80">
              <div>
                <div className="relative">
                  <button
                    onClick={onClose}
                    className="absolute right-0 -mr-2 -mt-8 p-2 text-xl hover:bg-yellow-200 hover:text-black-600"
                  >
                    <MdClose />
                  </button>
                  <h3 className="mt-6 text-lg text-white-100">
                    Insert New Project
                  </h3>
                  <div className="mt-4 bg-black-500">
                    <input
                      autoFocus
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Project Name"
                      className="h-[40px] w-[100%] bg-black-500 px-2 placeholder:text-white-100/50 focus:outline-none"
                    />
                  </div>
                  <div className="mt-4 bg-black-500">
                    <textarea
                      placeholder="Project Description"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      className="mt-1 max-h-[300px] min-h-[100px] w-[100%] bg-black-500 px-2 placeholder:text-white-100/50 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="mt-4 bg-black-500">
                      <input
                        type="text"
                        placeholder="Tag 1"
                        value={tag1}
                        onChange={(e) => setTag1(e.target.value)}
                        className="h-[40px] bg-black-500 px-2 placeholder:text-white-100/50 focus:outline-none"
                      />
                    </div>
                    <div className="mt-4 bg-black-500">
                      <input
                        type="text"
                        placeholder="Tag 2"
                        value={tag2}
                        onChange={(e) => setTag2(e.target.value)}
                        className="h-[40px] bg-black-500 px-2 placeholder:text-white-100/50 focus:outline-none"
                      />
                    </div>
                    <div className="mt-4 bg-black-500">
                      <input
                        type="text"
                        placeholder="Tag 3"
                        value={tag3}
                        onChange={(e) => setTag3(e.target.value)}
                        className="h-[40px] bg-black-500 px-2 placeholder:text-white-100/50 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="mt-4 bg-black-500">
                    <input
                      type="text"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      placeholder="Link"
                      className="h-[40px] w-[100%] bg-black-500 px-2 placeholder:text-white-100/50 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <button
                  type="button"
                  className="inline-flex w-full justify-center bg-yellow-200 px-4 py-[10px] text-sm font-semibold hover:brightness-75"
                  onClick={handleOnSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
