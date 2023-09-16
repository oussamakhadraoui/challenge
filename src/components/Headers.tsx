"use client"
import React from 'react'
import Layout from './Layout'
import { CgProfile } from 'react-icons/cg'
import { PiLink } from 'react-icons/pi'
import { AiOutlineEye } from 'react-icons/ai'

import Logo from './icons/Logo'
import { Button } from './ui/button'
import SimpleLogo from './icons/Simple-logo'
import { usePathname, useRouter } from 'next/navigation'

interface HeadersProps {}

const Headers = ({}: HeadersProps) => {
  const route = useRouter()
  const path= usePathname()

  return (
    <Layout>
      <div className='bg-white h-[72px] rounded-xl flex items-center justify-between'>
        <div className='ml-5'>
          <Logo className='hidden sm:flex' />
          <SimpleLogo className='sm:hidden' />
        </div>
        <div className=' flex flex-row shrink '>
          <Button
            className={`hover:bg-[#EFECFF] hover:text-[#5D40D0] mr-3 font-semibold text-md text-gray-500 ${
              path === '/link' && 'bg-[#EFECFF] text-[#5D40D0]'
            }`}
            variant='ghost'
            onClick={()=>route.push('/link')}
          >
            <div className='sm:mr-2'>
              <PiLink size='20' />
            </div>
            <div className='hidden sm:flex '>Links</div>
          </Button>
          <Button
            className={`hover:bg-[#EFECFF] hover:text-[#5D40D0] font-semibold text-md text-gray-500 ${
              path === '/' && 'bg-[#EFECFF] text-[#5D40D0]'
            }`}
            onClick={()=>route.push('/')}
            variant='ghost'
          >
            <div className='sm:mr-2'>
              <CgProfile size='20' />
            </div>
            <div className='hidden sm:flex'>Profile Details</div>
          </Button>
        </div>
        <div className='mr-5'>
          <Button
            className='border-[#5D40D0] text-[#5D40D0] hover:bg-[#5D40D0] hover:text-white font-semibold text-md'
            variant='outline'
          >
            <div className='sm:hidden'>
              <AiOutlineEye size={20} />
            </div>
            <div className='hidden sm:flex'>Preview</div>
          </Button>
        </div>
      </div>
    </Layout>
  )
}

export default Headers
