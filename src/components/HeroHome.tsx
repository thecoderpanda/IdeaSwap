import React from 'react'
import HeroHomeBG from '../images/HeroHomeBG.svg'
import HeroHomeArt from '../images/HeroHomeArt.svg'
import Image from 'next/image'

export default function HeroHome() {
  return (
    <div className='flex pt-20 h-full'>
        <div className='font-primary relative  basis-2/3   justify-center  flex flex-col xl:ml-28 gap-10'>
            <div className='z-10  xl:ml-20'>
                <h1 className='font-medium text-8xl text-white'>
                    BET ON YOUR <br /><span className='underline underline-offset-8 tracking-widest text-9xl'>FUTURE!</span>
                </h1>
            </div>
            <div className=' flex-col flex gap-5 z-10 xl:ml-20'>
                <p className='w-2/3 text-neutral-400 text-xl font-secondary'>IdeaSwap helps you bring profits from possibilities and future. Simply mention your opinion and let others bet on your idea. Being smart finally pays! </p>
                <h3 className='text-5xl text-white '>Built on Injective.</h3>
            </div>
            <div className='z-10 xl:ml-20'>
                <button className='bg-[#1EC9FF] px-24 btn rounded-xl text-[#151515] text-3xl hover:bg-sky-400'>Register Your Idea</button>
            </div>
            <div className='absolute  top-4 -left-28 '>
                <Image src={HeroHomeBG} alt="IdeaSwap" />
            </div>
        </div>
        <div className='basis-1/3 '>
            <Image src={HeroHomeArt} alt="Built on injective" />
        </div>
    </div>
  )
}
