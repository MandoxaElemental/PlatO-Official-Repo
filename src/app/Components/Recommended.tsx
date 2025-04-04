import { Button } from 'flowbite-react'
import React from 'react'

const Recommended = () => {
  return (
    <div className='border-t-1 border-solid border-slate-300 pb-5'>
        <p className='text-2xl font-semibold py-2'>
        Recommended Accounts
        </p>
        <div className='grid grid-cols-3 gap-3'>
        <div className='border-1 border-slate-300 border-solid rounded-xl flex flex-col items-center'>
            <img className='w-[120px] h-[120px] object-cover object-center rounded-full p-2' src="./assets/burger.png" alt="profile" />
            <p className='font-semibold'>UserName</p>
            <p>[Title]</p>
            <Button className="rounded-full m-4">Follow</Button>
        </div>
        <div className='border-1 border-slate-300 border-solid rounded-xl flex flex-col items-center'>
            <img className='w-[120px] h-[120px] object-cover object-center rounded-full p-2' src="./assets/burger.png" alt="profile" />
            <p className='font-semibold'>UserName</p>
            <p>[Title]</p>
            <Button className="rounded-full m-4">Follow</Button>
        </div>
        <div className='border-1 border-slate-300 border-solid rounded-xl flex flex-col items-center'>
            <img className='w-[120px] h-[120px] object-cover object-center rounded-full p-2' src="./assets/burger.png" alt="profile" />
            <p className='font-semibold'>UserName</p>
            <p>[Title]</p>
            <Button className="rounded-full m-4">Follow</Button>
        </div>
        </div>
    </div>
  )
}

export default Recommended