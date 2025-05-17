'use client'

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { checkToken, getBlogItemsByUserId, getUserInfoByUsername, getToken, updateUserItem } from '@/app/Utils/DataServices';
import { IBlogItems, IUserData } from '@/app/Utils/Interfaces';
import { Button, TabItem, Tabs } from 'flowbite-react';
import Link from 'next/link';

const ProfilePage = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [blogItems, setBlogItems] = useState<IBlogItems[]>([]);
  const [followers, setFollowers] = useState(0)
  const [following, setFollowing] = useState(0)
  const [profilePic, setProfilePic] = useState<string>('/assets/person-circle.svg');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!checkToken()) {
        alert('You must be logged in to view profiles');
        return;
      }
      if (typeof username !== 'string') return;

      try {
        const user = await getUserInfoByUsername(username);
        setUserData(user);
        setProfilePic(user.profilePicture || '/assets/person-circle.svg');
        setFollowers(user.followers.length)
        setFollowing(user.following.length)
        const userBlogItems = await getBlogItemsByUserId(user.id, getToken());
        setBlogItems(userBlogItems);
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      }
    };

    fetchProfileData();
  }, [username]);

  const handleImageClick = () => {
    if (username === localStorage.getItem("Username")) {
      fileInputRef.current?.click();
    }
  };
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userData) return;
  
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result?.toString();
      if (!base64String) return;
  
      const updatedUser = { ...userData, profilePicture: base64String };
      const token = getToken();
      const success = await updateUserItem(updatedUser, token);
      if (success) {
        setProfilePic(base64String);
        setUserData(updatedUser);
      }
    };
  
    reader.readAsDataURL(file);
  };
  

  return (
    <div className='pt-10 px-5 w-min-full'>
      <div className='flex flex-grid gap-5 border-b-1 border-solid border-slate-300 pb-2'>
      <div className='relative rounded-full bg-blue-200 w-30 h-30 flex justify-center items-center cursor-pointer' onClick={handleImageClick}>
  <Image
    className='h-30 w-30 rounded-full object-cover'
    src={profilePic}
    alt="profilePic"
    width={100}
    height={100}
  />
  <input
    type="file"
    accept="image/*"
    ref={fileInputRef}
    style={{ display: 'none' }}
    onChange={handleFileChange}
  />
  {username === localStorage.getItem("Username")}
</div>

        <div className='p-5'>
            <div className='flex gap-4'>
                  <h1 className='text-3xl font-bold'>{username}</h1> {username === localStorage.getItem("Username") ? '' : <Button className="rounded-full h-8 bg-blue-200 hover:bg-blue-400 text-black cursor-pointer dark:bg-blue-100 dark:hover:bg-blue-200">Follow</Button>
                  }
            </div>
          <div className='flex text-center flex-grid gap-3'>
            <div>
              <p className='font-semibold'>Following</p>
              <p>{followers}</p>
            </div>
            <div>
              <p className='font-semibold'>Followers</p>
              <p>{following}</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs className='flex justify-between' aria-label="Tabs with underline" variant="underline">
      <TabItem active title="All">
        <div className='grid grid-cols-3 gap-2'>
          {blogItems.map((item, ibx) => {
            return(
              <div key={ibx} className=''>
                {
                  item.isPublished && !item.isDeleted && (
                    <Link href={`/Blog/${item.id}`}>
                    <Image className='object-cover h-[200px] w-[200px]' src={item.image === null ? "/assets/Placeholder.png" : `${item.image}`} alt="post" width={50} height={20}/>
                    </Link>
                  )
                }
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
  );
};

export default ProfilePage;
