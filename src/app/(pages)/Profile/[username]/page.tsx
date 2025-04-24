'use client'

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { checkToken, getBlogItemsByUserId, getUserInfoByUsername, getToken } from '@/app/Utils/DataServices';
import { IBlogItems } from '@/app/Utils/Interfaces';
import { Button, TabItem, Tabs } from 'flowbite-react';
import Link from 'next/link';

const ProfilePage = () => {
  const { username } = useParams();
  const [blogItems, setBlogItems] = useState<IBlogItems[]>([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!checkToken()) {
        alert('You must be logged in to view profiles');
        return;
      }

      if (typeof username !== 'string') return;

      try {
        const user = await getUserInfoByUsername(username);
        const userBlogItems = await getBlogItemsByUserId(user.id, getToken());
        setBlogItems(userBlogItems);
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      }
    };

    fetchProfileData();
  }, [username]);

  return (
    <div className='pt-10 px-5 w-min-full'>
      <div className='flex flex-grid gap-5 border-b-1 border-solid border-slate-300 pb-2'>
        <div className='border-solid border-4 border-black rounded-full bg-slate-500 w-30 h-30 flex justify-center items-center'>
          <Image className='h-20 w-20' src="/assets/person.svg" alt="profilePic" width={100} height={100} />
        </div>
        <div className='p-5'>
            <div className='flex gap-4'>
                  <h1 className='text-3xl font-bold'>{username}</h1> {username === localStorage.getItem("Username") ? '' : <Button className="rounded-full h-8 bg-blue-200 hover:bg-blue-400 text-black cursor-pointer dark:bg-blue-100 dark:hover:bg-blue-200">Follow</Button>
                  }
            </div>
          <div className='flex text-center flex-grid gap-3'>
            <div>
              <p className='font-semibold'>Following</p>
              <p>000</p>
            </div>
            <div>
              <p className='font-semibold'>Followers</p>
              <p>000</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs className='flex justify-between' aria-label="Tabs with underline" variant="underline">
      <TabItem active title="All">
        <div className='grid grid-cols-3 gap-2'>
          {blogItems.map((item, ibx) => {
            return(
              <Link href={`/Blog/${item.id}`}>
              <div key={ibx} className=''>
                <Image className='object-cover h-[200px] w-[200px]' src={item.image === null ? "/assets/Placeholder.png" : `${item.image}`} alt="post" width={50} height={20}/>
              </div>
              </Link>
            )
          }
          )}
        </div>
      </TabItem>
      <TabItem title="Photos">
        2
      </TabItem>
      <TabItem title="Videos">
        3
      </TabItem>
      <TabItem title="Recipes">
        4
      </TabItem>
    </Tabs>
    </div>
  );
};

export default ProfilePage;
