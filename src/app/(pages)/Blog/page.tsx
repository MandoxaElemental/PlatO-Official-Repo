'use client'

import React from 'react'
import Image from "next/image";
import Post from '@/app/Components/Post';
// import { IBlogItems } from '@/app/Utils/Interfaces';
// import { getAllBlogs, getToken } from '@/app/Utils/DataServices';

const Blog = () => {

    // const [blogItems, setBlogItems] = useState<IBlogItems[]>([])
  
    // useEffect(()=>{
    //   const getData = async () => {
    //     const data: IBlogItems[] = await getAllBlogs(getToken());
    //     console.log(data)
        
    //     const filteredData = data.filter(item => item.isPublished && !item.isDeleted)
    //     console.log(filteredData)
    //     setBlogItems(filteredData)
    //   }
    //   getData()
    // }, [])
  
  return (
    <div className="pt-10">
        <Post post={
          <div>
            <div className='font-semibold text-2xl pb-2'>- Recipe -</div>
          <Image className='object-cover h-[200px] w-full' src="" alt="post" width={50} height={20}/>
          <p className='font-semibold text-2xl p-2'>name</p>
          <div className='flex items-center justify-center'>
              <Image className='h-8 w-8 px-1' src="./assets/star.svg" alt="star"  width={500} height={500}/>
              <Image className='h-8 w-8 px-1' src="./assets/star.svg" alt="star"  width={500} height={500}/>
              <Image className='h-8 w-8 px-1' src="./assets/star.svg" alt="star"  width={500} height={500}/>
              <Image className='h-8 w-8 px-1' src="./assets/star.svg" alt="star"  width={500} height={500}/>
              <Image className='h-8 w-8 px-1' src="./assets/star.svg" alt="star"  width={500} height={500}/>
          </div>
          <div className='p-2 text-left'>desc</div>
          
          </div>}/>
    </div>

  )
}

export default Blog