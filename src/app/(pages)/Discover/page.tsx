'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import BackButton from '@/app/Components/BackButton';
import { getAllBlogs, getToken } from '@/app/Utils/DataServices';
import { IBlogItems } from '@/app/Utils/Interfaces';
import { dummyBlogData } from '@/app/Utils/dummyData';
import { useSearch } from '@/app/Context/SearchContext';
import SearchBar from '@/app/Components/SearchBar';

const Discover = () => {
  const ITEMS_PER_BATCH = 12;
  const [blogItems, setBlogItems] = useState<IBlogItems[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_BATCH);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { searchQuery } = useSearch(); // ⬅️ Get query from context

  const getPostTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'image': return '/assets/camera.svg';
      case 'recipe': return '/assets/pot.svg';
      case 'video': return '/assets/camera-video.svg';
      default: return '/assets/camera.svg';
    }
  };

  const gridClasses = [
    '', '', '', '',
    'col-start-1 row-start-3',
    'col-span-2 row-span-2 col-start-2 row-start-2',
    'col-start-3 row-start-4', 'col-start-2 row-start-4', 'col-start-1 row-start-4',
    'col-start-3 row-start-5', 'col-start-3 row-start-6',
    'col-span-2 row-span-2 col-start-1 row-start-5',
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        const token = getToken();
        let data: IBlogItems[] = [];

        if (token) {
          data = await getAllBlogs(token);
        }

        if (!data || data.length === 0) {
          console.warn('Falling back to dummy data.');
          data = dummyBlogData;
        }

        const shuffleArray = (array: IBlogItems[]) =>
          array.sort(() => Math.random() - 0.5);

        const filteredData = shuffleArray(
          data.filter(item => item.isPublished && !item.isDeleted)
        );

        setBlogItems(filteredData);
      } catch (err) {
        console.error('Failed to fetch blog data, using fallback.', err);
        const fallback = dummyBlogData.filter(item => item.isPublished && !item.isDeleted);
        setBlogItems(fallback);
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
          if (prev >= blogItems.length) return prev;
          return prev + ITEMS_PER_BATCH;
        });
      }
    });

    observerRef.current.observe(sentinelRef.current);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [blogItems.length, sentinelRef]);

  const filteredItems = blogItems.filter(item => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.recipeName?.toLowerCase().includes(query) ||
      item.publisherName?.toLowerCase().includes(query)
    );
  });

  const visibleItems = filteredItems.slice(0, visibleCount);

  if (loading) {
    return (
      <div className="flex justify-center mt-15 rounded-full border-4 opacity-50 border-blue-100 h-[60px] w-[60px]">
        <DotLottieReact
          className="w-[50px] h-auto dark:invert"
          src="https://lottie.host/1362f106-3038-4bd3-960c-d2c553e0c317/LALyol5iRY.lottie"
          loop
          autoplay
        />
      </div>
    );
  }

  if (!loading && filteredItems.length === 0) {
  return (
    <>
      <BackButton />
      <div className="pb-5 px-5 w-full">
        <div className="border-b border-slate-300 p-2 text-2xl font-semibold text-center">
          Discover
        </div>
        <div className="flex justify-center md:hidden mb-5">
          <SearchBar />
        </div>
        <div className="text-center text-gray-500 mt-10">
          No blogs found for your search.
        </div>
      </div>
    </>
  );
}


  return (
    <>
      <BackButton />
      <div className="pb-5 px-5 w-full">
        <div className="border-b border-slate-300 p-2 text-2xl font-semibold text-center">
          Discover
        </div>
        <div className='flex justify-center md:hidden'>
          <SearchBar/>
        </div>
        <div className="grid grid-cols-3 auto-rows-[100px] md:auto-rows-[200px] gap-4 pt-5">
          {visibleItems.map((item, index) => {
            const gridClass = gridClasses[index % 12];
            const rowOffset = Math.floor(index / 12) * 6;

            const adjustedGridClass = gridClass.replace(/row-start-(\d+)/g, (_, row) => {
              return `row-start-${parseInt(row) + rowOffset}`;
            });

            return (
              <div key={index} className={`relative group ${adjustedGridClass}`}>
                <Link href={`/Blog/${item.id}`}>
                  <Image
                    className="object-cover w-full h-full aspect-square"
                    src={item.image === null ? "/assets/Placeholder.png" : `${item.image}`}
                    alt="post"
                    width={50}
                    height={50}
                    sizes="(min-width: 768px) 200px, 100px"
                  />
                  <div className="absolute top-0 left-0 bg-blue-200 bg-opacity-50 text-white text-sm p-1.5 rounded-br-xl">
                    <Image
                      className="h-8 w-8 dark:invert"
                      src={getPostTypeIcon(item.postType)}
                      alt="type"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="absolute inset-0 bg-[#c3ddfdd0] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-black text-sm p-2">
                    {item.recipeName && <div className='font-semibold text-lg'>{item.recipeName}</div>}
                    <div><strong>By:</strong> {item.publisherName}</div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Sentinel for infinite scroll */}
        <div ref={sentinelRef} className="h-10 w-full mt-10 flex justify-center items-center text-sm text-gray-500">
          {visibleCount < filteredItems.length && 'Loading more...'}
        </div>
      </div>
    </>
  );
};

export default Discover;
