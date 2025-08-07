import { useEffect, useState } from "react";
import axios from "axios";

function TagBook({ onTagClick, selectedTags }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:6500/api/book/tags")
      .then((res) => setTags(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag.id);

        return (
          <button
            key={tag.id}
            onClick={() => onTagClick(tag.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 focus:outline-none
              ${
                isSelected
                  ? 'bg-action-active text-white hover:bg-primary-hover'
                  : 'bg-action-selected text-gray-800 hover:bg-primary-hover'
              }
            `}
          >
            {tag.name}
          </button>
        );
      })}
    </div>
  );
}

export default TagBook;
