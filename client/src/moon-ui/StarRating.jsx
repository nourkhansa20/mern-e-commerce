import React, { useState } from 'react';

const StarRating = ({ maxRating = 5, onRatingChange, starClassName = 'size-6 mx-[1.5px]', defaultRating = 0 , enable = false}) => {
  const [rating, setRating] = useState(defaultRating);

  const handleRating = (newRating) => {
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <div className="flex">
      {[...Array(maxRating)].map((_, i) => (
        <svg
          key={i}
          className={`${starClassName} cursor-pointer ${i < rating ? 'text-orange-500' : 'text-gray-300'
            }`}
          fill="currentColor"
          viewBox="0 0 24 24"
          onClick={() => {
            if (enable) handleRating(i + 1)
          }}
        >
          <path d="M12 .587l3.668 7.568L24 9.423l-6 6.115 1.409 8.476L12 18.896l-7.409 5.118L6 15.538l-6-6.115 8.332-1.268z" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
