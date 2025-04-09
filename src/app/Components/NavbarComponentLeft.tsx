
"use client";

import { Button, Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import Image from "next/image";

export function NavbarComponent() {
  return (
    <Sidebar aria-label="Default sidebar example">
      <SidebarItems>
      <Image src="../assets/4.svg" alt="plato" className="block dark:hidden h-[60px]" width={100} height={100}/>
      <Image src="../assets/1.svg" alt="plato" className="hidden dark:block h-[60px]" width={100} height={100}/>
        <SidebarItemGroup>
          <SidebarItem href="/Home" >
            <div className="flex items-center">
            <Image className="h-5 w-5 dark:invert" src="../assets/house.svg" alt="home" width={0} height={100}/><p className="pl-2">Home</p>
            </div>
          </SidebarItem>
          <SidebarItem href="/Discover">
          <div className="flex items-center">
            <Image className="h-5 w-5 dark:invert" src="../assets/search.svg" alt="discover" width={100} height={100}/><p className="pl-2">Discover</p>
            </div>
          </SidebarItem>
          <SidebarItem href="/Notifications">
          <div className="flex items-center">
            <Image className="h-5 w-5 dark:invert" src="../assets/bell.svg" alt="notifications"  width={100} height={100}/><p className="pl-2">Notifications</p>
            </div>
          </SidebarItem>
          <SidebarItem href="/Premium">
          <div className="flex items-center">
            <Image className="h-5 w-5 dark:invert" src="../assets/award.svg" alt="notifications" width={100} height={100}/><p className="pl-2">Premium</p>
            </div>
          </SidebarItem>
          <SidebarItem href="/Messages" >
          <div className="flex items-center">
            <Image className="h-5 w-5 dark:invert" src="../assets/envelope.svg" alt="messages"  width={100} height={100}/><p className="pl-2">Messages</p>
            </div>
          </SidebarItem>
          <SidebarItem href="/RecipeBook" >
          <div className="flex items-center">
            <Image className="h-5 w-5 dark:invert" src="../assets/book.svg" alt="book" width={100} height={100} /><p className="pl-2">Recipe Book</p>
            </div>
          </SidebarItem>
          <SidebarItem href="/Profile" >
          <div className="flex items-center">
            <Image className="h-5 w-5 dark:invert" src="../assets/person.svg" alt="profile" width={100} height={100} /><p className="pl-2">Profile</p>
            </div>
          </SidebarItem>
          <Button className="rounded-md bg-blue-200 hover:bg-blue-400 text-black w-full h-8 cursor-pointer dark:bg-blue-100 dark:hover:bg-blue-200" href="/NewPost">Post</Button>
        </SidebarItemGroup>
        <SidebarItemGroup>
          <SidebarItem href="#" >
          <div className="flex items-center">
            <Image className="h-5 w-5 dark:invert" src="../assets/person.svg" alt="profile" width={100} height={100} /><p className="pl-2">UserName</p>
            </div>
          </SidebarItem>
          <SidebarItem href="#" >
          <div className="flex items-center">
            <Image className="h-5 w-5 dark:invert" src="../assets/gear.svg" alt="profile" width={100} height={100} /><p className="pl-2">Settings and Privacy</p>
            </div>
          </SidebarItem>
          <SidebarItem href="/" >
            Log Out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
