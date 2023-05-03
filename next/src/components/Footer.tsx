import React from 'react'
import {BsGithub} from 'react-icons/bs'
import { BsTwitter } from 'react-icons/bs'


export default function Footer() {
  return (
    
      <footer className="footer mt-20 p-10 bg-[#151515] border-t border-[#f8f8f860] rounded-3xl  text-neutral-content flex justify-evenly">
  <div>
  <img src="/CompanyLogo.svg" alt="IdeaSwap Logo" />

    <p className='text-white font-secondary' >Briding you to your future quicker and on-chain <br /> with the help of injective! </p>
  </div> 
  <div>
    <span className="footer-title">Connect Here</span> 
    <div className="grid grid-flow-col gap-4">
      <a><BsGithub fontSize={35}/></a> 
      <a><BsTwitter fontSize={35}/></a> 
      
    </div>
  </div>
</footer>
    
  )
}
