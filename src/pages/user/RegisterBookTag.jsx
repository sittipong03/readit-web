import React, { useState, useEffect } from "react";
import useUserStore from "../../stores/userStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterBookTag() {
    const navigate = useNavigate();
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(null); // null | true | false

    const token = useUserStore.getState().token;

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const res = await axios.get("http://localhost:6500/api/book/tags", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTags(res.data);
            } catch (error) {
                console.error("Failed to fetch tags:", error);
            }
        };

        fetchTags();
    }, [token]);

    const toggleTag = (tagId) => {
        setSelectedTags((prevSelected) =>
            prevSelected.includes(tagId)
                ? prevSelected.filter((id) => id !== tagId)
                : [...prevSelected, tagId]
        );
    };

    const handleSubmit = async () => {
        if (selectedTags.length === 0) return;

        setIsSubmitting(true);
        setSubmitSuccess(null);

        try {
            const res = await axios.post(
                "http://localhost:6500/api/book/submit-tags",
                {
                    tagIds: selectedTags,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSubmitSuccess(true);
            console.log("Tags submitted:", res.data);
            navigate("/userproflie");
        } catch (error) {
            console.error("Failed to submit tags:", error);
            setSubmitSuccess(false);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="text-center text-white-secondary">Add Fav Tag</div>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => {
                    const isSelected = selectedTags.includes(tag.id);
                    return (
                        <button
                            key={tag.id}
                            onClick={() => toggleTag(tag.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 focus:outline-none
                ${isSelected
                                    ? "bg-action-active text-white hover:bg-primary-hover"
                                    : "bg-action-selected text-gray-800 hover:bg-primary-hover"
                                }
              `}
                        >
                            {tag.name}
                        </button>
                    );
                })}
            </div>

            <button
                onClick={handleSubmit}
                disabled={isSubmitting || selectedTags.length === 0}
                className={`mt-4 px-6 py-2 rounded-md text-white transition-colors
          ${isSubmitting || selectedTags.length === 0
                        ? "bg-primary-main cursor-not-allowed"
                        : "bg-primary-main hover:bg-blue-700"
                    }`}
            >
                {isSubmitting ? "Submitting..." : "Submit Tags"}
            </button>

            {submitSuccess === true && (
                <p className="text-green-600">Tags submitted successfully!</p>
            )}
            {submitSuccess === false && (
                <p className="text-red-600">Failed to submit tags. Try again.</p>
            )}
        </div>
    );
}

export default RegisterBookTag;
