'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import Image from 'next/image'
import React, { useState } from 'react'

const formSchema = z.object({
  email: z.string().email({
    message: 'Email must be correct.',
  }),
})

export default function ComingSoon() {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitted(true)
    console.log(values)
    toast('Thank you for subscribing to our newsletter!')
  }

  return (
    <div className='w-full flex items-center justify-center mt-12'>
      <div className='flex flex-col items-center justify-center px-11 py-7 rounded-[20px] gap-[52px]'>
        <p className='text-[28px] text-white font-semibold'>COMING SOON.....</p>

        <Image
          src='/assets/images/profile/soon.png'
          alt='Coming soon illustration'
          width={175}
          height={107}
        />

        <div className='flex flex-col gap-5 items-center'>
          <p className={`${isSubmitted ? 'hidden' : 'flex'} text-center text-xl text-[#E6E6E6]`}>
            Subscribe below to be notified of when it goes live
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={`${isSubmitted ? 'hidden' : ''} space-y-8 w-full border border-[#FFFFFF33] rounded-[500px] bg-[#FFFFFF0D]`}>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='relative'>
                    <FormControl>
                      <div className='relative'>
                        <Input placeholder='Your email address' {...field} />
                        <Button className='absolute top-[20%] right-[15px]' type='submit'>
                          Subscribe
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <p className='text-sm text-[#999999] text-center'>
            {isSubmitted
              ? 'Your response has been recorded, we will notify you when we go live'
              : 'Be among the special ones to get early notification when we launch'}
          </p>
        </div>
      </div>
    </div>
  )
}
