"use client";

import { useMemo, useState, useEffect } from "react";
import { Sidebar, SidebarItems, TextInput } from "flowbite-react";
import Link from "next/link";
import { tagArr } from "../Utils/Interfaces";
import { useSearch } from "../Context/SearchContext";

function getRandomElements<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function NavbarComponentRight() {
  const [searchInput, setSearchInput] = useState("");
  const { setSearchQuery } = useSearch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchInput, setSearchQuery]);

  const randomTags = useMemo(() => {
    const randomCategories = getRandomElements(tagArr, 4);

    return randomCategories
      .map((category) => ({
        category: category.category,
        tag: getRandomElements(category.tags, 1)[0],
      }))
      .filter((item) => Boolean(item.tag));
  }, []);

  return (
    <Sidebar
      aria-label="Discovery sidebar"
      className="h-full border-l border-[#e5e5e0] bg-white"
    >
      <SidebarItems>
        {/* Search */}
        <div className="mb-6">
          <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#95988e]">
            Find something delicious
          </p>

          <TextInput
            type="text"
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search recipes, people..."
            value={searchInput}
            className="[&_input]:rounded-xl [&_input]:border-[#e5e5e0] [&_input]:bg-[#fbfaf7] [&_input]:text-[#292b25] [&_input]:placeholder:text-[#95988e] [&_input]:focus:border-[#336f9e] [&_input]:focus:ring-[#336f9e]/20"
          />
        </div>

        {/* Premium promotion */}
        <div className="mb-7 rounded-2xl border border-[#d1e4f5] bg-[#e0effc] p-5">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xl">
            ✦
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#336f9e]">
            PlatO Premium
          </p>

          <h3 className="mt-2 text-xl font-bold leading-snug text-[#292b25]">
            A little more flavor.
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-[#73776f]">
            Discover exclusive content and enjoy more ways to connect through
            food.
          </p>

          <Link
            href="/Premium"
            className="mt-4 flex w-full items-center justify-center rounded-xl bg-[#336f9e] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#285b83] focus:outline-none focus:ring-2 focus:ring-[#336f9e]/30"
          >
            Explore Premium
          </Link>
        </div>

        {/* Recommended tags */}
        <div className="mb-3 flex items-center justify-between px-1">
          <h3 className="text-base font-bold text-[#292b25]">
            Explore flavors
          </h3>
          <Link
            href="/Discover"
            className="text-xs font-semibold text-[#336f9e] hover:text-[#285b83]"
          >
            See all
          </Link>
        </div>

        <p className="mb-4 px-1 text-sm text-[#73776f]">
          Find your next favorite.
        </p>

        <div className="grid grid-cols-2 gap-2">
          {randomTags.map((item, idx) => (
            <Link
              key={`${item.category}-${item.tag}-${idx}`}
              href={`/Discover/${encodeURIComponent(item.tag)}`}
              className="flex min-h-[76px] items-center justify-center rounded-xl border border-[#e5e5e0] bg-[#fbfaf7] px-3 py-3 text-center transition-all hover:border-[#336f9e] hover:bg-[#e0effc]"
            >
              <span className="text-sm font-semibold leading-snug text-[#292b25]">
                {item.tag}
              </span>
            </Link>
          ))}
        </div>

        {/* Small footer */}
        <div className="mt-8 border-t border-[#e5e5e0] px-1 pt-4">
          <p className="text-xs leading-relaxed text-[#95988e]">
            Good food. Better company.
          </p>
        </div>
      </SidebarItems>
    </Sidebar>
  );
}
