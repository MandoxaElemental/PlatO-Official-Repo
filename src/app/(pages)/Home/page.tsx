'use client';
import Post from "@/app/Components/Post";
import Recommended from "@/app/Components/Recommended";
import { useEffect, useRef, useState } from "react";
import { IBlogItems } from "@/app/Utils/Interfaces";
import { getAllBlogs, getToken } from "@/app/Utils/DataServices";
import { dummyBlogData } from "@/app/Utils/dummyData";
import { Spinner } from "flowbite-react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const BATCH_SIZE = 5;

export default function Home() {
  const [blogItems, setBlogItems] = useState<IBlogItems[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFallback, setIsFallback] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(BATCH_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

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

  useEffect(() => {
    if (!sentinelRef.current) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setVisibleCount(prev => {
          if (prev >= blogItems.length - 3) return prev;
          return prev + BATCH_SIZE;
        });
      }
    });

    observerRef.current.observe(sentinelRef.current);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [blogItems.length, sentinelRef]);

  const firstThree = blogItems.slice(0, 3);
  const remainingPosts = blogItems.slice(3, 3 + visibleCount);

  if (loading) {
    return (
      <div className="flex justify-center mt-15 rounded-full border-4 opacity-50 border-blue-100 h-[60px] w-[60px]">
      <DotLottieReact className="w-[50px] h-auto dark:invert"
      src="https://lottie.host/1362f106-3038-4bd3-960c-d2c553e0c317/LALyol5iRY.lottie"
      loop
      autoplay
      />
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

      {/* 👇 Infinite scroll trigger */}
      <div ref={sentinelRef} className="h-10 flex justify-center items-center text-gray-400">
        {visibleCount < blogItems.length - 3 ? (
          <Spinner size="sm" aria-label="Loading more..." />
        ) : (
          <span>No more posts</span>
        )}
      </div>
    </div>
  );
}
