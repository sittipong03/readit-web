import { useEffect, useState } from "react";
import TagButton from "../../components/ui/TagButton";
import axios from "axios";
import useUserStore from "../../stores/userStore"; 

function BooksTagPage() {
    const [selectedTags, setSelectedTags] = useState([]);
    const [tags, setTags] = useState([]);

    // Fetch tags from API
    useEffect(() => {
        const fetchTags = async () => {
            try {
                const res = await axios.get("http://localhost:6500/api/book/tags");
                setTags(res.data);
            } catch (error) {
                console.error("Failed to fetch tags:", error);
            }
        };

        fetchTags();
    }, []);

    const handleTagClick = (tagId) => {
        setSelectedTags((prevSelected) =>
            prevSelected.includes(tagId)
                ? prevSelected.filter((id) => id !== tagId)
                : [...prevSelected, tagId]
        );
    };

    const handleSubmit = async () => {
        try {
            const token = useUserStore.getState().token;

            const res = await axios.post(
                "http://localhost:6500/api/user/booktag-preference",
                { tagIds: selectedTags },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Preferences saved:", res.data);
            // Optional: Navigate to home or show success message
            // navigate('/home');

        } catch (error) {
            console.error("Failed to save preferences:", error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Browse Books by Tag</h2>

            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <TagButton
                        key={tag.id}
                        tag={tag}
                        isSelected={selectedTags.includes(tag.id)}
                        onClick={() => handleTagClick(tag.id)}
                    />
                ))}
            </div>

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
