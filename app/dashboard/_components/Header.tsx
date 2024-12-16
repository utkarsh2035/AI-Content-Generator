import { UserButton } from '@clerk/nextjs'
import { Search } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <div className='p-5 shadow-sm border-b-2 flex justify-between items-center bg-white'>
      <div className='flex gap-2 items-center p-2 border rounded-md max-w-lg bg-white'>
        <Search className='text-primary'/>
        <input type="text" placeholder='search...' className='outline-none'/>
      </div>
      <div className='flex gap-5 items-center'>
        <h2 className='bg-primary p-1 rounded-full text-xs text-white px-10'> 🔥Join Membership just for $9.99/Month</h2>
        <UserButton/>
      </div>
    </div>
  )
}

export default Header
