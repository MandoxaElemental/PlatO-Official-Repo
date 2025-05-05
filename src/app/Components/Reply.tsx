import Image from 'next/image'
import React from 'react'

const Reply = ({username, date, comment} : {username: string; date: string; comment: string;}) => {
  return (
    <div className='text-left border-b-1 border-solid border-slate-300 pt-2'>
        <div className='pl-10 flex'>
            <div className='rounded-full bg-green-500 w-10 h-10 flex justify-center items-center'><Image width={50} height={50} className='' src="../assets/person.svg" alt="profilePic" /></div>
            <div className='pl-4'><p>{username} - {date}</p>
            <p>{comment}</p>
            </div>
        </div>
        <div className='flex justify-between py-2 px-5'>
        <div className="flex items-center">
            <Image width={50} height={50} className="h-4 w-4" src="../assets/heart.svg" alt="like" /><p className="pl-2">Like</p>
        </div>
        <div className="flex items-center">
            <Image width={50} height={50} className="h-4 w-4" src="../assets/chat-left.svg" alt="comment" /><p className="pl-2">Reply</p>
        </div>
        <div className="flex items-center">
            <Image width={50} height={50} className="h-4 w-4" src="../assets/repeat.svg" alt="share" /><p className="pl-2">Share</p>
        </div>
        </div>
    </div>
  )
}

export default Reply