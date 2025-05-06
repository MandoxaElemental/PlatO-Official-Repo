import React from 'react'
import { NavbarComponent } from '../Components/NavbarComponentLeft';
import { NavbarComponentRight } from '../Components/NavbarComponentRight';

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex justify-between px-5 max-h-[100vh]">
              <div className="max-h-screen overflow-y-auto scrollbar-hide lg:block hidden">
            <NavbarComponent/>
              </div>
              <div className="w-min-screen max-h-screen overflow-y-auto scrollbar-hide">
            {children}
              </div>
              <div className="max-h-screen overflow-y-auto scrollbar-hide lg:block hidden">
            <NavbarComponentRight/>
            </div>
        </div>
  )
}

export default layout