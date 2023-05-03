import React from 'react'
// import { Link } from 'react-router-dom'
import IdeaCard from './IdeaCard'

interface FilterPicker{
    filter: string,
    desc: string,
    description: string,

    
}

type Props = {
    title: string,
    description: string,
    filter: any,
    people: any,
    desc : string,

};

type people = {
    people: any
}

const FilterPicker = (props:Props) =>{


  return(
    <div className='text-neutral-400 border border-neutral-400 w-fit px-3.5 py-1 rounded-full hover:cursor-pointer hover:scale-105 duration-300 hover:border-white hover:text-white'>
      <p className=' mb-0.5 text-base '>{props.filter}</p>
    </div>
  )
}

export default function TrendingHome() {
  return (
    <div className='pt-24 xl:mx-28 mx-3'>
      <div className='flex justify-between'>
        <h1 className='text-5xl font-medium text-white font-primary'>Trending Ideas</h1>
        {/* <div className='flex items-center'><Link to='/ideas' className='text-sm hover:underline underline-offset-8 text-[#2CCCFF] font-primary'>View All</Link></div> */}
      </div>
      <div className='flex gap-2 justify-start mt-5'>
        {/* <FilterPicker filter="Sports" /> */}
        <div className='text-neutral-400 border border-neutral-400 w-fit px-3.5 py-1 rounded-full hover:cursor-pointer hover:scale-105 duration-300 hover:border-white hover:text-white'>
      <p className=' mb-0.5 text-base '>Sports</p>
    </div>
    <div className='text-neutral-400 border border-neutral-400 w-fit px-3.5 py-1 rounded-full hover:cursor-pointer hover:scale-105 duration-300 hover:border-white hover:text-white'>
      <p className=' mb-0.5 text-base '>Entertainment</p>
    </div>
    <div className='text-neutral-400 border border-neutral-400 w-fit px-3.5 py-1 rounded-full hover:cursor-pointer hover:scale-105 duration-300 hover:border-white hover:text-white'>
      <p className=' mb-0.5 text-base '>Politics</p>
    </div>
    <div className='text-neutral-400 border border-neutral-400 w-fit px-3.5 py-1 rounded-full hover:cursor-pointer hover:scale-105 duration-300 hover:border-white hover:text-white'>
      <p className=' mb-0.5 text-base '>Gaming</p>
    </div>
    <div className='text-neutral-400 border border-neutral-400 w-fit px-3.5 py-1 rounded-full hover:cursor-pointer hover:scale-105 duration-300 hover:border-white hover:text-white'>
      <p className=' mb-0.5 text-base '>DAOs</p>
    </div>
    <div className='text-neutral-400 border border-neutral-400 w-fit px-3.5 py-1 rounded-full hover:cursor-pointer hover:scale-105 duration-300 hover:border-white hover:text-white'>
      <p className=' mb-0.5 text-base '>Crypto</p>
    </div>
    <div className='text-neutral-400 border border-neutral-400 w-fit px-3.5 py-1 rounded-full hover:cursor-pointer hover:scale-105 duration-300 hover:border-white hover:text-white'>
      <p className=' mb-0.5 text-base '>NFTs</p>
    </div>        
      </div>
      <div className='grid xl:grid-cols-3 grid-cols-1 gap-8 mt-7'>
        <IdeaCard title="CSK Wins IPL" filter="Sports" people="23" desc="Some description as to why this particular scenario should happen..."  />
        <IdeaCard title="CSK Wins IPL" filter="Sports" people="23" desc="Some description as to why this particular scenario should happen..."  />
        <IdeaCard title="CSK Wins IPL" filter="Sports" people="23" desc="Some description as to why this particular scenario should happen..."  />
        <IdeaCard title="CSK Wins IPL" filter="Sports" people="23" desc="Some description as to why this particular scenario should happen..."  />
        <IdeaCard title="CSK Wins IPL" filter="Sports" people="23" desc="Some description as to why this particular scenario should happen..."  />
        <IdeaCard title="CSK Wins IPL" filter="Sports" people="23" desc="Some description as to why this particular scenario should happen..."  />
      </div>

    </div>
  )
}
