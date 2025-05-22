'use client';
import Post from "@/app/Components/Post";
import Recommended from "@/app/Components/Recommended";
import { useEffect, useState } from "react";
import { IBlogItems } from "@/app/Utils/Interfaces";
import { getAllBlogs, getToken } from "@/app/Utils/DataServices";
import { Spinner, Button } from "flowbite-react";

export default function Home() {
  const [blogItems, setBlogItems] = useState<IBlogItems[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<IBlogItems[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const data: IBlogItems[] = await getAllBlogs(getToken());

        const filteredData = data
          .filter(item => item.isPublished && !item.isDeleted)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        setBlogItems(filteredData);
        setVisiblePosts(filteredData.slice(0, 1));
        setCurrentIndex(1);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const handleLoadMore = () => {
    if (currentIndex < blogItems.length) {
      setLoadingMore(true);
      setTimeout(() => {
        setVisiblePosts(prev => [...prev, blogItems[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
        setLoadingMore(false);
      }, 700);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <Spinner size="xl" aria-label="Loading blogs..." />
      </div>
    );
  }

  return (
    <div className="pt-10 flex flex-col items-center">
      {visiblePosts.map((item: IBlogItems) => (
        <Post key={item.id} blog={item} />
      ))}

      {currentIndex === 3 && blogItems.length > 3 && <Recommended />}

      {loadingMore && (
        <div className="my-5">
          <Spinner aria-label="Loading more post..." />
        </div>
      )}

      {currentIndex < blogItems.length && !loadingMore && (
        <Button onClick={handleLoadMore} className="my-5">
          Load More
        </Button>
      )}
    </div>
  );
}
