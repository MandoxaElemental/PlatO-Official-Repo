'use client'
import Link from "next/link";
import Post from "@/app/Components/Post";
import Recommended from "@/app/Components/Recommended";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IBlogItems } from "@/app/Utils/Interfaces";
import { getAllBlogs, getToken, updateBlogItem } from "@/app/Utils/DataServices";
import StarRating from "@/app/Components/Rating";

export default function Home() {

  const [blogItems, setBlogItems] = useState<IBlogItems[]>([])

  useEffect(()=>{
    const getData = async () => {
      const data: IBlogItems[] = await getAllBlogs(getToken());
      const filteredData = data.filter(item => item.isPublished && !item.isDeleted)
      setBlogItems(filteredData)
    }
    getData()
  }, [])

  return (
    <div className="pt-10">
      <Post username={"Username"} post={<Image src="/assets/burger.png" alt="post" className="aspect-square object-cover object-center" width={500} height={500}/>}/>
      <Post username={"UserName"} post={
        <div>
          <div className='font-semibold text-2xl pb-2'>- Recipe -</div>
        <Image className='object-cover h-[200px] w-full' src="/assets/chocolate-cake.png" alt="post" width={50} height={20}/>
        <p className='font-semibold text-2xl p-2'>Moist Chocolate Cake</p>
        <div className='flex items-center justify-center'>
            <Image className='h-8 w-8 px-1' src="/assets/star.svg" alt="star"  width={500} height={500}/>
            <Image className='h-8 w-8 px-1' src="/assets/star.svg" alt="star"  width={500} height={500}/>
            <Image className='h-8 w-8 px-1' src="/assets/star.svg" alt="star"  width={500} height={500}/>
            <Image className='h-8 w-8 px-1' src="/assets/star.svg" alt="star"  width={500} height={500}/>
            <Image className='h-8 w-8 px-1' src="/assets/star.svg" alt="star"  width={500} height={500}/>
        </div>
        <div className='p-2 text-left'>Indulge in the rich, velvety goodness of our homemade chocolate cake recipe, perfect for any occasion. This delightful treat features layers of moist chocolate sponge, complemented by a luscious chocolate frosting that melts in your mouth.</div>
        <Link className='text-blue-600 text-xl underline pb-2' href={"#"}>Read Full Recipe</Link></div>}/>
        <Recommended/>
        {blogItems.map((item:IBlogItems, idx: number) => {
              return(
                <Post key={idx} username={item.publisherName} post={
                  <div>
                    {item.postType != 'recipe' ? (
                      <Link href={`/Blog/${item.id}`}>
                      <Image src={`${item.image}`} alt="post" className="aspect-square object-cover object-center" width={500} height={500}/>
                      </Link>
                    ) : (
                  <div>
                  <div className='font-semibold text-2xl pb-2'>- Recipe -</div>
                  <Image className='object-cover h-[200px] w-full' src={`${item.image}`} alt="post" width={50} height={20}/>
                  <p className='font-semibold text-2xl p-2'>{item.recipeName}</p>
                  <StarRating 
                      currentRating={item.averageRating} 
                      onRate={async (newRating) => {
                        const token = getToken();
                        const updatedBlog: IBlogItems = {
                          ...item,
                          rating: newRating,
                          numberOfRatings: item.numberOfRatings + 1,
                          averageRating: ((item.averageRating * item.numberOfRatings) + newRating) / (item.numberOfRatings + 1),
                        };
                        const success = await updateBlogItem(updatedBlog, token);
                        if (success) {
                          setBlogItems(prev => prev.map(b => b.id === item.id ? updatedBlog : b));
                        }
                      }}
                    />
                  <div className='p-2 text-left'>{item.description}</div>
                  <Link className='text-blue-600 text-xl underline pb-2' href={`/Blog/${item.id}`}>Read Full Recipe</Link>
                  <div className='p-2 text-left text-sm'>{item.date}</div>
                    </div>
                    )}
                  </div>
                }/>
              )
            })}
    </div>
  );
}
