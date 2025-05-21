import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IBlogItems, IUserData } from '../Utils/Interfaces';
import { getToken, updateBlogItem, updateUserItem } from '../Utils/DataServices';

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

    const updatedLikes = liked ? likes - 1 : likes + 1;
    const updatedBlog: IBlogItems = { ...blog, numberOfLikes: updatedLikes };

    try {
      await updateBlogItem(updatedBlog, getToken());
      setLikes(updatedLikes);
      setLiked(!liked);
    } catch (error) {
      console.error('Error updating blog like count:', error);
    }

    const updatedUser: IUserData = {
      ...currentUser,
      likedBlogs: liked
        ? currentUser.likedBlogs.filter(id => id !== blog.id)
        : [...currentUser.likedBlogs, blog.id],
    };

    try {
      await updateUserItem(updatedUser, getToken());
      if (onUserUpdate) {
        onUserUpdate(updatedUser);
      }
    } catch (error) {
      console.error('Error updating user likedBlogs:', error);
    }
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
