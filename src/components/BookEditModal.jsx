import React from "react";

const BookEditModal = ({ open, onClose, children }) => {
  return (
    <div
      onClick={onClose}
      className={`fle fixed inset-0 items-center justify-center transition-colors ${open ? "bg-black-main/20 visible" : "invisible"}`}
    >
      ...
    </div>
  );
};

export default BookEditModal;
