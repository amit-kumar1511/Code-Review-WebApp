import React from 'react'
import { Slack } from 'lucide-react';
import { Sun } from 'lucide-react'; 
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";


const Navbar = () => {
  return (
    <>
    <div className="navbar flex iems-center justify-between px-10 h-[65px] bg-zinc-900 "style={{padding:"0px 20px"}}>
  <div className="logo flex items-center gap-[10px]">
      <Slack size={40} color='#9333ea'/>
      <span className='text-2xl fon-bold text-white ml-2'>Codeify</span>
  </div>
  <div className="icons flex items-center gap-[20px]">
  <i className='cursor-pointer transition-all hover:text-[#9333ea]'><Sun /></i>

  
  </div>
    </div>
    
    </>
  )
}

export default Navbar