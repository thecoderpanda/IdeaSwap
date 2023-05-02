import React from 'react'
import {BsPeopleFill} from 'react-icons/bs'

const FilterPicker = (props) =>{

    return(
      <div className='text-neutral-400 border border-neutral-400 w-fit px-2.5 py-0.5 rounded-full hover:cursor-pointer hover:scale-105 duration-300 hover:border-emerald-500 hover:text-emerald-500'>
        <p className=' mb-0.5 text-sm '>{props.filter}</p>
      </div>
    )
}

const IdeaCount = (props) =>{

    return(
        <div className='text-neutral-400 border border-neutral-400 w-fit px-2.5 py-0.5 rounded-full hover:cursor-pointer hover:scale-105 duration-300 hover:border-emerald-500 hover:text-emerald-500 flex justify-center gap-2 items-center'>
            <BsPeopleFill fontSize={20} />
            <p className='text-xs'>{props.people}</p>
        </div>
    )
}


export default function IdeaCard(props) {
  return (
    <div className='font-primary border p-5 rounded-3xl hover:shadow-md hover:shadow-emerald-400 duration-300 '>
        <div>
            <h1 className='text-3xl text-white '>{props.title}</h1>
        </div>
        <div className='flex justify-between my-3'>
           <div> <FilterPicker filter={props.filter} /> </div>
           <div><IdeaCount people={props.people} /> </div>
        </div>
        <div>
            <p className='font-secondary text-neutral-400'>{props.desc}</p>
        </div>
        <div className='mt-3'>
            <button className='btn w-full rounded-3xl py-2 hover:bg-[#68ff89d6] bg-[#68ff89d6]  text-[#151515]' >BET NOW</button>
        </div>

    </div>
  )
}
