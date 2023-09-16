'use client'
import Layout from '@/components/Layout'
import Phone from '@/components/Phone'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { HiMenuAlt4 } from 'react-icons/hi'
import { TbBrandGithubFilled } from 'react-icons/tb'
import { AiFillYoutube } from 'react-icons/ai'
import { AiFillLinkedin } from 'react-icons/ai'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFieldArray } from 'react-hook-form'
import * as z from 'zod'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useAppDispatch, useAppSelector } from '@/hook/redux.hook'
import { setLinks } from '@/redux/reducer/Profile-slice'
import { useApplicationForm } from '@/hook/links-platform'
import { Textarea } from '@/components/ui/textarea'
interface pageProps {
  profileLink: { type: string; link: string }
}
// ;'youtube' | 'linkedin' | 'github' | ''

const Page = ({ profileLink }: pageProps) => {
  const Links = useAppSelector((state) => state.user.Links)

  const dispatch = useAppDispatch()
  const [val, setVal] = useState<(typeof profileLink)[]>([])
  const [valuesRedux, setvaluesRedux] = useState<(typeof profileLink)[]>([])
  const handleClick = () => {
    setVal([...val, { link: '', type: '' }])
  }
  const form = useApplicationForm()

  const handleDelete = (i: number) => {
    const deleteVal = [...val]
    deleteVal.splice(i, 1)
    setVal(deleteVal)
  }
  const onClick = () => {
    dispatch(setLinks(val))
  }
  console.log(form.getValues('experience'))
  return (
    <Layout className='pt-6 h-[80vh]'>
      <div className='xl:grid xl:grid-cols-9 gap-5 w-full h-full'>
        <Phone links={form.getValues('experience')} />
        <div className='col-span-5 bg-white rounded-xl p-11'>
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-3'>
              <h1 className='text-3xl font-bold'>Customize your links</h1>
              <p className='text-gray-500 text-lg'>
                Add/edit/remove links below and then share your profiles with
                the world!
              </p>
            </div>
            <div className='flex gap-3 flex-col w-full rounded-xl mt-5 items-center justify-center'>
              <Button
                className='border-[#633BFE] w-full text-[#633BFE] hover:text-white hover:bg-[#633BFE]'
                variant='outline'
                onClick={() => handleClick()}
              >
                + Add new link
              </Button>
            </div>
            <div className='bg-white rounded-xl h-full flex flex-col  gap-6'>
              {val.map((val, i) => (
                <div
                  key={i}
                  className='flex p-4 flex-col rounded-xl h-full bg-[#FAFAFA]'
                >
                  <div className='flex justify-between'>
                    <Button className='p-0 m-0' variant='ghost'>
                      <HiMenuAlt4 />
                      Link#{i + 1}
                    </Button>
                    <Button
                      variant='ghost'
                      className='text-gray-500'
                      onClick={() => handleDelete(i)}
                    >
                      Remove
                    </Button>
                  </div>
                  <div>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onClick)}
                        className='w-full space-y-2'
                      >
                        <FormField
                          control={form.control}
                          name={`experience.${i}.type`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className='text-gray-500'>
                                Platform
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue
                                      className='text-gray-500'
                                      placeholder='Select a platform type'
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value='youtube'>
                                    <div className='flex w-full items-center justify-end'>
                                      <div className='text-gray-500'>
                                        <AiFillYoutube />
                                      </div>
                                      <div className='pl-2'>youtube</div>
                                    </div>
                                  </SelectItem>
                                  <SelectItem value='github'>
                                    <div className='flex w-full items-center justify-end'>
                                      <div className='text-gray-500'>
                                        <TbBrandGithubFilled />
                                      </div>
                                      <div className='pl-2'>github</div>
                                    </div>
                                  </SelectItem>
                                  <SelectItem value='linkedin'>
                                    <div className='flex w-full items-center justify-end'>
                                      <div className='text-gray-500'>
                                        <AiFillLinkedin />
                                      </div>
                                      <div className='pl-2'>linkedin</div>
                                    </div>
                                  </SelectItem>
                                </SelectContent>
                              </Select>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`experience.${i}.link`}
                          render={({ field }) => (
                            <FormItem className='flex flex-col w-full'>
                              <FormLabel className='text-gray-500'>
                                Link
                              </FormLabel>
                              <FormControl className='flex items-end justify-end'>
                                <Textarea
                                  placeholder='enter your link'
                                  className='resize-none'
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Page
