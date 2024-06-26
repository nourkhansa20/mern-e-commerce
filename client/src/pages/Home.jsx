import React, { Fragment, useState } from 'react'
import ProductSection from '../components/ProductSection/ProductSection'
import Carousel from '../moon-ui/Carousel'
import Services from '../components/Services/Services'
import TextOffer from '../components/TextOffer/TextOffer'
import BannerHome from '../components/BannersHome/BannerHome'
import Tab from '../moon-ui/Tab'
import CustomTab from '../components/CustomTab/CustomTab'
import { useQuery } from 'react-query'
import { fetchAllCategories } from '../api/categoryApi'
import ProductsContainer from '../components/ProductsContainer/ProductsContainer'
import { capitalizeFirstLetter } from '../helpers/wordhelper'
import SideFilter from '../moon-ui/SideFilter'

const Home = () => {
  const { data: categories, isLoading, isError, isFetching } = useQuery('categories', fetchAllCategories)

  const images = [
    "http://plaza.roadthemes.com/sneaker/pub/media/Plazathemes/bannerslider/images/b/a/banner7-11.jpg",
    "http://plaza.roadthemes.com/sneaker/pub/media/Plazathemes/bannerslider/images/b/a/banner7-13.jpg",
    "http://plaza.roadthemes.com/sneaker/pub/media/Plazathemes/bannerslider/images/b/a/banner7-12.jpg",
  ];

  if (isLoading) return <h1>lod</h1>

  return (
    <>
      <div className='h-[16ex] sm:h-[30ex] md:h-[40ex] lg:h-[50ex] xl:h-[70%] mb-7'>
        <Carousel images={images} autoPlay={true} />
      </div>

      <div className="md:py-4 p-2 md:px-28 flex flex-col gap-10">
        <Services />

        <BannerHome />

        <ProductSection section_name={categories[0]} />
        <ProductSection section_name={categories[1]} />

        <TextOffer>
          Today Offer: $20 OFF orders $300 or more with code
          <TextOffer.Highligth> “SNEAKER-002”</TextOffer.Highligth>
          + Free shipping on orders over $60!
          <TextOffer.Highligth> Offer Details</TextOffer.Highligth>
        </TextOffer>

        <ProductSection section_name={categories[2]} />

        <CustomTab
          saparator={'/'}
          content='Typi non habent claritatem insitam est usus legentis in qui facit eorum claritatem, investigationes demonstraverunt lectores legere me lius quod legunt saepius.'
        >
          <Tab.child title={capitalizeFirstLetter(categories[0])}><ProductsContainer category_name={categories[0]} limit={5} /></Tab.child>
          <Tab.child title={capitalizeFirstLetter(categories[3])}><ProductsContainer category_name={categories[3]} limit={5} /></Tab.child>
          <Tab.child title={capitalizeFirstLetter(categories[1])}><ProductsContainer category_name={categories[1]} limit={5} /></Tab.child>
        </CustomTab>
      </div>
    </>

  )
}

export default Home