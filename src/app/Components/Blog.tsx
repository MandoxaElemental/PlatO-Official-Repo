import { Button, Popover, TextInput } from 'flowbite-react'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const BlogPost = ({post, username, id, comments} : {post: React.ReactNode; username: string; id: string, comments: React.ReactNode;}) => {
  return (
    <div className='text-center max-w-[500px] border-t-1 border-solid border-slate-300'>
        <div className='flex justify-between items-center py-2 px-5'>
            <div className='flex items-center'>
            <div className='rounded-full bg-green-500 w-10 h-10 flex justify-center items-center'><img className='' src="../assets/person.svg" alt="profilePic" /></div> <Link href={`/Profile/${username}`} className='pl-3 cursor-pointer'>{username}</Link>
            </div>
            {username === localStorage.getItem("Username") ? 
            <div className='pl-5 grid grid-cols-2 gap-3'>
                <Image className='h-5 w-5' src="../assets/bookmark.svg" alt="edit" width={100} height={100}/> 
                <Popover
                trigger="click"
                content={
                <div className='p-2'>
                <Link href={`/Edit/${id}`}>
                    <div className='flex items-center'>
                    <Image className='h-4 w-4' src="../assets/pencil.svg" alt="edit" width={100} height={100}/> 
                    <p className='pl-2'>
                        Edit Post
                    </p>
                    </div>
                </Link>
                <div className='flex items-center font-semibold text-red-600'>
                    <Image className='h-4 w-4' src="../assets/trash.svg" alt="edit" width={100} height={100}/>
                    <p className='pl-2'>
                        Delete Post
                    </p>
                    </div>
                </div>
                }
            >
        <Image className='h-5 w-5 cursor-pointer' src="../assets/three-dots-vertical.svg" alt="edit" width={100} height={100}/> 
      </Popover>{" "}
                </div>
            : <Button className="rounded-full h-8 bg-blue-200 hover:bg-blue-400 text-black cursor-pointer dark:bg-blue-100 dark:hover:bg-blue-200">Follow</Button>
            }
        </div>
        <div className='border-t-1 border-solid border-slate-300'>
        {post}
        </div>
        <div className='flex justify-evenly p-2 pt-5 border-t-1 border-solid border-slate-300'>
        <div className="flex items-center">
            <img className="h-5 w-5" src="../assets/heart.svg" alt="like" /><p className="pl-2">Like</p>
        </div>
        <div className="flex items-center">
            <img className="h-5 w-5" src="../assets/chat-left.svg" alt="comment" /><p className="pl-2">Comment</p>
        </div>
        <div className="flex items-center">
            <img className="h-5 w-5" src="../assets/repeat.svg" alt="share" /><p className="pl-2">Share</p>
        </div>
        </div>
            {comments}
    </div>
  )
}

export default BlogPost