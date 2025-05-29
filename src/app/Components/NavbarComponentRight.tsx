"use client";

import { useMemo, useState, useEffect } from "react";
import { Button, Sidebar, SidebarItems, TextInput } from "flowbite-react";
import { tagArr } from "../Utils/Interfaces";
import Link from "next/link";
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
    return randomCategories.map(category => {
      const randomTag = getRandomElements(category.tags, 1)[0];
      return {
        category: category.category,
        tag: randomTag,
      };
    });
  }, []);

  return (
    <Sidebar aria-label="Default sidebar example">
      <SidebarItems>
        <TextInput 
          onChange={(event) => setSearchInput(event.target.value)} 
          placeholder="Search" 
          value={searchInput}
        />
          <div className="border border-blue-300 rounded-2xl p-4 mt-4 text-center shadow-sm">
    <h3 className="text-lg font-bold text-blue-900">Unlock Premium</h3>
    <p className="text-sm text-blue-800 mt-1">Access exclusive content and features by upgrading to Premium.</p>
    <Link href={"/Premium"}>
    <Button 
      className="mt-3 bg-blue-200 hover:bg-blue-400 text-black font-semibold rounded-full px-4 py-2 hover:cursor-pointer"
    >
      Go Premium
    </Button>
    </Link>
  </div>
          <p className="font-semibold mt-2">Recommended Tags</p>
        <div className="grid grid-cols-2 items-center py-2 gap-2">
          {randomTags.map((item, idx) => (
            <Link key={idx} href={`/Discover/${item.tag}`}>
              <div className="h-[50px] rounded-2xl text-sm bg-blue-200 hover:bg-blue-400 cursor-pointer flex justify-center items-center font-bold text-white text-center px-2">
                <div className="text-black leading-tight">
                  {item.tag.split(" ").map((word, i) => (
                    <p key={i}>{word}</p>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </SidebarItems>

      {/* <SidebarItemGroup>
        <p className="font-semibold">Recommended Accounts</p>
        
        {[1, 2, 3].map((_, idx) => (
          <div key={idx} className='flex justify-between items-center p-2 my-2 border-solid border-slate-300 border-1 rounded-2xl'>
            <div className='flex items-center'>
              <div className={`rounded-full w-10 h-10 flex justify-center items-center bg-${['yellow', 'red', 'blue'][idx]}-500`}>
                <Image src="./assets/person.svg" alt="profilePic" width={100} height={100} />
              </div>
              <p className='pl-3'>UserName</p>
            </div>
            <Button className="rounded-full h-8 bg-orange-200 hover:bg-orange-400 text-black cursor-pointer dark:bg-orange-100 dark:hover:bg-orange-200">Follow</Button>
          </div>
        ))}
        
      </SidebarItemGroup> */}
    </Sidebar>
  );
}