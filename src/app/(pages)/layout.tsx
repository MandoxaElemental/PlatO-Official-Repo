'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // for app router
import { NavbarComponent } from '../Components/NavbarComponentLeft';
import { NavbarComponentRight } from '../Components/NavbarComponentRight';
import { MobileFooter } from '../Components/MobileFooter';
import { MobileHeader } from '../Components/MobileNavbar';
import { SearchProvider } from '../Context/SearchContext';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('Username');
    if (!storedUser) {
      router.push('/Login/LoginPage');
    }
  }, [router]);

  return (
    <SearchProvider>
      <MobileHeader />
      <div className="min-w-screen flex md:justify-between justify-center px-2 md:px-10 z-5 max-h-[100vh]">
        <div className="max-h-screen overflow-y-auto scrollbar-hide lg:block hidden">
          <NavbarComponent />
        </div>
        <div className="min-h-screen overflow-y-auto scrollbar-hide">
          {children}
        </div>
        <div className="max-h-screen overflow-y-auto scrollbar-hide z-5 lg:block hidden">
          <NavbarComponentRight />
        </div>
      </div>
      <MobileFooter />
    </SearchProvider>
  );
};

export default Layout;
