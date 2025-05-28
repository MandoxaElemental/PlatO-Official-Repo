import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IBlogItems, IUserData } from '../Utils/Interfaces';
import { getToken, likeBlog } from '../Utils/DataServices';

interface LikeButtonProps {
  blog: IBlogItems;
  currentUser: IUserData | null;
  onUserUpdate?: (updatedUser: IUserData) => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ blog, currentUser, onUserUpdate }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(blog.numberOfLikes);

  useEffect(() => {
    if (!currentUser) return;
    setLiked(currentUser.likedBlogs.includes(blog.id));
  }, [currentUser, blog.id]);

  const handleLikeToggle = async () => {
    if (!currentUser) return;

    const token = getToken();
    const success = await likeBlog(currentUser.id, blog.id, token);

    if (!success) return;

    const updatedLikes = liked ? likes - 1 : likes + 1;
    setLikes(updatedLikes);
    setLiked(!liked);

    const updatedUser: IUserData = {
      ...currentUser,
      likedBlogs: liked
        ? currentUser.likedBlogs.filter(id => id !== blog.id)
        : [...currentUser.likedBlogs, blog.id],
    };

    onUserUpdate?.(updatedUser);
  };

  return (
    <div className="flex items-center cursor-pointer" onClick={handleLikeToggle}>
      <Image
        width={20}
        height={20}
        className="h-5 w-5 dark:invert"
        src={liked ? '/assets/heart-fill.svg' : '/assets/heart.svg'}
        alt="like"
      />
      <p className="pl-2">{liked ? 'Liked' : 'Like'}</p>
    </div>
  );
};

export default LikeButton;
