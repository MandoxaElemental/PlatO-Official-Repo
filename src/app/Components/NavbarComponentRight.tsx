
"use client";

import { Button, Sidebar, SidebarItemGroup, SidebarItems, TextInput } from "flowbite-react";

export function NavbarComponentRight() {
  return (
    <Sidebar aria-label="Default sidebar example">
      <SidebarItems>
        <TextInput placeholder="Search"></TextInput>
        <div className="flex justify-evenly py-5">
            <div className="h-[70px] w-[100px] rounded-2xl bg-blue-400 flex justify-center items-center font-bold text-white">Burgers</div>
            <div className="h-[70px] w-[100px] rounded-2xl bg-blue-400 flex justify-center items-center font-bold text-white">Vegan</div>
        </div>
      </SidebarItems>
      <SidebarItemGroup>
        <p className="font-semibold">Recommended Accounts</p>
        <div className='flex justify-between items-center p-2 my-2 border-solid border-slate-300 border-2 rounded-2xl'>
            <div className='flex items-center'>
            <div className='rounded-full bg-yellow-500 w-10 h-10 flex justify-center items-center'><img className='' src="./assets/person.svg" alt="profilePic" /></div> <p className='pl-3'>UserName</p>
            </div>
            <Button className="rounded-full">Follow</Button>
        </div>
        <div className='flex justify-between items-center p-2 my-2 border-solid border-slate-300 border-2 rounded-2xl'>
            <div className='flex items-center'>
            <div className='rounded-full bg-red-500 w-10 h-10 flex justify-center items-center'><img className='' src="./assets/person.svg" alt="profilePic" /></div> <p className='pl-3'>UserName</p>
            </div>
            <Button className="rounded-full">Follow</Button>
        </div>
        <div className='flex justify-between items-center p-2 my-2 border-solid border-slate-300 border-2 rounded-2xl'>
            <div className='flex items-center'>
            <div className='rounded-full bg-blue-500 w-10 h-10 flex justify-center items-center'><img className='' src="./assets/person.svg" alt="profilePic" /></div> <p className='pl-3'>UserName</p>
            </div>
            <Button className="rounded-full">Follow</Button>
        </div>
      </SidebarItemGroup>
    </Sidebar>
  );
}
