'use client'
import React, { useEffect, useState } from 'react'
import { TabItem, Tabs } from "flowbite-react";
import Image from 'next/image';
import { checkToken, getBlogItemsByUserId, getToken } from '@/app/Utils/DataServices';
import { IBlogItems } from '@/app/Utils/Interfaces';

const Account = () => {
    const [username, setUsername] = useState('');
    const [id, setId] = useState(0);
    const [blogItems, setBlogItems] = useState<IBlogItems[]>([])
  
    useEffect(() => {
      
      const userPosts = async () => {
      const storedUsername = localStorage.getItem("Username");
      const storedId = localStorage.getItem("UserID");
      if (storedUsername) setUsername(storedUsername);
      if (storedId) setId(Number(storedId));
      console.log(storedId)
      console.log(storedUsername)
      const userBlogItems = await getBlogItemsByUserId(id, getToken())
      setBlogItems(userBlogItems)
      console.log(userBlogItems)
      }
      if(!checkToken()){
        alert('error')
      } else {
        userPosts()
      }
    }, []);

  return (
    <div className='pt-10 px-5 w-min-full'>
      <div className='flex flex-grid gap-5 border-b-1 border-solid border-slate-300 pb-2'>
      <div className='border-solid border-4 border-black rounded-full bg-slate-500 w-30 h-30 flex justify-center items-center'><Image className='h-20 w-20' src="../assets/person.svg" alt="profilePic" width={100} height={100}/></div>
      <div className='p-5'>
        <h1 className='text-3xl font-bold'>{username}</h1>
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
    <div>
    <Tabs className='flex justify-between' aria-label="Tabs with underline" variant="underline">
      <TabItem active title="All">
        <div className='grid grid-cols-3 gap-2'>
          {blogItems.map((item, ibx) => {
            return(
              <div key={ibx} className=''>
                <Image className='object-cover h-[200px] w-[200px]' src={item.image === null ? "/assets/Placeholder.png" : `${item.image}`} alt="post" width={50} height={20}/>
              </div>
              
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
    </div>
  )
}

export default Account