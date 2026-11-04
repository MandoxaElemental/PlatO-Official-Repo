"use client";

import { supabase } from "@/app/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { IBlogItems, IUserData } from "../Utils/Interfaces";
import { getUserInfoByUsername } from "../Utils/DataServices";
import FollowButton from "./FollowButton";
import SaveButton from "./SaveButton";
import LikeButton from "./LikeButton";

const DEFAULT_PROFILE = "/assets/person-circle.svg";
const PLACEHOLDER_IMAGE = "/assets/Placeholder.png";

const VIEWS = ["main", "ingredients", "steps"] as const;
type RecipeView = (typeof VIEWS)[number];

const Post = ({ blog }: { blog: IBlogItems }) => {
  const [currentUser, setCurrentUser] = useState<IUserData | null>(null);
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState(DEFAULT_PROFILE);
  const [, setIsFollowing] = useState(false);
  const [currentView, setCurrentView] = useState<RecipeView>("main");
  const [slideWidth, setSlideWidth] = useState(500);

  const containerRef = useRef<HTMLDivElement>(null);

  const isRecipe = blog.postType === "recipe";
  const isVideo = blog.postType === "video";
  const postHref = `/Blog/${blog.id}`;

  const imageUrl =
    typeof blog.image === "string" && blog.image.trim()
      ? blog.image
      : PLACEHOLDER_IMAGE;

  const ingredients = blog.ingredients ?? [];
  const steps = blog.steps ?? [];

  // Keep the recipe carousel sized to its actual container.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateWidth = () => {
      setSlideWidth(Math.max(1, Math.min(container.clientWidth, 500)));
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  // Load the post author's profile picture.
  useEffect(() => {
    let cancelled = false;

    const getProfilePicture = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("profile_picture")
          .eq("id", String(blog.userId))
          .maybeSingle();

        if (error) throw error;

        if (!cancelled) {
          setProfilePic(data?.profile_picture || DEFAULT_PROFILE);
        }
      } catch (error) {
        console.error("Failed to load profile picture:", error);

        if (!cancelled) {
          setProfilePic(DEFAULT_PROFILE);
        }
      }
    };

    getProfilePicture();

    return () => {
      cancelled = true;
    };
  }, [blog.userId]);

  // Read the signed-in username on the client.
  useEffect(() => {
    setUsername(localStorage.getItem("Username") || "");
  }, []);

  // Load the current user's data for the existing social controls.
  useEffect(() => {
    let cancelled = false;

    const fetchUser = async () => {
      if (!username) return;

      try {
        const user = await getUserInfoByUsername(username);

        if (!cancelled && user) {
          setCurrentUser(user);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUser();

    return () => {
      cancelled = true;
    };
  }, [username]);

  // Swipe between recipe overview, ingredients, and steps.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let touchStartX = 0;

    const handleTouchStart = (event: TouchEvent) => {
      touchStartX = event.touches[0]?.clientX ?? 0;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
      const deltaX = touchEndX - touchStartX;

      if (Math.abs(deltaX) <= 50) return;

      const currentIndex = VIEWS.indexOf(currentView);
      const nextIndex = deltaX > 0 ? currentIndex - 1 : currentIndex + 1;

      if (nextIndex >= 0 && nextIndex < VIEWS.length) {
        setCurrentView(VIEWS[nextIndex]);
      }
    };

    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentView]);

  const handleFollowUpdate = (isNowFollowing: boolean) => {
    setIsFollowing(isNowFollowing);
  };

  const changeView = (direction: -1 | 1) => {
    const currentIndex = VIEWS.indexOf(currentView);
    const nextIndex = currentIndex + direction;

    if (nextIndex >= 0 && nextIndex < VIEWS.length) {
      setCurrentView(VIEWS[nextIndex]);
    }
  };

  const renderRecipeView = () => (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#fbfaf7]"
    >
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{
          width: `${slideWidth * VIEWS.length}px`,
          transform: `translateX(-${VIEWS.indexOf(currentView) * slideWidth}px)`,
        }}
      >
        {/* Recipe overview */}
        <div className="min-w-0 shrink-0" style={{ width: slideWidth }}>
          <Link href={postHref} className="group block">
            <div className="relative h-[260px] w-full overflow-hidden bg-[#e0effc] sm:h-[320px]">
              <Image
                src={imageUrl}
                alt={blog.recipeName || "Recipe"}
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-5 pb-5 pt-12">
                <span className="inline-flex rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#336f9e]">
                  View recipe
                </span>
              </div>
            </div>
          </Link>

          <div className="px-5 py-5 text-left sm:px-6">
            <h2 className="text-xl font-bold leading-snug tracking-tight text-[#292b25] sm:text-2xl">
              {blog.recipeName || "Untitled recipe"}
            </h2>

            {blog.description && (
              <p className="mt-2 whitespace-pre-line text-sm leading-6 text-[#73776f]">
                {blog.description}
              </p>
            )}

            <button
              type="button"
              onClick={() => setCurrentView("ingredients")}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#d1e4f5] bg-[#e0effc] px-4 py-2 text-sm font-semibold text-[#336f9e] transition-colors hover:bg-[#d1e4f5] focus:outline-none focus:ring-2 focus:ring-[#336f9e]/30"
            >
              Explore ingredients
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        {/* Ingredients */}
        <div
          className="max-h-[520px] shrink-0 overflow-y-auto px-5 py-6 text-left sm:px-7"
          style={{ width: slideWidth }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#336f9e]">
            What you'll need
          </p>
          <h3 className="mb-5 mt-2 text-2xl font-bold text-[#292b25]">
            Ingredients
          </h3>

          {ingredients.length > 0 ? (
            <div className="space-y-5">
              {ingredients.map((group, index) => (
                <section
                  key={`${group.title}-${index}`}
                  className="rounded-xl border border-[#e5e5e0] bg-white p-4"
                >
                  <h4 className="mb-3 font-semibold text-[#292b25]">
                    {group.title}
                  </h4>

                  <ul className="space-y-2">
                    {(group.ingredients ?? []).map(
                      (ingredient, ingredientIndex) => (
                        <li
                          key={ingredientIndex}
                          className="flex gap-3 text-sm leading-5 text-[#73776f]"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#336f9e]" />
                          <span>{ingredient}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </section>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#73776f]">
              No ingredients have been added yet.
            </p>
          )}

          <Link
            href={postHref}
            className="mt-5 inline-block text-sm font-semibold text-[#336f9e] hover:text-[#285b83]"
          >
            Open full recipe →
          </Link>
        </div>

        {/* Cooking steps */}
        <div
          className="max-h-[520px] shrink-0 overflow-y-auto px-5 py-6 text-left sm:px-7"
          style={{ width: slideWidth }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#336f9e]">
            Let's get cooking
          </p>
          <h3 className="mb-5 mt-2 text-2xl font-bold text-[#292b25]">
            Method
          </h3>

          {steps.length > 0 ? (
            <div className="space-y-5">
              {steps.map((group, index) => (
                <section
                  key={`${group.title}-${index}`}
                  className="rounded-xl border border-[#e5e5e0] bg-white p-4"
                >
                  <h4 className="mb-3 font-semibold text-[#292b25]">
                    {group.title}
                  </h4>

                  <ol className="space-y-4">
                    {(group.steps ?? []).map((step, stepIndex) => (
                      <li
                        key={stepIndex}
                        className="flex items-start gap-3 text-sm leading-6 text-[#73776f]"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e0effc] text-xs font-bold text-[#336f9e]">
                          {stepIndex + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#73776f]">
              No cooking steps have been added yet.
            </p>
          )}

          <Link
            href={postHref}
            className="mt-5 inline-block text-sm font-semibold text-[#336f9e] hover:text-[#285b83]"
          >
            Open full recipe →
          </Link>
        </div>
      </div>

      {/* Carousel controls */}
      {currentView !== "main" && (
        <button
          type="button"
          aria-label="Previous recipe section"
          onClick={() => changeView(-1)}
          className="absolute inset-y-0 left-0 flex items-center px-2 transition-colors hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#336f9e]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-xl text-[#336f9e] shadow-sm">
            ‹
          </span>
        </button>
      )}

      {currentView !== "steps" && (
        <button
          type="button"
          aria-label="Next recipe section"
          onClick={() => changeView(1)}
          className="absolute inset-y-0 right-0 flex items-center px-2 transition-colors hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#336f9e]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-xl text-[#336f9e] shadow-sm">
            ›
          </span>
        </button>
      )}

      <div className="flex justify-center gap-2 border-t border-[#e5e5e0] bg-white py-3">
        {VIEWS.map((view) => (
          <button
            key={view}
            type="button"
            aria-label={`Show ${view}`}
            aria-pressed={currentView === view}
            onClick={() => setCurrentView(view)}
            className={`h-2 rounded-full transition-all ${
              currentView === view
                ? "w-6 bg-[#336f9e]"
                : "w-2 bg-[#d8d9d2] hover:bg-[#95988e]"
            }`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <article className="mx-auto mb-7 w-full max-w-[500px] overflow-hidden rounded-2xl border border-[#e5e5e0] bg-white shadow-[0_4px_18px_rgba(41,43,37,0.04)] transition-shadow duration-200 hover:shadow-[0_8px_26px_rgba(41,43,37,0.08)]">
      {/* Author header */}
      <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href={`/Profile/${encodeURIComponent(blog.publisherName || "")}`}
            aria-label={`View ${blog.publisherName || "author"}'s profile`}
            className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[#e0effc] ring-2 ring-[#e0effc]"
          >
            <Image
              src={profilePic || DEFAULT_PROFILE}
              alt=""
              fill
              sizes="44px"
              className="object-cover"
            />
          </Link>

          <div className="min-w-0">
            <Link
              href={`/Profile/${encodeURIComponent(blog.publisherName || "")}`}
              className="block truncate text-sm font-semibold text-[#292b25] transition-colors hover:text-[#336f9e]"
            >
              {blog.publisherName || "PlatO member"}
            </Link>

            <p className="mt-0.5 text-xs text-[#95988e]">
              {isRecipe
                ? "Shared a recipe"
                : isVideo
                  ? "Shared a video"
                  : "Shared a post"}
            </p>
          </div>
        </div>

        {username && blog.publisherName !== username && blog.userId != null && (
          <div className="shrink-0">
            <FollowButton
              targetUserId={Number(blog.userId)}
              currentUser={currentUser}
              onUpdate={handleFollowUpdate}
            />
          </div>
        )}
      </div>

      {/* Post content */}
      {isRecipe ? (
        renderRecipeView()
      ) : isVideo ? (
        <div className="w-full bg-black">
          <video
            className="max-h-[520px] w-full object-contain"
            controls
            playsInline
            preload="metadata"
            poster={imageUrl}
          >
            {blog.image && <source src={String(blog.image)} type="video/mp4" />}
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <Link href={postHref} className="block">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e0effc]">
            <Image
              src={imageUrl}
              alt={blog.recipeName || "Post"}
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              loading="lazy"
              className="object-cover transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>

          {(blog.recipeName || blog.description) && (
            <div className="px-5 py-4 text-left">
              {blog.recipeName && (
                <h2 className="text-lg font-bold text-[#292b25]">
                  {blog.recipeName}
                </h2>
              )}

              {blog.description && (
                <p className="mt-1 whitespace-pre-line text-sm leading-6 text-[#73776f]">
                  {blog.description}
                </p>
              )}
            </div>
          )}
        </Link>
      )}

      {/* Post actions */}
      <div className="flex flex-wrap items-center justify-around gap-x-2 gap-y-3 border-t border-[#e5e5e0] bg-white px-2 py-3 text-[#73776f] sm:px-4">
        <div className="flex items-center justify-center">
          <LikeButton
            blog={blog}
            currentUser={currentUser}
            onUserUpdate={setCurrentUser}
          />
        </div>

        <Link
          href={postHref}
          className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium transition-colors hover:bg-[#fbfaf7] hover:text-[#336f9e]"
        >
          <Image
            width={19}
            height={19}
            src="/assets/chat-left.svg"
            alt=""
            aria-hidden="true"
          />
          <span>Comment</span>
        </Link>

        <button
          type="button"
          onClick={async () => {
            const shareUrl =
              typeof window !== "undefined"
                ? `${window.location.origin}${postHref}`
                : postHref;

            try {
              if (navigator.share) {
                await navigator.share({
                  title: blog.recipeName || "PlatO post",
                  url: shareUrl,
                });
              } else {
                await navigator.clipboard.writeText(shareUrl);
              }
            } catch (error) {
              if (error instanceof Error && error.name !== "AbortError") {
                console.error("Unable to share post:", error);
              }
            }
          }}
          className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium transition-colors hover:bg-[#fbfaf7] hover:text-[#336f9e]"
        >
          <Image
            width={19}
            height={19}
            src="/assets/repeat.svg"
            alt=""
            aria-hidden="true"
          />
          <span>Share</span>
        </button>

        <div className="flex items-center justify-center">
          <SaveButton
            postId={blog.id}
            currentUser={currentUser}
            onUpdate={setCurrentUser}
          />
        </div>
      </div>
    </article>
  );
};

export default Post;
