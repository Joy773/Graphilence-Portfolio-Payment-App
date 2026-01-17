import React from 'react'
import Navbar from '@/Components/Navbar'
import Footer from '@/Components/Footer'

const Page = () => {
  return (
    <div className='px-10 lg:px-20'>   
        <Navbar />
        <div className='mt-20 mb-4 w-full  h-full'>
            <h1 className='text-4xl font-bold text-zinc-300 text-center'>Your blogs will be here</h1>
        </div>
        <Footer />
    </div>
  )
};

export default Page;    