'use client';
import { Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { IUserData } from '@/app/Utils/Interfaces';

const randomNames = ['Alex', 'Taylor', 'Jordan', 'Casey', 'Riley', 'Jamie', 'Skyler', 'Peyton', 'Reese', 'Quinn'];
const randomUsernames = ['foodie123', 'cooknroll', 'saucyqueen', 'grillguru', 'mixmaster', 'chefbyte', 'yummydays'];
const profileImages = [
  '/assets/DummyData/image.png',
  '/assets/DummyData/image1.png',
  '/assets/DummyData/image2.png',
  '/assets/DummyData/image3.png',
  '/assets/DummyData/image4.png',
];

const getRandomElement = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const generateRandomUsers = (count: number): IUserData[] => {
  return Array.from({ length: count }, (_, idx) => ({
    id: 1000 + idx,
    name: getRandomElement(randomNames),
    salt: '',
    hash: '',
    username: getRandomElement(randomUsernames),
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    profilePicture: getRandomElement(profileImages),
    likedBlogs: [],
    ratedBlogs: [],
    dateCreated: new Date().toISOString(),
    incomingFriendRequest: [],
    outgoingFriendRequest: [],
    friends: [],
    premiumMember: Math.random() > 0.5,
    interests: [],
    savedRecipes: [],
    following: [],
    followers: [],
  }));
};

const Recommended = () => {
  const [users, setUsers] = useState<IUserData[]>([]);

  useEffect(() => {
    const dummyUsers = generateRandomUsers(3);
    setUsers(dummyUsers);
  }, []);

  return (
    <div className='border-t-1 border-solid border-slate-300 pb-5'>
      <p className='text-2xl font-semibold py-2'>Recommended Accounts</p>
      <div className='grid grid-cols-3 gap-3'>
        {users.map((user) => (
          <div
            key={user.id}
            className='border-1 border-slate-300 border-solid rounded-xl flex flex-col items-center'
          >
            <Image
              width={50}
              height={50}
              className='w-[120px] h-[120px] object-cover object-center rounded-full p-2'
              src={user.profilePicture}
              alt="profile"
            />
            <p className='font-semibold'>{user.name}</p>
            <p className='text-sm text-gray-500'>@{user.username}</p>
            <Button className="m-4 rounded-full h-8 bg-blue-200 hover:bg-blue-400 text-black cursor-pointer dark:bg-blue-100 dark:hover:bg-blue-200">
              Follow
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommended;


// import { Button } from 'flowbite-react'
// import React from 'react'
// import Image from 'next/image'

// const Recommended = () => {
//   return (
//     <div className='border-t-1 border-solid border-slate-300 pb-5'>
//         <p className='text-2xl font-semibold py-2'>
//         Recommended Accounts
//         </p>
//         <div className='grid grid-cols-3 gap-3'>
//         <div className='border-1 border-slate-300 border-solid rounded-xl flex flex-col items-center'>
//             <Image width={50} height={50} className='w-[120px] h-[120px] object-cover object-center rounded-full p-2' src="../assets/person.svg" alt="profile" />
//             <p className='font-semibold'>UserName</p>
//             <Button className="m-4 rounded-full h-8 bg-blue-200 hover:bg-blue-400 text-black cursor-pointer dark:bg-blue-100 dark:hover:bg-blue-200">Follow</Button>
//         </div>
//         <div className='border-1 border-slate-300 border-solid rounded-xl flex flex-col items-center'>
//             <Image width={50} height={50} className='w-[120px] h-[120px] object-cover object-center rounded-full p-2' src="../assets/person.svg" alt="profile" />
//             <p className='font-semibold'>UserName</p>
//             <Button className="m-4 rounded-full h-8 bg-blue-200 hover:bg-blue-400 text-black cursor-pointer dark:bg-blue-100 dark:hover:bg-blue-200">Follow</Button>
//         </div>
//         <div className='border-1 border-slate-300 border-solid rounded-xl flex flex-col items-center'>
//             <Image width={50} height={50} className='w-[120px] h-[120px] object-cover object-center rounded-full p-2' src="../assets/person.svg" alt="profile" />
//             <p className='font-semibold'>UserName</p>
//             <Button className="m-4 rounded-full h-8 bg-blue-200 hover:bg-blue-400 text-black cursor-pointer dark:bg-blue-100 dark:hover:bg-blue-200">Follow</Button>
//         </div>
//         </div>
//     </div>
//   )
// }

// export default Recommended