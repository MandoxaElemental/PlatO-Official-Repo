'use client';
import { checkToken, getAllBlogs, getToken, getUserInfoByUsername } from '@/app/Utils/DataServices';
import { IBlogItems, IUserData } from '@/app/Utils/Interfaces';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const SavedRecipes = () => {
  const [username, setUsername] = useState<string>('');
  const [savedBlogItems, setSavedBlogItems] = useState<IBlogItems[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  

  useEffect(() => {
    const storedUsername = localStorage.getItem('Username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    const fetchSavedData = async () => {
      if (!checkToken()) {
        alert('You must be logged in to view saved recipes.');
        return;
      }

      try {
        const user: IUserData = await getUserInfoByUsername(username);
        const allBlogs: IBlogItems[] = await getAllBlogs(getToken());

        const savedIdsSet = new Set(user.savedRecipes.map(id => String(id)));
        const savedItems = allBlogs.filter(blog => savedIdsSet.has(String(blog.id)));

        setSavedBlogItems(savedItems);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching saved recipes:', error);
      }
    };

    if (username) {
      fetchSavedData();
    }
  }, [username]);

     if (loading) {
         return (
               <div className="flex justify-center mt-15 rounded-full border-4 opacity-50 border-blue-100 h-[60px] w-[60px]">
               <DotLottieReact className="w-[50px] h-auto dark:invert"
               src="https://lottie.host/1362f106-3038-4bd3-960c-d2c553e0c317/LALyol5iRY.lottie"
               loop
               autoplay
               />
               </div>
         );
     }

  return (
    <div className="pt-10 px-5 w-full">
      <div className="border-b-1 border-solid border-slate-300 p-2 text-2xl font-semibold text-center">
        Saved Recipes
      </div>
      <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-2">
        {savedBlogItems.length > 0 ? (
          savedBlogItems.map((item) => (
            <Link key={item.id} href={`/Blog/${item.id}`}>
              <div className='border-2 border-blue-100 shadow-blue-200/50 rounded-md shadow-sm w-[250px]'>
                <Image className='object-cover h-[250px] w-[250px] rounded-t-md aspect-square' src={item.image === null ? "/assets/Placeholder.png" : `${item.image}`} alt="post" width={50} height={50}/>
              <div className="min-w-screentext-xl p-5 pt-2 max-w-[300px]">
                <p className='font-semibold '>
                {item.recipeName}
                </p>
                <div className='flex'><p className="font-semibold">By: </p>{item.publisherName}</div>
              {item.tags.map((tag, i) => (
                <Link className='mt-2' key={i} href={`/Discover/${tag}`}>
                  <span className="px-3 py-1 bg-blue-200 text-blue-900 rounded-full text-sm cursor-pointer hover:bg-blue-400">{tag}</span>
                 </Link>
              ))}
              </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center w-full text-gray-500">No saved recipes yet.</p>
        )}
      </div>
    </div>
  );
};

export default SavedRecipes;
