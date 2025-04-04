import { Button } from 'flowbite-react'
import Link from 'next/link'
import React from 'react'

const RecipePost = () => {
  return (
    <div className='text-center max-w-[500px] pt-10'>
        <div className='flex justify-between items-center pb-2 px-5'>
            <div className='flex items-center'>
            <div className='rounded-full bg-yellow-500 w-10 h-10 flex justify-center items-center'><img className='' src="./assets/person.svg" alt="profilePic" /></div> <p className='pl-3'>UserName</p>
            </div>
            <Button className="rounded-full">Follow</Button>
        </div>
        <div className='font-semibold text-2xl pb-2'>- Recipe -</div>
        <img className='object-cover h-[150px] w-full' src="./assets/chocolate-cake.png" alt="post" />
        <p className='font-semibold text-2xl p-2'>Moist Chocolate Cake</p>
        <div className='flex items-center justify-center'>
            <img className='h-8 w-8 px-1' src="./assets/star.svg" alt="star" />
            <img className='h-8 w-8 px-1' src="./assets/star.svg" alt="star" />
            <img className='h-8 w-8 px-1' src="./assets/star.svg" alt="star" />
            <img className='h-8 w-8 px-1' src="./assets/star.svg" alt="star" />
            <img className='h-8 w-8 px-1' src="./assets/star.svg" alt="star" />
        </div>
        <div className='p-2 text-left'>Indulge in the rich, velvety goodness of our homemade chocolate cake recipe, perfect for any occasion. This delightful treat features layers of moist chocolate sponge, complemented by a luscious chocolate frosting that melts in your mouth.</div>
        <Link className='text-blue-600 text-xl underline pb-2' href={"#"}>Read Full Recipe</Link>
        <div className='flex justify-evenly p-2'>
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

export default RecipePost