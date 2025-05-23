'use client';

import Post from "@/app/Components/Post";
import Recommended from "@/app/Components/Recommended";
import { useEffect, useState } from "react";
import { IBlogItems } from "@/app/Utils/Interfaces";
import { getAllBlogs, getToken } from "@/app/Utils/DataServices";
import { dummyBlogData } from "@/app/Utils/dummyData";
import { Spinner } from "flowbite-react";

export default function Home() {
  const [blogItems, setBlogItems] = useState<IBlogItems[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFallback, setIsFallback] = useState<boolean>(false); // flag to indicate dummy data

  useEffect(() => {
    const getData = async () => {
      try {
        const data: IBlogItems[] = await getAllBlogs(getToken());

        const filteredData = data
          .filter(item => item.isPublished && !item.isDeleted)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        setBlogItems(filteredData);
      } catch (error) {
        console.error("Failed to fetch blogs, using dummy data:", error);
        setBlogItems(dummyBlogData);
        setIsFallback(true);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const firstThree = blogItems.slice(0, 3);
  const remainingPosts = blogItems.slice(3);

  if (loading) {
    return (
      <div className="flex justify-center mt-15">
        <Spinner aria-label="Loading blogs..." />
      </div>
    );
  }

  return (
    <div className="pt-10">
      {isFallback && (
        <p className="text-yellow-500 text-center mb-4">
          Showing demo posts due to connection issues.
        </p>
      )}

      {firstThree.map((item: IBlogItems) => (
        <Post key={item.id} blog={item} />
      ))}

      {blogItems.length > 3 && <Recommended />}

      {remainingPosts.map((item: IBlogItems) => (
        <Post key={item.id} blog={item} />
      ))}
    </div>
  );
}
