import React from 'react';
import BannerImage from './BannerImage';

const BannerHome = () => {

    const banners = [
        {
            img: 'http://plaza.roadthemes.com/sneaker/pub/media/wysiwyg/home1-banner1-1.jpg',
            to: ''
        },
        {
            img: 'http://plaza.roadthemes.com/sneaker/pub/media/wysiwyg/home1-banner1-3.jpg',
            to: ''
        },
        {
            img: 'http://plaza.roadthemes.com/sneaker/pub/media/wysiwyg/home1-banner1-2.jpg',
            to: ''
        },
        {
            img: 'http://plaza.roadthemes.com/sneaker/pub/media/wysiwyg/home1-banner1-4.jpg',
            to: ''
        },
        {
            img: 'http://plaza.roadthemes.com/sneaker/pub/media/wysiwyg/home1-banner1-5.jpg',
            to: ''
        },
    ]

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {
                banners.map((banner, index) => (
                    <BannerImage key={index} banner={banner} className={`${index == 1 ? 'md:row-span-2 row-span-1' : ''}`} />
                ))
            }
        </div>
    );
}

export default BannerHome;
