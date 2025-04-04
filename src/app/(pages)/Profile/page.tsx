import React from 'react'
import { TabItem, Tabs } from "flowbite-react";

const Profile = () => {
  return (
    <div className='pt-10 px-5 w-min-full'>
      <div className='flex flex-grid gap-5 border-b-1 border-solid border-slate-300 pb-2'>
      <div className='border-solid border-4 border-black rounded-full bg-slate-500 w-30 h-30 flex justify-center items-center'><img className='h-20 w-20' src="./assets/person.svg" alt="profilePic" /></div>
      <div className='p-5'>
        <h1 className='text-3xl font-bold'>UserName</h1>
        <div className='flex text-center flex-grid gap-3'>
          <div>
            <p className='font-semibold'>Following</p>
            <p>000</p>
          </div>
          <div>
            <p className='font-semibold'>Followers</p>
            <p>000</p>
          </div>
        </div>
      </div>
      </div>
    <div>
    <Tabs className='flex justify-between' aria-label="Tabs with underline" variant="underline">
      <TabItem active title="All">
        1
      </TabItem>
      <TabItem title="Photos">
        2
      </TabItem>
      <TabItem title="Videos">
        3
      </TabItem>
      <TabItem title="Recipes">
        4
      </TabItem>
    </Tabs>
    </div>
    </div>
  )
}

export default Profile