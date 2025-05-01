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
      <div className='border-b-1 border-solid border-slate-300 p-2 text-2xl font-semibold text-center'>
            Drafts
        </div>
        <div>{blogItems.map((item, ibx) => {
          return(
            <div key={ibx} className=''>
              { !item.isPublished && (
                  <Link href={`/Edit/${item.id}`}>
                  <Image className='object-cover h-[200px] w-[200px]' src={item.image === null ? "/assets/Placeholder.png" : `${item.image}`} alt="post" width={50} height={20}/>
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