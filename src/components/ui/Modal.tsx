interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose }: ModalProps) => {  
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20">
            <div onClick={onClose} className="inset-0">
              <div className="fixed inset-0 bg-[#000]/70"></div>
            </div>
            <div className="z-10 inline-block w-[380px] overflow-hidden bg-black-600 px-8 py-8 text-left font-medium text-white-100">
              <div>
                <div>
                  <h3 className="text-lg text-white-100">
                    Insert New Project
                  </h3>
                  <div className="mt-6 bg-black-500">
                    <input
                      autoFocus
                      type="text"
                      placeholder="Project name"
                      className="h-[40px] w-[100%] bg-black-500 px-2 placeholder:text-white-100/50 focus:outline-none"
                    />
                  </div>
                  <div className="mt-4 bg-black-500">
                    <textarea
                      autoFocus
                      placeholder="Project description"
                      className="mt-1 min-h-[100px] w-[100%] max-h-[300px] bg-black-500 px-2 placeholder:text-white-100/50 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="bg-black-500">
                      <input
                        autoFocus
                        type="text"
                        placeholder="Tag 1"
                        className="h-[40px] bg-black-500 px-2 placeholder:text-white-100/50 focus:outline-none"
                      />
                    </div>
                    <div className="bg-black-500">
                      <input
                        autoFocus
                        type="text"
                        placeholder="Tag 2"
                        className="h-[40px] bg-black-500 px-2 placeholder:text-white-100/50 focus:outline-none"
                      />
                    </div>
                    <div className="bg-black-500">
                      <input
                        autoFocus
                        type="text"
                        placeholder="Tag 3"
                        className="h-[40px] bg-black-500 px-2 placeholder:text-white-100/50 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="mt-4 bg-black-500">
                    <input
                      autoFocus
                      type="text"
                      placeholder="Link"
                      className="h-[40px] w-[100%] bg-black-500 px-2 placeholder:text-white-100/50 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <button
                  type="button"
                  className="inline-flex w-full justify-center bg-yellow-200 px-4 py-[10px] text-sm hover:brightness-75"
                  onClick={onClose}
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
