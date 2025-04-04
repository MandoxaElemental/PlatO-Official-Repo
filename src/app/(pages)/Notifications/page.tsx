import NotificationComponent from '@/app/Components/NotificationComponent'
import React from 'react'

const Notifications = () => {
  return (
    <div className='pt-10 px-5 w-full'>
      <div className='border-b-1 border-solid border-slate-300 p-2 text-2xl font-semibold text-center'>
            Notifications
        </div>
        <div className=''>
            <NotificationComponent username='Test1' action='Liked your Post' actionIcon='./assets/heart-fill.svg' post='./assets/burger.png'/>
            <NotificationComponent username='Test2' action='Shared your Post' actionIcon='./assets/repeat.svg' post='./assets/burger.png'/>
            <NotificationComponent username='Test3' action='Commented on your Post' actionIcon='./assets/chat-left.svg' post='./assets/burger.png'/>
            <NotificationComponent username='Test4' action='Made Changes to their Recipe' actionIcon='./assets/pencil.svg' post='./assets/chocolate-cake.png'/>
        </div>
    </div>
  )
}

export default Notifications