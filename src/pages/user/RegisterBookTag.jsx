import { useState } from "react";
import TagButton from "../../components/ui/TagButton";

function BooksTagPage() {
    const [selectedTags, setSelectedTags] = useState([]);

    const handleTagClick = (tagId) => {
        setSelectedTags((prevSelected) =>
            prevSelected.includes(tagId)
                ? prevSelected.filter((id) => id !== tagId)
                : [...prevSelected, tagId]
        );
    };

    const handleSubmit = () => {
        // Example: Log selected tags or send to API
        console.log("Submitting selected tags:", selectedTags);

        // Example API call
        // axios.post("/api/books/filter", { tags: selectedTags })
        //   .then(res => console.log(res.data))
        //   .catch(console.error);
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Browse Books by Tag</h2>
            <TagButton onTagClick={handleTagClick} selectedTags={selectedTags} />

            <div className="mt-4">
                <p>Selected Tag IDs: {JSON.stringify(selectedTags)}</p>
            </div>

            <button
                onClick={handleSubmit}
                disabled={selectedTags.length === 0}
                className={`mt-4 w-full py-2 rounded-md font-semibold text-white transition-colors duration-200
          ${selectedTags.length > 0
                        ? "bg-action-active hover:bg-primary-hover"
                        : "bg-action-selected cursor-not-allowed"
                    }
        `}
            >
                Submit
            </button>

        </div>
    );
}

export default BooksTagPage;
