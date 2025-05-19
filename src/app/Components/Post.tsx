import { Button } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { IBlogItems, IUserData } from '../Utils/Interfaces';
import { getToken, updateBlogItem, getUserInfoByUsername, updateUserItem, getUserInfoById } from '../Utils/DataServices';

const Post = ({ blog }: { blog: IBlogItems }) => {
  const [likes, setLikes] = useState(blog.numberOfLikes);
  const [liked, setLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUserData | null>(null);
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const userIdNum = Number(blog.userId);
  const [isSaved, setIsSaved] = useState(false);
  
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getUserInfoById(String(blog.userId));
        setProfilePic(data?.profilePicture || "/assets/person-circle.svg");
      } catch (error) {
        console.error("Failed to load profile picture", error);
        setProfilePic("/assets/person-circle.svg");
      }
    };
  
    getData();
  }, [blog.userId]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("Username");
    if (storedUsername) setUsername(storedUsername);
  }, []);


  useEffect(() => {
    if (currentUser && blog?.id) {
      setIsSaved(currentUser.savedRecipes?.includes(String(blog.id)));
      setIsFollowing(currentUser.following?.includes(String(blog.userId)));

    }
  }, [currentUser, blog?.id]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!username) return;
  
      try {
        const user = await getUserInfoByUsername(username);
        if (user) {
          setCurrentUser(user);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };
  
    fetchUser();
  }, [username]);

  const handleFollow = async () => {
    if (!currentUser) return;
  
    const updatedFollowing = isFollowing
      ? currentUser.following.filter((friendId) => friendId !== String(userIdNum))
      : [...new Set([...(currentUser.following || []), String(userIdNum)])];
  
    const updatedUser: IUserData = {
      ...currentUser,
      following: updatedFollowing,
      salt: currentUser.salt || '',
      hash: currentUser.hash || '',
    };

    console.log(currentUser.salt)
    console.log(currentUser.hash)
  
    try {
      const success = await updateUserItem(updatedUser, getToken());
      if (success) {
        setCurrentUser(updatedUser);
        setIsFollowing(updatedUser.following.includes(String(blog.userId)));
        alert(isFollowing ? "Unfollowed" : "Following");
      }
    } catch (error) {
      console.error('Error updating follow status:', error);
    }
  };

  const handleLike = async () => {
    const updatedLikes = liked ? likes - 1 : likes + 1;
    const updatedBlog: IBlogItems = { ...blog, numberOfLikes: updatedLikes };
  
    try {
      await updateBlogItem(updatedBlog, getToken());
      setLikes(updatedLikes);
      setLiked(!liked);
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };


const handleSave = async () => {
  if (!currentUser) return;

  const postId = String(blog.id);
  const isAlreadySaved = currentUser.savedRecipes?.includes(postId);

  const updatedSavedRecipes = isAlreadySaved
    ? currentUser.savedRecipes.filter((id) => id !== postId)
    : [...new Set([...(currentUser.savedRecipes || []), postId])];

  const updatedUser: IUserData = {
    ...currentUser,
    savedRecipes: updatedSavedRecipes,
    salt: currentUser.salt || '',
    hash: currentUser.hash || '',
  };

  try {
    const success = await updateUserItem(updatedUser, getToken());
    if (success) {
      setCurrentUser(updatedUser);
      alert(isAlreadySaved ? "Removed from saved recipes" : "Saved to recipes");
    }
  } catch (error) {
    console.error("Error saving post:", error);
  }
};
  
  

  return (
    <div className="text-center max-w-[500px] mb-5 border-1 border-solid border-blue-100 shadow-blue-200/50 rounded-md shadow-sm">
      <div className="flex justify-between items-center py-2 px-5">
        <div className="flex items-center">
        <div className="rounded-full bg-blue-200 w-10 h-10 overflow-hidden relative">
            <Image
              src={`${profilePic}`}
              alt="profilePic"
              fill
              className="object-cover"
            />
          </div>
          <Link href={`/Profile/${blog.publisherName}`} className="pl-3 cursor-pointer font-semibold">
            {blog.publisherName}
          </Link>
        </div>

        {blog.publisherName === localStorage.getItem("Username") ? '' : <Button
          className={`rounded-md ${isFollowing ? "bg-red-200 hover:bg-red-400" : "bg-blue-200 hover:bg-blue-400"} text-black cursor-pointer dark:bg-blue-100 dark:hover:bg-blue-200`}
          onClick={handleFollow}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
                          }
      </div>

      {blog.postType !== "recipe" ? (
        <Link href={`/Blog/${blog.id}`}>
          <Image
            src={String(blog.image)}
            alt="post"
            className="aspect-square object-cover object-center"
            width={500}
            height={500}
            sizes="(max-width: 1080px) 100vw, 1080px"
          />
        </Link>
      ) : (
        <div>
          <div className="font-semibold text-2xl pb-2">- Recipe -</div>
          <Image
            className="object-cover h-[200px] w-full"
            src={blog.image !== "" ? String(blog.image) : "/assets/Placeholder.png"}
            alt="post"
            width={50}
            height={20}
          />
          <p className="font-semibold text-2xl p-2">{blog.recipeName}</p>
          <div className="p-2 text-left">{blog.description}</div>
          <Link className="text-blue-600 text-xl underline pb-2" href={`/Blog/${blog.id}`}>
            Read Full Recipe
          </Link>
        </div>
      )}

<div className='flex justify-evenly p-2 pt-5 text-xs font-blue-400'>
          <div className="flex items-center cursor-pointer" onClick={handleLike}>
            <Image
              width={20}
              height={20}
              className="h-5 w-5 dark:invert"
              src={liked ? "/assets/heart-fill.svg" : "/assets/heart.svg"}
              alt="like"
            />
            <p className="pl-2">{liked ? 'Liked' : 'Like'} ({likes})</p>
          </div>
          <div className="flex items-center">
            <Image width={20} height={20} className="h-5 w-5 dark:invert" src="/assets/chat-left.svg" alt="comment" />
            <p className="pl-2">Comment</p>
          </div>
          <div className="flex items-center">
            <Image width={20} height={20} className="h-5 w-5 dark:invert" src="/assets/repeat.svg" alt="share" />
            <p className="pl-2">Share</p>
          </div>
          <div className="flex items-center cursor-pointer" onClick={handleSave}>
            <Image
              width={20}
              height={20}
              className="h-5 w-5 dark:invert"
              src={isSaved ? "/assets/bookmark-fill.svg" : "/assets/bookmark.svg"}
              alt="save"
            />
            <p className="pl-2">{isSaved ? "Saved" : "Save"}</p>
          </div>
        </div>
    </div>
  );
};

export default Post;
