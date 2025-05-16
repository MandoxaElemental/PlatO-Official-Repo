"use client";

import { useMemo } from "react";
import { Button, Sidebar, SidebarItemGroup, SidebarItems, TextInput } from "flowbite-react";
import Image from "next/image";
import { tagArr } from "../Utils/Interfaces";
import Link from "next/link";

function getRandomElements<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function NavbarComponentRight() {
  const randomTags = useMemo(() => {
    const randomCategories = getRandomElements(tagArr, 3);
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
        <TextInput placeholder="Search" />
        <div className="flex justify-evenly py-5 gap-2">
          {randomTags.map((item, idx) => (
            <Link key={idx} href={`/Discover/${item.tag}`}>
            <div className="h-[70px] w-[70px] rounded-2xl text-sm bg-blue-200 hover:bg-blue-400 cursor-pointer flex justify-center items-center font-bold text-white">
              {item.tag}
            </div>
            </Link>
          ))}
        </div>
      </SidebarItems>

      <SidebarItemGroup>
        <p className="font-semibold">Recommended Accounts</p>
        
        {[1, 2, 3].map((_, idx) => (
          <div key={idx} className='flex justify-between items-center p-2 my-2 border-solid border-slate-300 border-1 rounded-2xl'>
            <div className='flex items-center'>
              <div className={`rounded-full w-10 h-10 flex justify-center items-center bg-${['yellow', 'red', 'blue'][idx]}-500`}>
                <Image src="./assets/person.svg" alt="profilePic" width={100} height={100} />
              </div>
              <p className='pl-3'>UserName</p>
            </div>
            <Button className="rounded-full h-8 bg-blue-200 hover:bg-blue-400 text-black cursor-pointer dark:bg-blue-100 dark:hover:bg-blue-200">Follow</Button>
          </div>
        ))}
        
      </SidebarItemGroup>
    </Sidebar>
  );
}
