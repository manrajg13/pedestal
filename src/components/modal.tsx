import { AiOutlineClose } from "react-icons/ai"

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  return isOpen ? (
    <div>
      <div className="fixed drop-shadow inset-0 bg-black-600/75" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-md">
        <div className="flex justify-end bg-black-500">
          <button 
            onClick={onClose}
            className="p-2 m-4 text-white-100 text-xl hover:bg-yellow-200 hover:text-black-500"  
          >
          <AiOutlineClose />
          </button>
        </div>
        {children}
      </div>
    </div>
  ) : null
}
