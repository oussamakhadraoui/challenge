import Image from 'next/image'
import React from 'react'
import Iphone from '../../public/apple-iphone-13-pro-2021-medium.png'
import { useAppSelector } from '@/hook/redux.hook'
import { Button } from './ui/button'
import { TbBrandGithubFilled } from 'react-icons/tb'
import { AiFillYoutube } from 'react-icons/ai'
import { AiFillLinkedin } from 'react-icons/ai'
import { link } from 'fs'
interface phone {
  links?: { link: string; type: string }[]
}
const Phone = ({ links }: phone) => {
  const FirstName = useAppSelector((state) => state.user.FirstName)
  const Picture = useAppSelector((state) => state.user.Picture)
  const LastName = useAppSelector((state) => state.user.LastName)
  const Email = useAppSelector((state) => state.user.email)
  return (
    <div className='col-span-4 bg-white rounded-xl'>
      <div className=' w-full h-full flex justify-center items-center pt-5'>
        <Image className='' src={Iphone} width={300} alt='' />
        <div className='absolute flex flex-col items-center justify-center'>
          {Picture && (
            <div className=''>
              <Image
                className='rounded-full border-[5px] border-[#613DF5]'
                src={Picture}
                width={100}
                height={100}
                alt=''
              />
            </div>
          )}
          <p className='font-semibold text-xl'>
            {FirstName} {LastName}
          </p>
          <p className='text-gray-500'>{Email}</p>
          {links?.map((linko, i) => {
            return (
              <div key={i} className='w-full mt-4'>
                <Button
                  className={`w-full
                    ${linko.type === 'youtube' && 'bg-red-700'}
                    ${linko.type === 'github' && 'bg-black'}
                    ${linko.type === 'linkedin' && 'bg-blue-800'}
                    
                    `}
                >
                  {linko.type === 'youtube' && (
                    <span className='ml-3'>
                      <AiFillYoutube />
                    </span>
                  )}
                  {linko.type === 'github' && <TbBrandGithubFilled />}
                  {linko.type === 'linkedin' && <AiFillLinkedin />}
                  {linko.type} 
                </Button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Phone
