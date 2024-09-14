import React from 'react'
import { Link } from 'react-router-dom'

export default function PostCard(props) {
  return (
    <Link className='border-2 border-purple-400 rounded-md w-[300px] h-[400px] shadow-post-card shadow-purple-300 hover:shadow-post-card-hover hover:shadow-purple-300 cursor-pointer overflow-hidden' to={`/post/${props.id}`}>
        <img src={props.img} alt="img" className='w-full h-[200px] object-cover object-center object'/>
        <h2 className='text-xl font-medium px-3 mt-2 line-clamp-5'>{props.title}</h2>
        <p className='text-gray-500 italic px-3 mt-2'>{props.category}</p>
    </Link>
  )
}
