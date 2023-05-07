import { MdClose } from "react-icons/md";
import { gruvboxDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import SyntaxHighlighter from 'react-syntax-highlighter';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  code: string
}

export const Modal = ({ isOpen, onClose, code }: ModalProps ) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20">
            <div onClick={onClose} className="inset-0">
              <div className="fixed inset-0 bg-[#000]/70"></div>
            </div>
            <div className="z-10 inline-block w-[1000px] overflow-hidden bg-black-600 px-8 py-8 text-left font-medium text-white-100/80">
              <div>
                <div className="relative">
                  <button
                    onClick={onClose}
                    className="absolute right-0 -mr-2 -mt-8 p-2 text-xl hover:bg-yellow-200 hover:text-black-600"
                  >
                    <MdClose />
                  </button>
                  <h1 className="mt-6">TailwindCSS</h1>
                  <SyntaxHighlighter language="html" className="mt-2 rounded border-4 border-[#282828] h-[600px]" style={gruvboxDark}>
                    {code}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;