import HeroBanner from '@/components/homepage/Banner';
import NewArrivals from '@/components/homepage/NewArrivals';
import SpecialDeals from '@/components/homepage/SpecialDeals';
import Newsletter from '@/components/homepage/Newsletter';
import ShopByCategory from '@/components/homepage/ShopByCategory';
import StudentDiscount from '@/components/homepage/StudentDiscount';
import WhyChooseUs from '@/components/homepage/WhyChooseUs';
import React from 'react';

const page = () => {
  
  return (
    <div>
      <HeroBanner/>
      <ShopByCategory/>
      <NewArrivals/>
      {/* <SpecialDeals/> */}
      <WhyChooseUs/>
      <StudentDiscount/>
      <Newsletter/>
    </div>
  );
};

export default page;  