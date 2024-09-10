import React from 'react'

export default function DashboardPostCard (props) {
  return (
    <div className='w-full border-2 md:border-pink-100 border-gray-500 h-32 md:h-28 flex flex-col md:flex-row md:items-center md:mb-2 mb-4 rounded-md'>
        <div className='md:w-[70%] h-[80%]  md:h-full flex gap-3 pl-3 items-center md:border-2 md:border-purple-100'>
            <img src={props.image} alt="Image" className='w-28'/>
            <div className='overflow-clip'>{props.title}</div>
        </div>
        <div className='md:w-[30%] md:h-full flex items-center justify-evenly md:border-2 border-purple-100 border-t-2'>
            <div className='text-gray-600 text-sm hidden md:block'>{props.category}</div>
            <div className='text-gray-600 text-sm md:hidden '>Category: {props.category}</div>
            <button className='text-red-500 text-sm cursor-pointer underline'>Delete</button>
            <button className='text-green-600 text-sm cursor-pointer underline'>Edit</button>
        </div>
    </div>
  )
}
