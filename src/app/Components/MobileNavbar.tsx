'use client'
import {  Button,
    Drawer,
    DrawerHeader,
    DrawerItems,
    Sidebar,
    SidebarItem,
    SidebarItemGroup,
    SidebarItems, } from "flowbite-react";
import Image from "next/image";
    
import { useState, useEffect } from "react";

export function MobileHeader() {
    const [isOpen, setIsOpen] = useState(false);
      const [username, setUsername] = useState('');
    
      useEffect(() => {
        const storedUsername = localStorage.getItem("Username");      
        if (storedUsername) setUsername(storedUsername);
      }, []);

    const handleClose = () => setIsOpen(false);
    return (
    <>
      <Drawer open={isOpen} onClose={handleClose} className="bg-blue-200 dark:bg-blue-200">
        <DrawerHeader titleIcon={() => <></>} />
        <DrawerItems>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                      <SidebarItems>
                        <SidebarItemGroup>
                        {username}
                        </SidebarItemGroup>
                        <SidebarItemGroup>
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
                            <Image className="h-5 w-5 dark:invert" src="../assets/person.svg" alt="profile" width={100} height={100} /><p className="pl-2">Profile</p>
                            </div>
                          </SidebarItem>
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
              </div>
            </div>
          </Sidebar>
        </DrawerItems>
      </Drawer>
      <div className="sticky top-0 block md:hidden">
        <div className="flex bg-blue-200 h-15 p-2 justify-around">
        <Button onClick={() => setIsOpen(true)}>Show drawer</Button>
        </div>
      </div>
    </>
    );
  }
  