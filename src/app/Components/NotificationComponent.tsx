import React from 'react'

const NotificationComponent = ({username, action, actionIcon, post} : {username: string, action: string, actionIcon: string, post: string}) => {
  return (
    <div className='flex w-[600px] justify-between py-2 border-b-1 border-b-slate-300 border-solid'>
        <div className='flex'>
        <div className='rounded-full bg-slate-500 w-10 h-10 flex justify-center items-center'><img className='' src="./assets/person.svg" alt="profilePic" /></div>
        <div>
        <p className='pl-3 font-semibold'>{username}</p>
        <p className='pl-3'>{action}</p>
        </div>
        </div>
        <div className='flex items-center justify-center'>
            <img className='h-8 pr-3' src={actionIcon} alt="icon"/>
            <img className="h-[50px] w-[50px] object-cover" src={post} alt="post" />
        </div>
    </div>
  )
}

export default NotificationComponent