import Image from "next/image";
import { useState } from "react";
import { StarRatingProps } from "../Utils/Interfaces";

const StarRating = ({ currentRating, onRate }: StarRatingProps) => {
  const [hovered, setHovered] = useState(0);
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center justify-center">
      {stars.map((star) => (
        <Image
          key={star}
          className="h-8 w-8 px-1 cursor-pointer dark:invert"
          src={star <= (hovered || currentRating) ? "/assets/star.svg" : "/assets/star-outline.svg"}
          alt={`star-${star}`}
          width={500}
          height={500}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onRate(star)}
        />
      ))}
    </div>
  );
};

export default StarRating;
