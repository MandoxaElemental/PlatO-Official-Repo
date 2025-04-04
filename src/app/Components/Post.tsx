import { Button } from 'flowbite-react'
import React from 'react'

const Post = ({post} : {post: React.ReactNode}) => {
  return (
    <div className='text-center max-w-[500px] border-t-1 border-solid border-slate-300'>
        <div className='flex justify-between items-center py-2 px-5'>
            <div className='flex items-center'>
            <div className='rounded-full bg-green-500 w-10 h-10 flex justify-center items-center'><img className='' src="./assets/person.svg" alt="profilePic" /></div> <p className='pl-3'>UserName</p>
            </div>
            <Button className="rounded-full">Follow</Button>
        </div>
        {post}
        <div className='flex justify-evenly p-2 pt-5'>
        <div className="flex items-center">
            <img className="h-5 w-5" src="./assets/heart.svg" alt="like" /><p className="pl-2">Like</p>
        </div>
        <div className="flex items-center">
            <img className="h-5 w-5" src="./assets/chat-left.svg" alt="comment" /><p className="pl-2">Comment</p>
        </div>
        <div className="flex items-center">
            <img className="h-5 w-5" src="./assets/repeat.svg" alt="share" /><p className="pl-2">Share</p>
        </div>
        </div>
    </div>
  )
}

export default Post