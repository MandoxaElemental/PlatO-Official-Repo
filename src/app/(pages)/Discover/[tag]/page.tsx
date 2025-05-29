'use client'

import BackButton from '@/app/Components/BackButton';
import { getBlogbyTag, getToken } from '@/app/Utils/DataServices';
import { IBlogItems } from '@/app/Utils/Interfaces';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Discover = () => {
    const { tag } = useParams() as { tag: string };;
    const [blogItems, setBlogItems] = useState<IBlogItems[]>([])

    const getPostTypeIcon = (type: string) => {
      switch (type.toLowerCase()) {
        case "image": return "/assets/camera.svg";
        case "recipe": return "/assets/pot.svg";
        case "video": return "/assets/camera-video.svg";
        default: return "/assets/camera.svg";
      }
    };
  
    useEffect(() => {
      const getData = async () => {
        const data: IBlogItems[] = await getBlogbyTag(String(tag), getToken());
        const shuffleArray = (array: IBlogItems[]) => array.sort(() => Math.random() - 0.5);
        
        const filteredData = shuffleArray(
          data.filter(item => item.isPublished && !item.isDeleted)
        );
    
        setBlogItems(filteredData);
      };
      getData();
    }, []);
    

  
  return (
    <>
    <BackButton/>
    <div className='pt-2 px-5 w-full'>
      <div className='border-b-1 border-solid border-slate-300 p-2 text-2xl font-semibold text-center'>
            <p>Discover</p>
        <div className="text-xl font-normal">{tag}</div>
        </div>
        <div className='grid grid-cols-3 gap-1 pt-5'>
        {blogItems.map((item, ibx) => (
          <div key={ibx} className='relative group h-[100px] w-[100px] md:w-[200px] md:h-[200px]'>
            {item.isPublished && !item.isDeleted && (
              <Link href={`/Blog/${item.id}`}>
                <Image className='object-cover w-full h-full aspect-square' src={item.image === null ? "/assets/Placeholder.png" : `${item.image}`} alt="post" width={50} height={50} sizes="(min-width: 768px) 200px, 100px"/>
                <div className="absolute top-0 left-0 bg-blue-200 bg-opacity-50 text-white text-sm p-1.5 rounded-br-xl">
                <Image className="h-8 w-8 dark:invert" src={getPostTypeIcon(item.postType)} alt="image" width={50} height={50}/>
                </div>
                <div className="absolute inset-0 bg-[#c3ddfdd0] bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-black text-sm p-2">
                  {item.recipeName && <div className='font-semibold text-lg'>{item.recipeName}</div>}
                  <div><strong>By:</strong> {item.publisherName}</div>
                </div>
              </Link>
            )}
          </div>
        ))}
        </div>
    </div>
    </>
  )
}

export default Discover