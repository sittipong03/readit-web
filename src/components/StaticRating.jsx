const StaticRating = ({ rating }) => {
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
    <div className="flex items-center gap-1 text-[18px]">
      {stars}
      <span className="ml-2 subtitle-1">{rating.toFixed(2)}</span>
    </div>
  );
};

export default StaticRating;
