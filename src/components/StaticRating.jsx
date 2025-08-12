import { Star, StarHalf, StarHalfIcon } from "lucide-react";

const StaticRating = ({ rating = 0, showNumber = true, size = 18 }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      // ดาวเต็มดวง
      stars.push(
        <Star
          key={i}
          className="fill-warning-main text-warning-main scale-110"
          size={size}
          strokeWidth={1}
        />,
      );
    } else if (i - 0.5 <= rating) {
      // ดาวครึ่งดวง
      stars.push(
        <div key={i} className="relative">
          <StarHalf
            className="fill-warning-main text-text-disabled scale-110"
            size={size}
            strokeWidth={1}
          />
          <Star
            className="text-text-disabled absolute top-0 scale-110 fill-transparent"
            size={size}
            strokeWidth={1}
          />
        </div>,
      );
    } else {
      // ดาวโปร่ง
      stars.push(
        <Star
          key={i}
          className="fill-action-disabled/60 text-text-disabled"
          size={size}
          strokeWidth={1}
        />,
      );
    }
  }

  return (
    <div className="flex items-center gap-1" style={{ fontSize: size }}>
      {stars}
      {showNumber && (
        <span className="subtitle-1 ml-2">{rating.toFixed(2)}</span>
      )}
    </div>
  );
};

export default StaticRating;
