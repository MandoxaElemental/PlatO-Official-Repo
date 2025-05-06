'use client'
import { ButtonPreferences } from '@/app/Components/LoginPageComponents'
import { getToken, updateUserItem, getUserInfoByUsername } from '@/app/Utils/DataServices';
import { IUserData, tagArr } from '@/app/Utils/Interfaces';
import { Button } from 'flowbite-react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const SignUpPage4 = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [user, setUser] = useState<IUserData | null>(null);
  const router = useRouter();
  const filteredCategories = tagArr;

  useEffect(() => {
    const fetchUser = async () => {
      const username = localStorage.getItem("Username");
      if (!username) return;

      const userData = await getUserInfoByUsername(username);
      setUser(userData);
    };

    fetchUser();
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags((prevSelected) =>
      prevSelected.includes(tag)
        ? prevSelected.filter((t) => t !== tag)
        : [...prevSelected, tag]
    );
  };

  const handleContinue = async () => {
    if (!user || selectedTags.length < 3) return;

    const updatedUser: IUserData = {
      ...user,
      interests: selectedTags
    };

    const success = await updateUserItem(updatedUser, getToken());
    if (success) {
      router.push('/Home');
    } else {
      alert('Failed to update user preferences');
    }
  };

  return (
    <>
      <div className='justify-items-center'>
        <Image src={`/assets/4.svg`} alt="logo" width={200} height={200}/>  
      </div>
      <div className='text-center text-lg font-semibold p-2'>Pick up to three Interests:</div>
      <div className='h-screen flex items-center flex-col'>
        <div className='w-screen-min'>                
          <div className="space-y-4">
            {filteredCategories.map((cat, i) => (
              <div key={i}>
                <div className="grid md:grid-cols-5 grid-cols-3 gap-3">
                  {cat.tags.map((tag, j) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={j}
                        onClick={() => toggleTag(tag)}
                        className={`rounded-3xl border cursor-pointer h-25 w-28 ${
                          isSelected
                            ? 'bg-blue-400 text-white border-blue-600'
                            : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        <ButtonPreferences imageDescription={tag} imageSrc='/assets/burger.png'/>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <Button
            onClick={handleContinue}
            className='my-5 rounded-md bg-blue-200 hover:bg-blue-400 text-black w-full cursor-pointer dark:bg-blue-100 dark:hover:bg-blue-200'
            disabled={selectedTags.length < 3}
          >
            Continue
          </Button>
        </div>
      </div>
    </>
  )
}

export default SignUpPage4;
