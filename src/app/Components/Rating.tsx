import Image from "next/image";
import { useEffect, useState } from "react";
import { IBlogItems, IUserData } from "../Utils/Interfaces";
import { getToken, ratingBlog } from "../Utils/DataServices";

const StarRating = ({ currentRating, onRate, blog, setBlog, user, setUser }: {
  currentRating: number;
  onRate: (rating: number) => void;
  blog: IBlogItems;
  setBlog: (blog: IBlogItems) => void;
  user: IUserData;
  setUser: (user: IUserData) => void;
}) => {
  const [hovered, setHovered] = useState(0);
  const [rated, setRated] = useState(user.ratedBlogs.includes(blog.id));

  const handleRating = async (rating: number) => {
    if (rated) return;

    const token = getToken();
    const success = await ratingBlog(user.id, blog.id, rating, token);

    if (success) {
      const updatedUser: IUserData = {
        ...user,
        ratedBlogs: [...user.ratedBlogs, blog.id],
      };

      const totalRating = blog.averageRating * blog.numberOfRatings + rating;
      const newNumberOfRatings = blog.numberOfRatings + 1;
      const updatedBlog: IBlogItems = {
        ...blog,
        rating: totalRating / newNumberOfRatings,
        numberOfRatings: newNumberOfRatings,
        averageRating: totalRating / newNumberOfRatings,
      };

      setUser(updatedUser);
      setBlog(updatedBlog);
      onRate(rating);
      setRated(true);
    } else {
      console.error("Failed to rate blog.");
    }
  };

  useEffect(() => {
    setRated(user.ratedBlogs.includes(blog.id));
  }, [user, blog.id]);

  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center justify-center">
      {stars.map((star) => (
        <Image
          key={star}
          className={`h-8 w-8 px-1 cursor-pointer dark:invert transition-transform duration-100 ${rated ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
          src={star <= (hovered || currentRating) ? "/star-fill.svg" : "/star.svg"}
          alt={`star-${star}`}
          width={32}
          height={32}
          onMouseEnter={() => !rated && setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => handleRating(star)}
        />
      ))}
    </div>
  );
};

export default StarRating;
