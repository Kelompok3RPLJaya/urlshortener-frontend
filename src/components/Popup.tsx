import React, { useEffect } from "react";

interface Props {
  message: string;
  onClose: () => void;
}

const Popup: React.FC<Props> = ({ message, onClose }) => {
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     onClose();
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // }, [onClose]);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow">
        <p className="text-gray-800">{message}</p>
        <button
          className="mt-2 px-4 py-2 bg-gray-800 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
