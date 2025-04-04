
"use client";

import { Button, Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";

export function NavbarComponent() {
  return (
    <Sidebar aria-label="Default sidebar example">
      <SidebarItems>
      <img src="../assets/4.svg" alt="plato" className="block dark:hidden h-[60px]"/>
      <img src="../assets/1.svg" alt="plato" className="hidden dark:block h-[60px]"/>
        <SidebarItemGroup>
          <SidebarItem href="/Home" >
            <div className="flex items-center">
            <img className="h-5 w-5" src="../assets/house.svg" alt="home" /><p className="pl-2">Home</p>
            </div>
          </SidebarItem>
          <SidebarItem href="/Discover">
          <div className="flex items-center">
            <img className="h-5 w-5" src="../assets/search.svg" alt="discover" /><p className="pl-2">Discover</p>
            </div>
          </SidebarItem>
          <SidebarItem href="/Notifications">
          <div className="flex items-center">
            <img className="h-5 w-5" src="../assets/bell.svg" alt="notifications" /><p className="pl-2">Notifications</p>
            </div>
          </SidebarItem>
          <SidebarItem href="/Premium">
          <div className="flex items-center">
            <img className="h-5 w-5" src="../assets/award.svg" alt="notifications" /><p className="pl-2">Premium</p>
            </div>
          </SidebarItem>
          <SidebarItem href="/Messages" >
          <div className="flex items-center">
            <img className="h-5 w-5" src="../assets/envelope.svg" alt="messages" /><p className="pl-2">Messages</p>
            </div>
          </SidebarItem>
          <SidebarItem href="/RecipeBook" >
          <div className="flex items-center">
            <img className="h-5 w-5" src="../assets/book.svg" alt="book" /><p className="pl-2">Recipe Book</p>
            </div>
          </SidebarItem>
          <SidebarItem href="/Profile" >
          <div className="flex items-center">
            <img className="h-5 w-5" src="../assets/person.svg" alt="profile" /><p className="pl-2">Profile</p>
            </div>
          </SidebarItem>
          <Button className="w-full text-center" href="/NewPost">Post</Button>
        </SidebarItemGroup>
        <SidebarItemGroup>
          <SidebarItem href="#" >
          <div className="flex items-center">
            <img className="h-5 w-5" src="../assets/person.svg" alt="profile" /><p className="pl-2">UserName</p>
            </div>
          </SidebarItem>
          <SidebarItem href="#" >
          <div className="flex items-center">
            <img className="h-5 w-5" src="../assets/gear.svg" alt="profile" /><p className="pl-2">Settings and Privacy</p>
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
