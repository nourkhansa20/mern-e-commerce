import React, { Fragment, useState } from 'react'
import ProductSection from '../components/ProductSection/ProductSection'
import Carousel from '../moon-ui/Carousel'
import Services from '../components/Services/Services'
import TextOffer from '../components/TextOffer/TextOffer'
import BannerHome from '../components/BannersHome/BannerHome'
import { useCategories } from '../hooks/useCategoryApi'
import Tab from '../moon-ui/Tab'
import CustomTab from '../components/CustomTab/CustomTab'
import { capitalizeFirstLetter } from '../helpers/wordhelper'
import ProductsContainer from '../components/ProductsContainer/ProductsContainer'

const Home = () => {
  const { data: categories, isLoading, isError, isFetching } = useCategories()

  const images = [
    "http://plaza.roadthemes.com/sneaker/pub/media/Plazathemes/bannerslider/images/b/a/banner7-11.jpg",
    "http://plaza.roadthemes.com/sneaker/pub/media/Plazathemes/bannerslider/images/b/a/banner7-13.jpg",
    "http://plaza.roadthemes.com/sneaker/pub/media/Plazathemes/bannerslider/images/b/a/banner7-12.jpg",
  ];

  if (isLoading) return <h1>Loading ...</h1>

  if (!categories) return <h1>NO category</h1>

  return (
    <>
      <div className='h-[16ex] sm:h-[30ex] md:h-[40ex] lg:h-[50ex] xl:h-[70%] mb-4'>
        <Carousel images={images} autoPlay={true} />
      </div>

      <div className="md:py-4 p-2 md:px-28 flex flex-col gap-10">
        <Services />

        <BannerHome />

        {
          categories.length > 0 (
            categories.map((category, index) => (
              <>
                {
                  index == 3 && (
                    <TextOffer key={index}>
                      Today Offer: $20 OFF orders $300 or more with code
                      <TextOffer.Highligth> “SNEAKER-002”</TextOffer.Highligth>
                      + Free shipping on orders over $60!
                      <TextOffer.Highligth> Offer Details</TextOffer.Highligth>
                    </TextOffer>)
                }

                <ProductSection category={category} />
              </>
            ))
          )
        }

        <ProductSection category={categories[1]} />

        {/* <CustomTab
          saparator={'/'}
          content='Typi non habent claritatem insitam est usus legentis in qui facit eorum claritatem, investigationes demonstraverunt lectores legere me lius quod legunt saepius.'
        >
        <Tab.child title={capitalizeFirstLetter('')}><ProductsContainer  limit={3} /></Tab.child>
        <Tab.child title={capitalizeFirstLetter('')}><ProductsContainer  limit={2} /></Tab.child>
        <Tab.child title={capitalizeFirstLetter('')}><ProductsContainer  limit={5} /></Tab.child>
        </CustomTab> */}

      </div>
    </>

  )
}

export default Home