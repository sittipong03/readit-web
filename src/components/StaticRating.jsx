<<<<<<< HEAD
const StaticRating = ({ rating = 0, showNumber = true, size = "18px" }) => {
=======
const StaticRating = ({ rating = 0 }) => {
>>>>>>> ebd5ba9 (registerbooktag)
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      // ดาวเต็มดวง
      stars.push(
        <i key={i} className="fa-solid fa-star text-warning-main"></i>,
      );
    } else if (i - 0.5 <= rating) {
      // ดาวครึ่งดวง
      stars.push(
        <i
          key={i}
          className="fa-solid fa-star-half-stroke text-warning-main"
        ></i>,
      );
    } else {
      // ดาวโปร่ง
      stars.push(
        <i key={i} className="fa-regular fa-star text-text-disabled"></i>,
      );
    }
  }

  return (
<<<<<<< HEAD
    <div className="flex items-center gap-1" style={{ fontSize: size }}>
      {stars}
      {showNumber && (
        <span className="subtitle-1 ml-2">{rating.toFixed(2)}</span>
      )}
=======
    <div className="flex items-center gap-1 text-[18px]">
      {stars}
      <span className="ml-2 subtitle-1">{rating.toFixed(2)}</span>
>>>>>>> ebd5ba9 (registerbooktag)
    </div>
  );
};

export default StaticRating;
