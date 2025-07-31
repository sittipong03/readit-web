import React, { useState } from 'react';

function VoteButton({ icon: Icon, label }) {
  const [voted, setVoted] = useState(false);
  const [count, setCount] = useState(0);

  function handleToggle() {
    if (voted) {
      setCount(prev => prev - 1);
    } else {
      setCount(prev => prev + 1);
    }
    setVoted(!voted);
  }

  return (
    <button
      onClick={handleToggle}
      aria-label={label}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200
        ${voted
          ? 'border-green-600 text-green-600 bg-green-50 font-semibold'
          : 'border-[#5e516a] text-[#a99e8f] bg-transparent'
        }`}
    >
      <divicon className={`text-lg ${voted ? 'text-green-600' : 'text-[#a99e8f]'}`} />
      <span className={`text-sm ${voted ? 'text-green-600' : 'text-[#a99e8f]'}`}>
        {count}
      </span>
    </button>
  );
}

export default VoteButton