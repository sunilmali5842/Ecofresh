import React from 'react'
import Hero from './banner/Hero'
import AboutUs from './home/AboutUs'
import HomepageCategories from './categories/HomepageCategories'
import BlogList from './blogs/BlogList'
import WhyChooseUs from './home/WhyChooseUs'
import TopRatedProducts from './products/TopRatedProducts'
import Testimonials from './home/TestimonialSection'

export default function Home() {
  return (
    <div>
      <Hero />
      <WhyChooseUs />
      <TopRatedProducts />
       <AboutUs />
      <HomepageCategories />
      <Testimonials />
      
      <BlogList limit="3" showPagination={false} />
      
    </div>
  )
}
