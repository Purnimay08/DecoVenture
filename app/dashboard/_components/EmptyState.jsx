import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function EmptyState() {
  return (
    <div className='flex items-center justify-center mt-10 flex-col'>
        <Image src={'/placeholder.png'} width={200} height={200}/>
        <h2 className='font-medium text-lg text-gray-500'>Create new AI Interior Design for your Room </h2>
        <Link href='/dashboard/create-new'>
        <Button className="mt-10">+ Redesign Room</Button>
        </Link>
    </div>
  )
}

export default EmptyState