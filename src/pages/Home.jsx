import React from 'react'
import HeroHome from '../components/HeroHome'
import TrendingHome from '../components/TrendingHome'

export default function Home() {
  return (
    <div className='py-20  '>
        <HeroHome />
        <TrendingHome />
    </div>
  )
}
