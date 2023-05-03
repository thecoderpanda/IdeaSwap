// import React from "react";
// import ConnectWallet from "./ConnectWallet";

// type Props = {};

// const Navbar = (props: Props) => {
//   return (
//     <div className='bg-gray-100'>
//       <div className='container mx-auto flex justify-between items-center p-2'>
//         <h1>Counter Example</h1>
//         <ConnectWallet />
//       </div>
//     </div>
//   );
// };

// export default Navbar;


import React from 'react'
import {BsGithub} from 'react-icons/bs'
import { BsTwitter } from 'react-icons/bs'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div className='flex justify-between xl:px-20 border-b border-[#f8f8f860] rounded-3xl py-3 '>
        
        <div>
            <img src="/CompanyLogo.svg" alt="IdeaSwap Logo" />
        </div>
        <div className='flex justify-center items-center font-primary font-medium text-white gap-12 mt-2 tracking-wider'>
            <Link href="/"  >HOME</Link>
            <Link href="/ideas" >IDEAS</Link>
        </div>
        <div className='flex text-white  justify-center items-center gap-12'>
            <BsGithub fontSize={40} className='hover:text-sky-500' />
            <BsTwitter fontSize={40} className='hover:text-sky-500' />
        </div>
    </div>
  )
}

