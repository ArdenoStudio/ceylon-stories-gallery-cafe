import Hero from '@/src/components/Hero';
import Story from '@/src/components/Story';
import WhatIsNew from '@/src/components/WhatIsNew';
import FeaturedDrinks from '@/src/components/FeaturedDrinks';
import Lounge from '@/src/components/Lounge';
import LivingStories from '@/src/components/LivingStories';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Story />
      <WhatIsNew />
      <FeaturedDrinks />
      <Lounge />
      <LivingStories />
    </>
  );
}
