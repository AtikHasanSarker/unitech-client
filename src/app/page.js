import HeroBanner from '@/components/homepage/Banner';
import ShopByCategory from '@/components/homepage/ShopByCategory';
import SpecialDeals from '@/components/homepage/SpecialDeals';
import React from 'react';

const page = () => {
  return (
    <div>
      <HeroBanner/>
      <ShopByCategory/>
      <SpecialDeals/>
    </div>
  );
};

export default page;