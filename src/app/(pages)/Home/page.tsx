'use client'
import Post from "@/app/Components/Post";
import Recommended from "@/app/Components/Recommended";
import { useEffect, useState } from "react";
import { IBlogItems } from "@/app/Utils/Interfaces";
import { getAllBlogs, getToken } from "@/app/Utils/DataServices";

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
        {blogItems.map((item: IBlogItems) => (
          <Post key={item.id} blog={item} />
        ))}
        <Recommended/>
    </div>
  );
}
