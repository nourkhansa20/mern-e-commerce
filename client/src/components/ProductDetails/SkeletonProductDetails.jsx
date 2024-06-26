import React from 'react'

const SkeletonProductDetails = () => {
    return (
        <div className='flex flex-col lg:flex-row justify-center md:items-start items-center gap-7 w-full animate-pulse'>
            <div className='w-[39ex] sm:w-[65ex] md:w-[75ex] lg:w-[60ex] md:h-[70ex] h-[40ex] rounded-lg bg-slate-300  '></div>
            <div className='flex flex-col md:items-start items-center gap-4'>
                <div className='flex flex-col gap-4 items-center'>
                    <h2 className='bg-slate-300 w-[35ex] h-5  rounded-md '></h2>
                    <h2 className='bg-slate-300 w-[35ex] h-5  rounded-md '></h2>
                </div>
                <p className='bg-slate-300 w-32 h-10 rounded-md'></p>
                <div className='flex gap-6 text-gray-500'>
                    <p className=' font-semibold bg-slate-300 w-20 h-5 rounded-md' ></p>
                    <p className='font-bold bg-slate-300 w-24 h-5 rounded-md'></p>
                </div>
                <div className=' bg-slate-300 w-[35ex] rounded-md h-16'>
                </div>
                <div className='flex flex-col gap-4 items-start'>
                    <h2 className='bg-slate-300 sm:w-[85ex] w-[35ex] h-5 rounded-md '></h2>
                    <h2 className='bg-slate-300 sm:w-[85ex] w-[35ex] h-5 rounded-md '></h2>
                    <h2 className='bg-slate-300 sm:w-[85ex] w-[35ex] h-5 rounded-md '></h2>
                    <h2 className='bg-slate-300 sm:w-[70ex] w-[30ex] h-5 rounded-md '></h2>
                </div>
            </div>
        </div>
    )
}

export default SkeletonProductDetails