import React from 'react'
import { NavLink } from 'react-router-dom'
import {BsGithub} from 'react-icons/bs'
import { BsTwitter } from 'react-icons/bs'

export default function Navbar() {
  return (
    <div className='flex justify-between xl:px-20 border-b border-[#f8f8f860] rounded-3xl py-3 '>
        
        <div>
            <img src="/CompanyLogo.svg" alt="IdeaSwap Logo" />
        </div>
        <div className='flex justify-center items-center font-primary font-medium text-white gap-12 mt-2 tracking-wider'>
            <NavLink to="/" className={({ isActive }) => (isActive ? "underline underline-offset-4" : "")} >HOME</NavLink>
            <NavLink to="/ideas" className={({ isActive }) => (isActive ? "underline underline-offset-4" : "")}>IDEAS</NavLink>
        </div>
        <div className='flex text-white  justify-center items-center gap-12'>
            <BsGithub fontSize={40} className='hover:text-sky-500' />
            <BsTwitter fontSize={40} className='hover:text-sky-500' />
        </div>
    </div>
  )
}
