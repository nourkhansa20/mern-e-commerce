import React from 'react'
import StarRating from '../../moon-ui/StarRating'

const SkeletonItemCard = () => {
    return (
        <div className='group w-48 sm:w-48 lg:w-80 p-3 h-fit rounded-md group relative hover:border-gray-200 border-[0.3ex] border-white duration-500 transition-all animate-pulse'>
            <div className='flex flex-col gap-3'>
                <div className='lg:h-[40ex] h-[25ex] bg-slate-300 rounded-sm' />
                <StarRating defaultRating={5} starClassName='size-4 fill-slate-300' />
                <hr />
                <h2 className='bg-slate-300 h-4 w-4/5'></h2>
                <div />
                <h2 className='bg-slate-300 h-4 w-1/4'></h2>
            </div>
        </div>
    )
}

export default SkeletonItemCard