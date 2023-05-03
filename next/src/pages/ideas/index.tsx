import React from 'react'
import IdeaCard from '@/components/IdeaCard'

type Props = {
    title: string,
    description: string,
    filter: string,
    people: any,
    desc : string,

};

const FilterPicker = (props : Props) =>{


  return(
    <div className='text-neutral-400 border border-neutral-400 w-fit px-3.5 py-1 rounded-full hover:cursor-pointer hover:scale-105 duration-300 hover:border-white hover:text-white'>
      <p className=' mb-0.5 text-base '>{props.filter}</p>
    </div>
  )
}


export default function Ideas() {
  return (
    <div className='py-20 mx-3 xl:mx-24'>
    <div className='flex justify-between'>
    <h1 className='text-5xl font-medium text-white font-primary'> Ideas</h1>
    
  </div>
  <div className='flex gap-2 justify-start mt-5'>

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


    {/* <FilterPicker filter="Sports" />
    <FilterPicker filter="Entertainment" />
    <FilterPicker filter="Politics" />
    <FilterPicker filter="Gaming" />
    <FilterPicker filter="DAOs" /> 
    <FilterPicker filter="Crypto" /> 
    <FilterPicker filter="NFTs" />  */}
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
