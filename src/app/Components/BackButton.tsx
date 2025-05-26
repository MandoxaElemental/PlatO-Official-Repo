'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const BackButton = () => {
  const router = useRouter();

  return (
    <div className='py-2 border-b-1 border-blue-100 min-w-[60%] mb-5'>

    <div
      onClick={() => router.back()}
      className="ml-2 flex items-center gap-2 hover:cursor-pointer">
        <Image width={20} height={20} className="h-6 w-6 dark:invert" src={"/assets/arrow-left.svg"} alt="save"/>
    </div>
    </div>
  );
};

export default BackButton;
