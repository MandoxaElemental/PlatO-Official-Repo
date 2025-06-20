
"use client";

import { Button, Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import Image from "next/image";
import { useEffect, useState } from "react";


export function NavbarComponent() {

  const [username, setUsername] = useState('');
  // const [id, setId] = useState(0);

  useEffect(() => {
    const storedUsername = localStorage.getItem("Username");
    // const storedId = localStorage.getItem("UserID");
  
    if (storedUsername) setUsername(storedUsername);
    // if (storedId) setId(Number(storedId));
  }, []);

  return (
    <Sidebar aria-label="Default sidebar example">
      <SidebarItems>
        <SidebarItemGroup>
          <div className="flex justify-center">
      <Image src="../assets/plato.svg" alt="plato" className=" block dark:hidden h-[120px]" width={150} height={125}/>
      <Image src="../assets/plato-dark.svg" alt="plato" className=" hidden dark:block h-[120px]" width={150} height={125}/>
          </div>
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
          <SidebarItem href={`/Profile/${username}`} >
          <div className="flex items-center">
            <Image className="h-5 w-5 dark:invert" src="../assets/person.svg" alt="profile" width={100} height={100} /><p className="pl-2">{username}</p>
            </div>
          </SidebarItem>
          <Button disabled={username === "Guest"} className="rounded-md bg-orange-200 hover:bg-orange-400 text-black w-full h-8 cursor-pointer dark:bg-orange-100 dark:hover:bg-orange-200" href="/NewPost">Post</Button>
        </SidebarItemGroup>
        <SidebarItemGroup>
          <SidebarItem href="/Settings" >
          <div className="flex items-center">
            <Image className="h-5 w-5 dark:invert" src="../assets/gear.svg" alt="profile" width={100} height={100} /><p className="pl-2">Settings and Privacy</p>
            </div>
          </SidebarItem>
          <SidebarItem href="/"
            onClick={() => {
              localStorage.removeItem("Token");
              localStorage.removeItem("UserID");
              localStorage.removeItem("Username");
            }}>
            Log Out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
