'use client'
import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import Image from 'next/image'
import Iphone from '../../public/apple-iphone-13-pro-2021-medium.png'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { Input } from './ui/input'
import { useAppDispatch, useAppSelector } from '@/hook/redux.hook'
import {
  setFirstName,
  setEmail,
  setLastName,
  setPicture,
} from '@/redux/reducer/Profile-slice'

interface EditProfileProps {}
export const formSchema = zod.object({
  FirstName: zod.string().min(1, { message: 'the user must have a name!' }),
  LastName: zod.string().min(1, { message: 'the user must have a name!' }),
  email: zod
    .string()
    .email()
    .min(1, { message: 'the server must have an image!' }),
})

const EditProfile = ({}: EditProfileProps) => {
  const dispatch = useAppDispatch()
  const FN = useAppSelector((state) => state.user.FirstName)
  const LN = useAppSelector((state) => state.user.LastName)
  const EM = useAppSelector((state) => state.user.email)
  const pic = useAppSelector((state) => state.user.Picture)
  const [selectedImage, setSelectedImage] = useState(pic)
  // const [selectedFile, setSelectedFile] = useState<File>()
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: 'all',
    defaultValues: {
      FirstName: '',
      LastName: '',
      email: '',
    },
  })
  const { errors } = form.formState
  useEffect(() => {
    form.setValue('LastName', LN)
    form.setValue('FirstName', FN)
    form.setValue('email', EM)
  }, [FN, EM, LN, form])
  useEffect(() => {
    dispatch(setFirstName(form.getValues('FirstName')))
  }, [dispatch, form.getValues('FirstName')])
  useEffect(() => {
    dispatch(setLastName(form.getValues('LastName')))
  }, [dispatch, form.getValues('LastName')])
  useEffect(() => {
    dispatch(setEmail(form.getValues('email')))
  }, [dispatch, form.getValues('email')])
  useEffect(() => {
    dispatch(setPicture(selectedImage))
  }, [dispatch, selectedImage])
 
  return (
    <Layout className='pt-6 h-[80vh]'>
      <div className='xl:grid xl:grid-cols-9 gap-5 w-full h-full'>
        <div className='col-span-4 bg-white rounded-xl'>
          <div className=' w-full h-full flex justify-center items-center pt-5'>
            <Image className='' src={Iphone} width={300} alt='' />
            <div className='absolute flex flex-col items-center justify-center'>
              {selectedImage && (
                <div className=''>
                  <Image
                    className='rounded-full border-[5px] border-[#613DF5]'
                    src={selectedImage}
                    width={100}
                    height={100}
                    alt=''
                  />
                </div>
              )}
              <p className='font-semibold text-xl'>
                {form.watch('FirstName')} {form.watch('LastName')}
              </p>
              {!errors?.email && (
                <p className='text-gray-500'>{form.watch('email')}</p>
              )}
            </div>
          </div>
        </div>
        <div className='col-span-5 bg-white rounded-xl p-11'>
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-3'>
              <h1 className='text-3xl font-bold'>Profile Details</h1>
              <p className='text-gray-500 text-lg'>
                Add your details to create a personal touch to your profile.
              </p>
            </div>
            <div className='flex gap-3 flex-col md:grid md:grid-cols-3 bg-[#FAFAFA] rounded-xl p-4 items-center justify-center'>
              <div className='col-span-1 text-gray-500'>Profile Picture</div>
              {/* ///////////////////////////// */}
              <div className='col-span-1'>
                <div className='max-w-4xl mx-auto space-y-6'>
                  <label>
                    <input
                      type='file'
                      hidden
                      onChange={({ target }) => {
                        if (target.files) {
                          const file = target.files[0]
                          setSelectedImage(URL.createObjectURL(file))
                        }
                      }}
                    />
                    <div className='w-40 aspect-video rounded flex items-center justify-center cursor-pointer'>
                      {selectedImage ? (
                        <div className='flex justify-center items-center'>
                          <p className='absolute z-10 text-white font-bold'>
                            Change Image
                          </p>
                          <Image
                            src={selectedImage}
                            className='flex shrink'
                            width={160}
                            height={160}
                            alt=''
                          />
                        </div>
                      ) : (
                        <span>Select Image</span>
                      )}
                    </div>
                  </label>
                </div>
              </div>
              <div className='col-span-1 text-xs text-gray-500 shrink'>
                <p>Image must be below 1024*1024px.</p>
                <p>Use PNG, JPG, or BMP format.</p>
              </div>
            </div>
            <div className='bg-[#FAFAFA] rounded-xl h-full p-4 '>
              <Form {...form}>
                <form

                  className='w-full flex gap-3 flex-col '
                >
                  <FormField
                    control={form.control}
                    name='FirstName'
                    render={({ field }) => (
                      <FormItem className='flex items-center justify-between w-full'>
                        <FormLabel className='text-gray-500'>
                          First name*
                        </FormLabel>
                        <FormControl className='flex items-end justify-end'>
                          <Input
                            className={`border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 ${
                              errors?.FirstName && 'bg-red-300'
                            }`}
                            placeholder='enter your first Name'
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='LastName'
                    render={({ field }) => (
                      <FormItem className='flex items-center justify-between w-full'>
                        <FormLabel className='text-gray-500'>
                          Last name*
                        </FormLabel>
                        <FormControl className='flex justify-end items-end'>
                          <Input
                            className={`border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 ${
                              errors?.LastName && 'bg-red-300'
                            }`}
                            placeholder='enter your last Name'
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem className='flex items-center justify-between w-full'>
                        <FormLabel className='text-gray-500'>Email</FormLabel>
                        <FormControl>
                          <Input
                            className={`border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 ${
                              errors?.email && 'bg-red-300'
                            }`}
                            type='email'
                            placeholder='enter your email'
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default EditProfile
