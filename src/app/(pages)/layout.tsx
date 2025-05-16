import React from 'react'
import { NavbarComponent } from '../Components/NavbarComponentLeft';
import { NavbarComponentRight } from '../Components/NavbarComponentRight';
import { MobileFooter } from '../Components/MobileFooter';
import { MobileHeader } from '../Components/MobileNavbar';

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
    <MobileHeader/>
    <div className="flex md:justify-between justify-center px-5 min-h-[100vh]">
              <div className="max-h-screen overflow-y-auto scrollbar-hide lg:block hidden">
            <NavbarComponent/>
              </div>
              <div className="w-min-screen h-min-screen overflow-y-auto scrollbar-hide">
            {children}
              </div>
              <div className="max-h-screen overflow-y-auto scrollbar-hide lg:block hidden">
            <NavbarComponentRight/>
            </div>
        </div>
        <MobileFooter/>
    </>
  )
}

export default layout