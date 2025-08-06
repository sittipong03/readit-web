import React, { useState, useRef, useEffect } from 'react';

function MoreMenu({ onEdit, onDelete, onReport }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  function toggleMenu() {
    setOpen(prev => !prev);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="text-lg text-[#82776b] hover:text-black px-2"
        aria-label="More options"
      >
        ⋯
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-10 text-sm text-[#3a2f27]">
          {onEdit && (
            <button
              onClick={onEdit}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Delete
            </button>
          )}
          <button
            onClick={onReport}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Report
          </button>
        </div>
      )}
    </div>
  );
}


export default MoreMenu