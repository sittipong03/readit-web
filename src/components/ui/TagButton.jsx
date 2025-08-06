function TagButton({ tag, isSelected, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-full border 
                ${isSelected ? 'bg-primary-main text-white' : 'bg-white text-primary-main border-primary-main'}
            `}
        >
            {tag.name}
        </button>
    );
}

export default TagButton;
