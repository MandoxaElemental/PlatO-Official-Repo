import React from 'react'

const RecipeComponent = ({name} : {name: string}) => {
  return (
    <div className='w-[300px] h-[300px] bg-red-500 flex items-end'>
        <div className="w-[300px] h-[75px] p-2 bg-[#FFFFFF80]">
            <h2>{name}</h2>
        </div>
    </div>
  )
}

export default RecipeComponent