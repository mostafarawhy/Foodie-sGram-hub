// StarRating.js
import { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRatings = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (starIndex) => {
    setHoverRating(starIndex);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (starIndex) => {
    setRating(starIndex);
  };

  return (
    <div className="flex flex-row">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <FaStar
            key={index}
            className={
              starValue <= (hoverRating || rating)
                ? "text-yellow-500"
                : "text-gray-400"
            }
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starValue)}
          />
        );
      })}
    </div>
  );
};

export default StarRatings;
