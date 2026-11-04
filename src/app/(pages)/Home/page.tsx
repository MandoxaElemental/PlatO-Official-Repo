"use client";

import Post from "@/app/Components/Post";
import Recommended from "@/app/Components/Recommended";
import { useEffect, useRef, useState, useMemo } from "react";
import { IBlogItems } from "@/app/Utils/Interfaces";
import { getAllBlogs } from "@/app/Utils/DataServices";
import { dummyBlogData } from "@/app/Utils/dummyData";
import { Spinner } from "flowbite-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
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

    return blogItems.filter(
      (blog) =>
        (blog.recipeName && blog.recipeName.toLowerCase().includes(query)) ||
        (blog.description && blog.description.toLowerCase().includes(query)) ||
        (blog.tags &&
          blog.tags.some((tag) => tag && tag.toLowerCase().includes(query))) ||
        (blog.publisherName &&
          blog.publisherName.toLowerCase().includes(query)) ||
        (blog.postType && blog.postType.toLowerCase().includes(query)) ||
        (blog.source && blog.source.toLowerCase().includes(query)) ||
        (blog.ingredients &&
          blog.ingredients.some(
            (ingredientGroup) =>
              (ingredientGroup.title &&
                ingredientGroup.title.toLowerCase().includes(query)) ||
              (ingredientGroup.ingredients &&
                ingredientGroup.ingredients.some(
                  (ingredient) =>
                    ingredient && ingredient.toLowerCase().includes(query),
                )),
          )) ||
        (blog.steps &&
          blog.steps.some(
            (stepGroup) =>
              (stepGroup.title &&
                stepGroup.title.toLowerCase().includes(query)) ||
              (stepGroup.steps &&
                stepGroup.steps.some(
                  (step) => step && step.toLowerCase().includes(query),
                )),
          )),
    );
  }, [blogItems, searchQuery]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data: IBlogItems[] = await getAllBlogs();

        const filteredData = data
          .filter((item) => item.isPublished && !item.isDeleted)
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          );

        setBlogItems(filteredData);
        setIsFallback(false);
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

  // Reset pagination when the search query changes.
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [searchQuery]);

  // Infinite scrolling for posts after the first three.
  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel || loading) return;

    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((previous) => {
            if (previous >= filteredBlogs.length - 3) {
              return previous;
            }

            return previous + BATCH_SIZE;
          });
        }
      },
      { rootMargin: "200px" },
    );

    observerRef.current.observe(sentinel);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [filteredBlogs.length, loading]);

  const firstThree = filteredBlogs.slice(0, 3);
  const remainingPosts = filteredBlogs.slice(3, 3 + visibleCount);
  const hasMorePosts = visibleCount < filteredBlogs.length - 3;

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-[#fbfaf7] px-6">
        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-[#e0effc] bg-white shadow-sm">
          <DotLottieReact
            className="h-12 w-12"
            src="https://lottie.host/1362f106-3038-4bd3-960c-d2c553e0c317/LALyol5iRY.lottie"
            loop
            autoplay
          />
        </div>

        <p className="text-sm font-medium text-[#73776f]">
          Setting the table...
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#fbfaf7] px-4 pb-12 pt-6 sm:px-6 sm:pt-8 lg:px-8">
      <div className="mx-auto w-full max-w-3xl">
        {/* Welcome header */}
        <header className="mb-8 border-b border-[#e5e5e0] pb-7 sm:mb-10 sm:pb-9">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#336f9e]">
            A place for every appetite
          </p>

          <h1 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-[#292b25] sm:text-4xl lg:text-5xl">
            Good food.
            <br />
            <span className="text-[#336f9e]">Better company.</span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-[#73776f] sm:text-base">
            Discover recipes, share what is on your table, and find your next
            favorite meal with the PlatO community.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#e0effc] px-3 py-1.5 text-xs font-semibold text-[#336f9e]">
              Discover something new
            </span>
            <span className="rounded-full border border-[#e5e5e0] bg-white px-3 py-1.5 text-xs font-medium text-[#73776f]">
              Recipes · People · Inspiration
            </span>
          </div>
        </header>

        {/* Demo-data notice */}
        {isFallback && (
          <div
            role="status"
            className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
          >
            We couldn't connect to the feed, so you're viewing demo posts.
            Please try again later.
          </div>
        )}

        {/* Search feedback */}
        {searchQuery.trim() && (
          <div className="mb-6 rounded-xl border border-[#e5e5e0] bg-white px-4 py-3">
            <p className="text-sm text-[#73776f]">
              {filteredBlogs.length === 0 ? (
                <>
                  No results found for{" "}
                  <span className="font-semibold text-[#292b25]">
                    "{searchQuery}"
                  </span>
                </>
              ) : (
                <>
                  Found{" "}
                  <span className="font-semibold text-[#292b25]">
                    {filteredBlogs.length}
                  </span>{" "}
                  result{filteredBlogs.length !== 1 ? "s" : ""} for{" "}
                  <span className="font-semibold text-[#292b25]">
                    "{searchQuery}"
                  </span>
                </>
              )}
            </p>
          </div>
        )}

        {/* Feed heading */}
        {filteredBlogs.length > 0 && (
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#95988e]">
                From our community
              </p>

              <h2 className="text-xl font-bold text-[#292b25] sm:text-2xl">
                {searchQuery.trim() ? "Search results" : "Fresh from the table"}
              </h2>
            </div>

            <span className="shrink-0 rounded-full border border-[#e5e5e0] bg-white px-3 py-1.5 text-xs font-medium text-[#73776f]">
              {filteredBlogs.length}{" "}
              {filteredBlogs.length === 1 ? "post" : "posts"}
            </span>
          </div>
        )}

        {/* Empty search state */}
        {filteredBlogs.length === 0 && searchQuery.trim() ? (
          <div className="rounded-2xl border border-[#e5e5e0] bg-white px-6 py-12 text-center sm:px-10">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e0effc] text-2xl">
              ⌕
            </div>

            <h2 className="text-lg font-bold text-[#292b25]">
              Nothing on the menu yet
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#73776f]">
              Try another recipe name, ingredient, tag, or creator to find
              something delicious.
            </p>
          </div>
        ) : (
          <>
            {/* First three posts */}
            <div className="space-y-6 sm:space-y-8">
              {firstThree.map((item: IBlogItems) => (
                <Post key={item.id} blog={item} />
              ))}
            </div>

            {/* Recommendations between feed sections */}
            {filteredBlogs.length > 3 && !searchQuery.trim() && (
              <div className="my-8 rounded-2xl border border-[#d1e4f5] bg-[#e0effc]/60 p-3 sm:my-10 sm:p-5">
                <Recommended />
              </div>
            )}

            {/* Remaining posts */}
            <div className="space-y-6 sm:space-y-8">
              {remainingPosts.map((item: IBlogItems) => (
                <Post key={item.id} blog={item} />
              ))}
            </div>

            {/* Infinite scroll trigger */}
            <div
              ref={sentinelRef}
              className="flex min-h-20 items-center justify-center py-6 text-sm text-[#95988e]"
            >
              {hasMorePosts ? (
                <div className="flex items-center gap-3">
                  <Spinner
                    size="sm"
                    color="info"
                    aria-label="Loading more posts"
                  />
                  <span>Finding more from the table...</span>
                </div>
              ) : filteredBlogs.length > 0 ? (
                <span className="rounded-full border border-[#e5e5e0] bg-white px-4 py-2">
                  You've reached the end of the table.
                </span>
              ) : null}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
