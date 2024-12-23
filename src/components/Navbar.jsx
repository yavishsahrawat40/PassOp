import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='bg-purple-700 flex justify-between items-center m-4 p-4 text-white '>
        <div className='logo font-bold'>
          <span className="text-blue-300">&lt;</span>
          Pass
          <span className='text-blue-300'>Op/&gt;</span>
        </div>
        <div className='list'>
          <button>
            <a href="https://github.com/yavishsahrawat40" target="_blank">
              <img className='w-8' src="/icons/github-mark-white.png" alt="github icon" />
            </a>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
