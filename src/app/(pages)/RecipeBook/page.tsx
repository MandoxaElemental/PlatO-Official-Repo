'use client'
import RecipeComponent from '@/app/Components/RecipeComponent'
import React from 'react'

const RecipeBook = () => {
  return (
    <div className='pt-10 px-5 w-full'>
      <div className='border-b-1 border-solid border-slate-300 p-2 text-2xl font-semibold text-center'>
            Recipe Book
        </div>
        <div className='pt-2 grid grid-cols-2 gap-3'>
        <RecipeComponent name='My Recipes'/></div>
    </div>
  )
}

export default RecipeBook