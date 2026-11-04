"use client";

import {
  Button,
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function NavbarComponent() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("Username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const navItems = [
    { label: "Home", href: "/Home", icon: "/assets/house.svg" },
    { label: "Discover", href: "/Discover", icon: "/assets/search.svg" },
    {
      label: "Notifications",
      href: "/Notifications",
      icon: "/assets/bell.svg",
    },
    { label: "Premium", href: "/Premium", icon: "/assets/award.svg" },
    { label: "Messages", href: "/Messages", icon: "/assets/envelope.svg" },
    { label: "Recipe Book", href: "/RecipeBook", icon: "/assets/book.svg" },
    {
      label: username || "Profile",
      href: username ? `/Profile/${encodeURIComponent(username)}` : "/",
      icon: "/assets/person.svg",
    },
  ];

  return (
    <Sidebar
      aria-label="Main navigation"
      className="h-full border-r border-[#e5e5e0] bg-white"
    >
      <SidebarItems>
        <SidebarItemGroup>
          <a href="/Home" className="mb-8 flex justify-center">
            <Image
              src="/assets/plato.svg"
              alt="PlatO"
              width={150}
              height={100}
              priority
              className="h-auto max-h-[100px] w-[130px] object-contain"
            />
          </a>

          <div className="mb-5 px-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#95988e]">
              Menu
            </p>
          </div>

          {navItems.map((item) => (
            <SidebarItem key={item.label} href={item.href}>
              <div className="flex items-center gap-3 py-1 text-[#292b25]">
                <Image
                  src={item.icon}
                  alt=""
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
                <span className="font-medium">{item.label}</span>
              </div>
            </SidebarItem>
          ))}

          <div className="mt-6 px-3">
            <Button
              disabled={username === "Guest"}
              href="/NewPost"
              className="w-full cursor-pointer rounded-xl border-0 bg-[#336f9e] text-white hover:bg-[#285b83] focus:ring-2 focus:ring-[#336f9e]/30 disabled:opacity-50"
            >
              + Create a post
            </Button>
          </div>
        </SidebarItemGroup>

        <SidebarItemGroup>
          <SidebarItem href="/Settings">
            <div className="flex items-center gap-3 py-1 text-[#292b25]">
              <Image
                src="/assets/gear.svg"
                alt=""
                width={20}
                height={20}
                className="h-5 w-5"
              />
              <span>Settings and Privacy</span>
            </div>
          </SidebarItem>

          <SidebarItem
            href="/"
            onClick={() => {
              localStorage.removeItem("Token");
              localStorage.removeItem("UserID");
              localStorage.removeItem("Username");
            }}
          >
            Log Out
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
