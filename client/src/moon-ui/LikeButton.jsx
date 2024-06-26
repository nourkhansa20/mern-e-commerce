import React, { useState } from 'react'
import OutlineLikeIcon from './icons/OutlineLikeIcon'
import FillLikeIcon from './icons/FillLikeIcon'

const LikeButton = ({ isLiked = false, className, onLike = () => { } }) => {
    const [isLike, setIsLike] = useState(isLiked)

    const like = () => {
        onLike(isLike)
        setIsLike(prev => !prev)
    }

    return (
        <div className={`${className} cursor-pointer`} onClick={like}>
            {
                isLike ? (
                    <FillLikeIcon className={`fill-red-500`} />
                ) : (
                    <OutlineLikeIcon />
                )
            }
        </div >
    )
}

export default LikeButton