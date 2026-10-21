import HeroBanner from '@/components/homepage/Banner';
import NewArrivals from '@/components/homepage/NewArrivals';
import Newsletter from '@/components/homepage/Newsletter';
import ShopByCategory from '@/components/homepage/ShopByCategory';
import SpecialDeals from '@/components/homepage/SpecialDeals';
import StudentDiscount from '@/components/homepage/StudentDiscount';
import WhyChooseUs from '@/components/homepage/WhyChooseUs';
import React from 'react';

const page = () => {
  return (
    <div>
      <HeroBanner/>
      <ShopByCategory/>
      <SpecialDeals/>
      <NewArrivals/>
      <WhyChooseUs/>
      <StudentDiscount/>
      <Newsletter/>
    </div>
  );
};

export default page;  