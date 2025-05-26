'use client';
import { checkToken, getAllBlogs, getToken, getUserInfoByUsername } from '@/app/Utils/DataServices';
import { IBlogItems, IUserData } from '@/app/Utils/Interfaces';
import { Spinner } from 'flowbite-react';
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
              <div className="flex justify-center mt-15">
                  <Spinner aria-label="Loading post..." size="xl" />
              </div>
          );
      }

  return (
    <div className="pt-10 px-5 w-full">
      <div className="border-b-1 border-solid border-slate-300 p-2 text-2xl font-semibold text-center">
        Saved Recipes
      </div>
      <div className="py-4 grid grid-cols-2 gap-2">
        {savedBlogItems.length > 0 ? (
          savedBlogItems.map((item) => (
            <Link key={item.id} href={`/Blog/${item.id}`}>
              <div className='border-2 border-blue-100 rounded-md w-[250px]'>
                <Image className='object-cover h-[250px] w-[250px] rounded-t-md aspect-square' src={item.image === null ? "/assets/Placeholder.png" : `${item.image}`} alt="post" width={50} height={50}/>
              <div className="min-w-screentext-xl p-5 pt-2 max-w-[300px]">
                <p className='font-semibold '>
                {item.recipeName}
                </p>
                <div className='flex'><p className="font-semibold">By: </p>{item.publisherName}</div>
                {item.description}
              </div>
                <Image className='dark:invert' src="/assets/caret-right-fill.svg" alt="go" width={25} height={25}/>
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
