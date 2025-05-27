import Image from "next/image";
import { useState } from "react";
import { IBlogItems, IUserData } from "../Utils/Interfaces";
import { getToken, updateBlogItem, updateUserItem } from "../Utils/DataServices";

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
    const updatedUser: IUserData = {
      ...user,
      ratedBlogs: [...user.ratedBlogs, blog.id]
    };

    const updatedBlog: IBlogItems = {
      ...blog,
      rating: blog.rating + rating,
      numberOfRatings: blog.numberOfRatings + 1,
      averageRating: (blog.rating + rating) / (blog.numberOfRatings + 1)
    };

    try {
      const blogSuccess = await updateBlogItem(updatedBlog, token);
      const userSuccess = await updateUserItem(updatedUser, token);

      if (blogSuccess && userSuccess) {
        setBlog(updatedBlog);
        setUser(updatedUser);
        onRate(rating);
        setRated(true);
      } else {
        console.error("Failed to update blog or user.");
      }
    } catch (err) {
      console.error("Error during rating update:", err);
    }
  };

  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center justify-center">
      {stars.map((star) => (
        <Image
          key={star}
          className={`h-8 w-8 px-1 cursor-pointer dark:invert transition-transform duration-100 ${rated ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
          src={star <= (hovered || currentRating) ? "/star-fill.svg" : "/star.svg"}
          alt={`star-${star}`}
          width={500}
          height={500}
          onMouseEnter={() => !rated && setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => handleRating(star)}
        />
      ))}
    </div>
  );
};

export default StarRating;
