'use client'

import { getBlogbyTag, getToken } from '@/app/Utils/DataServices';
import { IBlogItems } from '@/app/Utils/Interfaces';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Discover = () => {
    const { tag } = useParams();
    const [blogItems, setBlogItems] = useState<IBlogItems[]>([])
  
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
    <div className='pt-10 px-5 w-full'>
      <div className='border-b-1 border-solid border-slate-300 p-2 text-2xl font-semibold text-center'>
            Discover
        </div>
        <div className='grid grid-cols-3 gap-2 pt-5'>
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
    </div>
  )
}

export default Discover