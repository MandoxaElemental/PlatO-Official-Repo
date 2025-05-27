'use client'
import BackButton from '@/app/Components/BackButton';
import { getAllBlogs, getToken } from '@/app/Utils/DataServices';
import { IBlogItems } from '@/app/Utils/Interfaces';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';


const Discover = () => {
  const ITEMS_PER_BATCH = 12;
  const [blogItems, setBlogItems] = useState<IBlogItems[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_BATCH);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  const getPostTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "image": return "/assets/camera.svg";
    case "recipe": return "/assets/pot.svg";
    case "video": return "/assets/camera-video.svg";
    default: return "/assets/camera.svg";
  }
};

const gridClasses = [
  "", "", "", "", // 1-4
  "col-start-1 row-start-3", // 5
  "col-span-2 row-span-2 col-start-2 row-start-2", // 6
  "col-start-3 row-start-4", "col-start-2 row-start-4", "col-start-1 row-start-4", // 7-9
  "col-start-3 row-start-5", "col-start-3 row-start-6", // 10-11
  "col-span-2 row-span-2 col-start-1 row-start-5", // 12
];

  useEffect(() => {
    const getData = async () => {
      const data: IBlogItems[] = await getAllBlogs(getToken());
      const shuffleArray = (array: IBlogItems[]) => array.sort(() => Math.random() - 0.5);
      const filteredData = shuffleArray(
        data.filter(item => item.isPublished && !item.isDeleted)
      );
      setBlogItems(filteredData);
    };
    getData();
    setLoading(false);
  }, []);

  // Infinite scroll handler
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

  const visibleItems = blogItems.slice(0, visibleCount);


  return (
    <>
      <BackButton />
      <div className='pb-5 px-5 w-full'>
        <div className='border-b border-slate-300 p-2 text-2xl font-semibold text-center'>
          Discover
        </div>
 {loading ? (
                <div className="flex justify-center mb-4">
                    <DotLottieReact
                        className="w-[50px] h-auto dark:invert"
                        src="https://lottie.host/1362f106-3038-4bd3-960c-d2c553e0c317/LALyol5iRY.lottie"
                        loop
                        autoplay
                    />
                </div>
            ) : (
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
                    <Image className='object-cover w-full h-full aspect-square' src={item.image === null ? "/assets/Placeholder.png" : `${item.image}`} alt="post" width={50} height={50} sizes="(min-width: 768px) 200px, 100px"/>
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
            )}

        {/* 👇 Sentinel for infinite scroll */}
        <div ref={sentinelRef} className="h-10 w-full mt-10 flex justify-center items-center text-sm text-gray-500">
          {visibleCount < blogItems.length && 'Loading more...'}
        </div>
      </div>
    </>
  );
};

export default Discover;
