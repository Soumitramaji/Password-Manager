import { useState, useEffect } from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">

        {/* Logo linking to home */}
        <div className="logo font-bold text-white text-2xl cursor-pointer" onClick={() => window.location.href = '/'}>
          <span className='text-green-700'>&lt;</span>
          Pass
          <span className='text-green-700'>OP/&gt;</span>
        </div>

        <div className="flex items-center gap-2">
          {/* GitHub button linking to profile */}
          <button
            onClick={() => window.open('https://github.com/YOUR_GITHUB_PROFILE', '_blank')}
            className='text-white bg-green-700 my-5 rounded-full flex justify-between items-center cursor-pointer ring-white ring-1'
          >
            <img className='invert p-1 w-10' src="icons/github.svg" alt="github logo" />
            <span className='font-bold px-2'>GitHub</span>
          </button>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
