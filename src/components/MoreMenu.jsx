import React, { useState, useRef, useEffect } from 'react';

function MoreMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  function toggleMenu() {
    setOpen(prev => !prev);
  }

  // Close menu on outside click
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
          <button className="block w-full text-left px-4 py-2 hover:bg-paper-elevation-1 bg-paper-elevation-1">Edit</button>
          <button className="block w-full text-left px-4 py-2 hover:bg-paper-elevation-1 bg-paper-elevation-1">Delete</button>
          <button className="block w-full text-left px-4 py-2 hover:bg-paper-elevation-1 bg-paper-elevation-1">Report</button>
        </div>
      )}
    </div>
  );
}

export default MoreMenu