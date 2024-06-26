import React from 'react'
import Service from './Service'

const Services = () => {
    const services = [
        {
            src: 'http://plaza.roadthemes.com/sneaker/pub/media/wysiwyg/policy-icon1.png',
            title: 'Free Delivery',
            desc: "Free shipping on all order"
        },
        {
            src: 'http://plaza.roadthemes.com/sneaker/pub/media/wysiwyg/policy-icon2.png',
            title: 'Online Support 24/7',
            desc: "Support online 24 hours a day"
        },
        {
            src: 'http://plaza.roadthemes.com/sneaker/pub/media/wysiwyg/policy-icon3.png',
            title: 'Money Return',
            desc: "Back guarantee under 7 days"
        },
        {
            src: 'http://plaza.roadthemes.com/sneaker/pub/media/wysiwyg/policy-icon4.png',
            title: 'Member Discount',
            desc: "Onevery order over $120.00"
        },
        {
            src: 'http://plaza.roadthemes.com/sneaker/pub/media/wysiwyg/policy-icon5.png',
            title: 'Secure Payment',
            desc: "All cards accepted"
        }
    ]
    return (
        <div className='p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 border'>
            {
                services.map((service, index) => (
                    <Service key={index} src={service.src} title={service.title} desc={service.desc} />
                ))
            }
        </div>
    )
}

export default Services