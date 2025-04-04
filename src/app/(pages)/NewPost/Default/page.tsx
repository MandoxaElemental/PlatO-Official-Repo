import { Button, FileInput, TextInput } from 'flowbite-react'
import React from 'react'

const Post = () => {
  return (
       <div className='pt-10 px-5 w-full'>
            <div className='border-b-1 border-solid border-slate-300 p-2 text-2xl font-semibold text-center'>
                New Post
            </div>
            <div className='border-b-1 border-solid border-slate-300 p-2'>
                <FileInput/>
            </div>
            <div className='border-b-1 border-solid border-slate-300 p-2 flex flex-col items-center'>
                <p className='text-center text-blue-600'>Description 200/200</p>
                <TextInput className='w-[400px]'></TextInput>
            </div>
            <div className='border-b-1 border-solid border-slate-300 p-2'>
            <p className='font-semibold text-xl text-center'>Tags</p>
            <div className='flex justify-center items-center font-semibold hover:opacity-50 underline text-blue-600'><img className='h-6 w-6 pr-2' src="../assets/plus-circle.svg" alt="add" /><p>Add Tags</p></div>
            </div>
            <div className='p-2 flex justify-end'>
                <Button outline className='mx-1 w-[100px]'>Draft</Button>
                <Button className='mx-1 w-[100px]'>Post</Button>
            </div>
        </div>
  )
}

export default Post