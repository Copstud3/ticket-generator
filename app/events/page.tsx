import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <section className='flex flex-col justify-center items-center mt-[80px] mx-6'>
        <h1 className='text-[30px] lg:text-[40px] font-bold font-roboto'>No events available now.</h1>
        <p className='text-[15px] lg:text-[20px] font-roboto'>You can check back later. In the meantime, go <Link href="/" className='text-[#24A0B5]' >Home</Link></p>
    </section>
  )
}

export default page
