'use client'
import Link from "next/link";
import Post from "@/app/Components/Post";
import Recommended from "@/app/Components/Recommended";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IBlogItems } from "@/app/Utils/Interfaces";
import { getAllBlogs, getToken } from "@/app/Utils/DataServices";

export default function Home() {

  const [blogItems, setBlogItems] = useState<IBlogItems[]>([])

  useEffect(()=>{
    const getData = async () => {
      const data: IBlogItems[] = await getAllBlogs(getToken());
      console.log(data)
      
      const filteredData = data.filter(item => item.isPublished && !item.isDeleted)
      console.log(filteredData)
      setBlogItems(filteredData)
    }
    getData()
  }, [])

  return (
    <div className="pt-10">
      <Post post={<Image src="/assets/burger.png" alt="post" width={500} height={500}/>}/>
      <Post post={
        <div>
          <div className='font-semibold text-2xl pb-2'>- Recipe -</div>
        <Image className='object-cover h-[200px] w-full' src="/assets/chocolate-cake.png" alt="post" width={50} height={20}/>
        <p className='font-semibold text-2xl p-2'>Moist Chocolate Cake</p>
        <div className='flex items-center justify-center'>
            <Image className='h-8 w-8 px-1' src="./assets/star.svg" alt="star"  width={500} height={500}/>
            <Image className='h-8 w-8 px-1' src="./assets/star.svg" alt="star"  width={500} height={500}/>
            <Image className='h-8 w-8 px-1' src="./assets/star.svg" alt="star"  width={500} height={500}/>
            <Image className='h-8 w-8 px-1' src="./assets/star.svg" alt="star"  width={500} height={500}/>
            <Image className='h-8 w-8 px-1' src="./assets/star.svg" alt="star"  width={500} height={500}/>
        </div>
        <div className='p-2 text-left'>Indulge in the rich, velvety goodness of our homemade chocolate cake recipe, perfect for any occasion. This delightful treat features layers of moist chocolate sponge, complemented by a luscious chocolate frosting that melts in your mouth.</div>
        <Link className='text-blue-600 text-xl underline pb-2' href={"#"}>Read Full Recipe</Link></div>}/>
        <Recommended/>
        {blogItems.map((item:IBlogItems, idx: number) => {
              return(
                <Post key={idx} post={
                  <div>
                    <div className='font-semibold text-2xl pb-2'>- Recipe -</div>
                  <Image className='object-cover h-[200px] w-full' src={item.image} alt="post" width={50} height={20}/>
                  <p className='font-semibold text-2xl p-2'>{item.recipeName}</p>
                  <div className='flex items-center justify-center'>
                      <Image className='h-8 w-8 px-1' src="./assets/star.svg" alt="star"  width={500} height={500}/>
                      <Image className='h-8 w-8 px-1' src="./assets/star.svg" alt="star"  width={500} height={500}/>
                      <Image className='h-8 w-8 px-1' src="./assets/star.svg" alt="star"  width={500} height={500}/>
                      <Image className='h-8 w-8 px-1' src="./assets/star.svg" alt="star"  width={500} height={500}/>
                      <Image className='h-8 w-8 px-1' src="./assets/star.svg" alt="star"  width={500} height={500}/>
                  </div>
                  <div className='p-2 text-left'>{item.description}</div>
                  <Link className='text-blue-600 text-xl underline pb-2' href={"/Blog"}>Read Full Recipe</Link></div>}/>
              )
            })}
    </div>
  );
}
