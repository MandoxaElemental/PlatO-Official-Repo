'use client'

import { Button, FileInput, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'

const Post = () => {

        const [description, setDescription] = useState('');
        const [length, setLength] = useState(200);
    
        useEffect(() => {
            const num = (200 - description.length)
            setLength(num)
            if(description.length === 200){
                alert('error')
            }
          }, [description])

    return (
       <div className='pt-10 px-5 w-full'>
            <div className='border-b-1 border-solid border-slate-300 p-2 text-2xl font-semibold text-center'>
                New Post
            </div>
            <div className='border-b-1 border-solid border-slate-300 p-2'>
                <FileInput/>
            </div>
            <div className='border-b-1 border-solid border-slate-300 p-2 flex flex-col items-center'>
                <p className='text-center text-blue-600'>Description 200/{length}</p>
            <TextInput onChange={(e) => setDescription(e.target.value)} className='w-[400px]'></TextInput>
            </div>
            <div className='border-b-1 border-solid border-slate-300 p-2'>
            <p className='font-semibold text-xl text-center'>Tags</p>
            <div className='flex justify-center items-center font-semibold hover:opacity-50 underline text-blue-600 cursor-pointer'><img className='h-6 w-6 pr-2' src="../assets/plus-circle.svg" alt="add" /><p>Add Tags</p></div>
            </div>
            <div className='p-2 flex justify-end'>
                <Button className='mx-1 w-[100px] rounded-md bg-transparent hover:bg-transparent text-blue-200 hover:text-blue-400 border-4 border-blue-200 hover:border-blue-400 cursor-pointer dark:bg-transparent dark:hover:bg-transparent dark:border-blue-100 dark:hover:border-blue-200'>Draft</Button>
                <Button className='mx-1 w-[100px] rounded-md bg-blue-200 hover:bg-blue-400 text-black cursor-pointer dark:bg-blue-100 dark:hover:bg-blue-200'>Post</Button>
            </div>
        </div>
  )
}

export default Post