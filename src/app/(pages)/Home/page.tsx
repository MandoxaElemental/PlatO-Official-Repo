'use client';
import Post from "@/app/Components/Post";
import Recommended from "@/app/Components/Recommended";
import { useEffect, useRef, useState, useMemo } from "react";
import { IBlogItems } from "@/app/Utils/Interfaces";
import { getAllBlogs, getToken } from "@/app/Utils/DataServices";
import { dummyBlogData } from "@/app/Utils/dummyData";
import { Spinner } from "flowbite-react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useSearch } from "@/app/Context/SearchContext";

const BATCH_SIZE = 3;

export default function Home() {
  const [blogItems, setBlogItems] = useState<IBlogItems[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFallback, setIsFallback] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(BATCH_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { searchQuery } = useSearch();

  const filteredBlogs = useMemo(() => {
    if (!searchQuery.trim()) {
      return blogItems;
    }

    const query = searchQuery.toLowerCase();
    return blogItems.filter(blog => 
      (blog.recipeName && blog.recipeName.toLowerCase().includes(query)) ||
      (blog.description && blog.description.toLowerCase().includes(query)) ||
      (blog.tags && blog.tags.some(tag => tag && tag.toLowerCase().includes(query))) ||
      (blog.publisherName && blog.publisherName.toLowerCase().includes(query)) ||
      (blog.postType && blog.postType.toLowerCase().includes(query)) ||
      (blog.source && blog.source.toLowerCase().includes(query)) ||
      (blog.ingredients && blog.ingredients.some(ingredientGroup => 
        (ingredientGroup.title && ingredientGroup.title.toLowerCase().includes(query)) ||
        (ingredientGroup.ingredients && ingredientGroup.ingredients.some(ingredient => 
          ingredient && ingredient.toLowerCase().includes(query)
        ))
      )) ||
      (blog.steps && blog.steps.some(stepGroup => 
        (stepGroup.title && stepGroup.title.toLowerCase().includes(query)) ||
        (stepGroup.steps && stepGroup.steps.some(step => step && step.toLowerCase().includes(query)))
      ))
    );
  }, [blogItems, searchQuery]);

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

  // Reset visible count when search changes
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [searchQuery]);

  useEffect(() => {
    if (!sentinelRef.current) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setVisibleCount(prev => {
          if (prev >= filteredBlogs.length - 3) return prev;
          return prev + BATCH_SIZE;
        });
      }
    });

    observerRef.current.observe(sentinelRef.current);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [filteredBlogs.length, sentinelRef]);

  const firstThree = filteredBlogs.slice(0, 3);
  const remainingPosts = filteredBlogs.slice(3, 3 + visibleCount);

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

      {searchQuery && (
        <div className="mb-4 px-4">
          <p className="text-gray-600 dark:text-gray-400">
            {filteredBlogs.length === 0 
              ? `No results found for "${searchQuery}"` 
              : `Found ${filteredBlogs.length} result${filteredBlogs.length !== 1 ? 's' : ''} for "${searchQuery}"`
            }
          </p>
        </div>
      )}

      {filteredBlogs.length === 0 && searchQuery ? (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your search terms</p>
        </div>
      ) : (
        <>
          {firstThree.map((item: IBlogItems) => (
            <Post key={item.id} blog={item} />
          ))}

          {filteredBlogs.length > 3 && !searchQuery && <Recommended />}

          {remainingPosts.map((item: IBlogItems) => (
            <Post key={item.id} blog={item} />
          ))}

          {/* Infinite scroll trigger */}
          <div ref={sentinelRef} className="h-10 flex justify-center items-center text-gray-400">
            {visibleCount < filteredBlogs.length - 3 ? (
              <Spinner size="sm" aria-label="Loading more..." />
            ) : filteredBlogs.length > 0 ? (
              <span>No more posts</span>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}