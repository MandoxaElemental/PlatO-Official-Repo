import Image from 'next/image'
import React from 'react'

const NotificationComponent = ({username, action, actionIcon, post} : {username: string, action: string, actionIcon: string, post: string}) => {
  return (
    <div className='flex w-[600px] justify-between py-2 border-b-1 border-b-slate-300 border-solid'>
        <div className='flex'>
        <div className='rounded-full bg-slate-500 w-10 h-10 flex justify-center items-center'><Image className='' src="/assets/person.svg" alt="profilePic"  width={100} height={100}/></div>
        <div>
        <p className='pl-3 font-semibold'>{username}</p>
        <p className='pl-3'>{action}</p>
        </div>
        </div>
        <div className='flex items-center justify-center'>
            <Image className='h-8 pr-3' src={actionIcon} alt="icon" width={100} height={100}/>
            <Image className="h-[50px] w-[50px] object-cover" src={post} alt="post"  width={100} height={100}/>
        </div>
    </div>
  )
}

export default NotificationComponent