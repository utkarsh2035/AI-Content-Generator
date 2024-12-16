"use client"

import { FileClock, Home, Settings, WalletCards } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const SideNav = () => {

    const MenuList = [
        {
            id: 1,
            name: 'Home',
            icon: Home,
            path:'/dashboard'
        },

        {
            id:2,
            name: 'History',
            icon: FileClock,
            path:'/dashboard/history'
        },
        {
            id:3,
            name: 'Billing',
            icon: WalletCards,
            path:'/dashboard/billing'
        },
        {
            id:4,
            name: 'Setting',
            icon: Settings,
            path:'/dashboard/setting'
        },
    ]

    const path = usePathname()

    useEffect(()=>{
        console.log(path)
    },[])

  return (
    <div className='h-screen p-5 relative shadow-md border bg-white'>
      <div className='flex justify-center'>
        <Image src={'/logo.svg'} alt='logo' width={120} height={100}/>
      </div>

      <hr className='my-6 border'/>

      <div className='mt-3'>
        {MenuList.map((menu)=>(
            <div className={`flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white rounded-lg hover:cursor-pointer items-center' ${path === menu.path ? 'bg-primary text-white' : ''}`} key={menu.id}>
                <menu.icon className='h-6 w-6'/>
                <h2 className='text-lg' onClick={()=>window.location.href = menu.path}>{menu.name}</h2>
            </div>
        ))}
      </div>

      <div className='absolute bottom-10 left-0 w-full'>
        {/* <UsageTrack/> */}
      </div>
    </div>
  )
}

export default SideNav
