import HeroBanner from '@/components/homepage/Banner';
import ShopByCategory from '@/components/homepage/ShopByCategory';
import React from 'react';

const page = () => {
  return (
    <div>
      <HeroBanner/>
      <ShopByCategory/>
    </div>
  );
};

export default page;