'use client';
import { checkToken, getAllBlogs, getToken, getUserInfoByUsername } from '@/app/Utils/DataServices';
import { IBlogItems, IUserData } from '@/app/Utils/Interfaces';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const SavedRecipes = () => {
  const [username, setUsername] = useState<string>('');
  const [savedBlogItems, setSavedBlogItems] = useState<IBlogItems[]>([]);

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

        const savedIdsSet = new Set(user.savedRecipes);
        const savedItems = allBlogs.filter(blog => savedIdsSet.has(String(blog.id)));

        setSavedBlogItems(savedItems);
      } catch (error) {
        console.error('Error fetching saved recipes:', error);
      }
    };

    if (username) {
      fetchSavedData();
    }
  }, [username]);

  return (
    <div className="pt-10 px-5 w-full">
      <div className="border-b-1 border-solid border-slate-300 p-2 text-2xl font-semibold text-center">
        Saved Recipes
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
        {savedBlogItems.length > 0 ? (
          savedBlogItems.map((item, index) => (
            <Link key={index} href={`/Blog/${item.id}`}>
                <Image className='object-cover h-[200px] w-[200px]' src={item.image === null ? "/assets/Placeholder.png" : `${item.image}`} alt="post" width={50} height={20}/>
              <div className="text-xl font-semibold pt-2">{item.recipeName}</div>
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
