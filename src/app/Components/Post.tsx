import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { IBlogItems, IUserData } from '../Utils/Interfaces';
import { getUserInfoByUsername, getUserInfoById } from '../Utils/DataServices';
import FollowButton from './FollowButton';
import SaveButton from './SaveButton';
import LikeButton from './LikeButton';

const Post = ({ blog }: { blog: IBlogItems }) => {
  const [currentUser, setCurrentUser] = useState<IUserData | null>(null);
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [, setIsFollowing] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<"main" | "ingredients" | "steps">("main");
  const containerRef = useRef<HTMLDivElement>(null);
  
  
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getUserInfoById(String(blog.userId));
        setProfilePic(data.profilePicture || "/assets/person-circle.svg");
      } catch (error) {
        console.error("Failed to load profile picture", error);
        setProfilePic("/assets/person-circle.svg");
      }
    };
  
    getData();
  }, [profilePic]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("Username");
    if (storedUsername) setUsername(storedUsername);
  }, []);


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



useEffect(() => {
  const container = containerRef.current;
  if (!container) return;

  let touchStartX = 0;

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;

    if (Math.abs(deltaX) > 50) {
      const views = ["main", "ingredients", "steps"];
      const currentIndex = views.indexOf(currentView);
      const nextIndex = deltaX > 0 ? currentIndex - 1 : currentIndex + 1;
      if (nextIndex >= 0 && nextIndex < views.length) {
        setCurrentView(views[nextIndex] as typeof currentView);
      }
    }
  };

  container.addEventListener("touchstart", handleTouchStart);
  container.addEventListener("touchend", handleTouchEnd);

  return () => {
    container.removeEventListener("touchstart", handleTouchStart);
    container.removeEventListener("touchend", handleTouchEnd);
  };
}, [currentView]);

const handleFollowUpdate = (isNowFollowing: boolean) => {
  setIsFollowing(isNowFollowing);
};

  return (
    <div className="text-center max-w-[360px] md:max-w-[500px] mb-5 border-1 border-solid border-blue-100 shadow-blue-200/50 rounded-md shadow-sm">
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
          <Link href={`/Profile/${blog.publisherName}`} className="pl-3 cursor-pointer font-semibold text-blue-600">
            {blog.publisherName}
          </Link>
        </div>

        {blog.publisherName !== localStorage.getItem("Username") && (
          <FollowButton
            targetUserId={Number(blog.userId)}
            currentUser={currentUser}
            onUpdate={handleFollowUpdate}
          />
        )}
      </div>

{blog.postType === "image" ? (
  <Link href={`/Blog/${blog.id}`}>
    <Image
      src={String(blog.image)}
      alt="post"
      className="aspect-square object-cover object-center"
      width={500}
      height={500}
      sizes="(max-width: 1080px) 100vw, 1080px"
      loading="lazy"
    />
  </Link>
) : blog.postType === "video" ? (
  <div className="relative w-full h-auto">
    <video
      className="w-full h-auto max-h-[500px] object-cover"
      controls
      preload="metadata"
      poster={String(blog.image) || "/assets/Placeholder.png"}
    >
      <source src={String(blog.image)} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
) : (
  // Fallback for "recipe" or others (default to swipeable views)
  <div className="relative overflow-hidden max-w-[360px] md:max-w-[500px] h-[100%]" ref={containerRef}>
    <div
      className="flex transition-transform duration-500 ease-in-out"
      style={{
        width: '1500px',
        transform: `translateX(-${["main", "ingredients", "steps"].indexOf(currentView) * 500}px)`,
      }}
    >
      {/* Main View */}
      <div className="w-[500px] max-h-[360px] shrink-0">
        <Link href={`/Blog/${blog.id}`}>
          <Image
            className="object-cover h-[300px] w-full"
            src={blog.image !== "" ? String(blog.image) : "/assets/Placeholder.png"}
            alt="post"
            width={500}
            height={500}
            loading="lazy"
          />
        </Link>
        <p className="font-semibold text-2xl p-2">{blog.recipeName}</p>
        <div className="p-2 text-left">{blog.description}</div>
      </div>

      {/* Ingredients View */}
        <Link href={`/Blog/${blog.id}`}>
      <div className="w-[500px] max-h-[360px] shrink-0 px-10 overflow-y-auto">
        <h3 className="font-bold text-lg px-2 pt-5">Ingredients:</h3>
        {blog.ingredients.map((item, i) => (
          <div key={i}>
            <h1 className="font-bold">{item.title}</h1>
            <ul className="list-disc text-left pl-8">
              {item.ingredients.map((ingredient, j) => (
                <li key={j}>{ingredient}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
        </Link>

      {/* Steps View */}
        <Link href={`/Blog/${blog.id}`}>
      <div className="w-[500px] max-h-[360px] shrink-0 px-10 overflow-y-auto">
        <h3 className="font-bold text-lg px-2 pt-5">Steps:</h3>
        {blog.steps.map((item, i) => (
          <div key={i}>
            <h1 className="font-semibold">{item.title}</h1>
            <ol className="list-decimal text-left px-8">
              {item.steps.map((step, j) => (
                <li key={j}>{step}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
        </Link>
    </div>

    {/* Navigation Buttons */}
<div className="absolute inset-y-0 left-0">
  {currentView !== "main" && (
    <div
      onClick={() => {
        const views = ["main", "ingredients", "steps"];
        const currentIndex = views.indexOf(currentView);
        if (currentIndex > 0) setCurrentView(views[currentIndex - 1] as typeof currentView);
      }}
      className="bg-transparent h-full hover:opacity-50 hover:bg-black/10 p-2 rounded-r-xl flex flex-col justify-center cursor-pointer"
    >
      <div className="w-6 h-6 bg-[#FFFFFF80] dark:bg-[#00000080] rounded-full flex items-center justify-center">
        <Image width={20} height={20} className="w-6 h-6 dark:invert opacity-100" src="/assets/arrow-left-circle.svg" alt="left" />
      </div>
    </div>
  )}
</div>

<div className="absolute inset-y-0 right-0">
  {currentView !== "steps" && (
    <div
      onClick={() => {
        const views = ["main", "ingredients", "steps"];
        const currentIndex = views.indexOf(currentView);
        if (currentIndex < views.length - 1) setCurrentView(views[currentIndex + 1] as typeof currentView);
      }}
      className="bg-transparent h-full hover:opacity-50 hover:bg-black/10 p-2 rounded-l-xl flex flex-col justify-center cursor-pointer"
    >
      <div className="w-6 h-6 bg-[#FFFFFF80] dark:bg-[#00000080] rounded-full flex items-center justify-center">
        <Image width={20} height={20} className="w-6 h-6 dark:invert opacity-100" src="/assets/arrow-right-circle.svg" alt="left" />
      </div>
    </div>
  )}
</div>

  </div>
)}


<div className='flex justify-evenly p-2 pt-5 text-xs font-blue-400'>
          <LikeButton
            blog={blog}
            currentUser={currentUser}
            onUserUpdate={setCurrentUser}
          />
          <div className="flex items-center">
            <Image width={20} height={20} className="h-5 w-5 dark:invert" src="/assets/chat-left.svg" alt="comment" />
            <p className="pl-2">Comment</p>
          </div>
          <div className="flex items-center">
            <Image width={20} height={20} className="h-5 w-5 dark:invert" src="/assets/repeat.svg" alt="share" />
            <p className="pl-2">Share</p>
          </div>
          <SaveButton
              postId={blog.id}
              currentUser={currentUser}
              onUpdate={setCurrentUser}
            />
        </div>
    </div>
  );
};

export default Post;
