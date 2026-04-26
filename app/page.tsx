import Hero from '@/src/components/Hero';
import dynamic from 'next/dynamic';

const WhatIsNew = dynamic(() => import('@/src/components/WhatIsNew'));
const FeaturedDrinks = dynamic(() => import('@/src/components/FeaturedDrinks'));
const Lounge = dynamic(() => import('@/src/components/Lounge'));
const Story = dynamic(() => import('@/src/components/Story'));

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatIsNew />
      <FeaturedDrinks />
      <Lounge />
      <Story />
    </>
  );
}
