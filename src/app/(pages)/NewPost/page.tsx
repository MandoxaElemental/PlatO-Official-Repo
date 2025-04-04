'use client'
import Link from 'next/link'

const Post = () => {


  return (
    <div className='pt-10 px-5 w-min-full flex flex-col text-center'>
        <h1 className='font-2xl text-semibold pb-2'>New Post</h1>
        <Link href={"/NewPost/Default"}>
        <div className='hover:opacity-50 border-1 border-slate-300 h-[100px] flex items-center rounded-xl mb-2'>
        <div className="flex justify-center items-center w-[100px] h-[100px] bg-slate-300 rounded-xl">
            <img className='h-[50px] opacity-50' src="./assets/camera.svg" alt="camera" />
        </div>
        <div className='p-5'>Image/Video</div>
        </div>
        </Link>
        <Link href={"/NewPost/Recipe"}>
        <div className='hover:opacity-50 border-1 border-slate-300 h-[100px] flex items-center rounded-xl mb-2'>
        <div className="flex justify-center items-center w-[100px] h-[100px] bg-slate-300 rounded-xl">
            <img className='h-[70px] opacity-50' src="./assets/pot.svg" alt="pot" />
        </div>
        <div className='p-5'>Recipe</div>
        </div>
        </Link>
        <Link href={"/NewPost/Drafts"}>
        <div className='hover:opacity-50 border-1 border-slate-300 h-[100px] flex items-center rounded-xl mb-2'>
        <div className="flex justify-center items-center w-[100px] h-[100px] bg-slate-300 rounded-xl">
            <img className='h-[50px] opacity-50' src="./assets/file-earmark-plus.svg" alt="draft" />
        </div>
        <div className='p-5'>Drafts</div>
        </div>
        </Link>
    </div>
  )
}

export default Post