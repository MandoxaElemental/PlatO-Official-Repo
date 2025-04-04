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
              <div className="max-h-screen overflow-y-auto scrollbar-hide">
            <NavbarComponent/>
              </div>
              <div className="w-min-screenmax-h-screen overflow-y-auto scrollbar-hide">
            {children}
              </div>
              <div className="max-h-screen overflow-y-auto scrollbar-hide">
            <NavbarComponentRight/>
            </div>
        </div>
  )
}

export default layout