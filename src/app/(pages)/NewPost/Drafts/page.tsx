'use client'

import { checkToken, getBlogItemsByUserId, getToken } from '@/app/Utils/DataServices';
import { IBlogItems } from '@/app/Utils/Interfaces';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Drafts = () => {
      const [id, setId] = useState<number>(0);
      const [username, setUsername] = useState<string>("");
      const [blogItems, setBlogItems] = useState<IBlogItems[]>([]);

      useEffect(() => {
            const storedUsername = localStorage.getItem("Username");
            const storedId = localStorage.getItem("UserID");
          
            if (storedUsername) setUsername(storedUsername);
            if (storedId) setId(Number(storedId));
          }, []);
    
      useEffect(() => {
        const fetchProfileData = async () => {
          if (!checkToken()) {
            alert('You must be logged in to view profiles');
            return;
          }
    
          if (typeof username !== 'string') return;
    
          try {
            const userBlogItems = await getBlogItemsByUserId(id, getToken());
            setBlogItems(userBlogItems);
            console.log(userBlogItems)
          } catch (error) {
            console.error("Failed to fetch profile data", error);
          }
        };
    
        fetchProfileData();
      }, [username]);

  return (
    <div className='pt-10 px-5 w-full'>
      <div className='border-b-1 border-solid border-blue-200 p-2 text-2xl font-semibold text-center'>
            Drafts
        </div>
        <div>{blogItems.map((item, ibx) => {
          return(
            <div key={ibx} className=''>
              { !item.isPublished && (
                  <Link href={`/Edit/${item.id}`}>
                  <div className='flex justify-around'>
                    {/* <Image className='object-cover h-[150px] w-[150px]' src={item.image === null ? `${Placeholder}` : `${item.image}`} alt="post" width={50} height={50}/> */}
                  <div className="min-w-screentext-xl p-5 w-[300px]">
                    <p className='font-semibold '>
                    {item.recipeName}
                    </p>
                    {item.description}
                  </div>
                    <Image className='dark:invert' src="/assets/caret-right-fill.svg" alt="go" width={25} height={25}/>
                  </div>
                </Link>
                )
              }
            </div>
          )
        }
        )}</div>
    </div>
    
  )
}

export default Drafts