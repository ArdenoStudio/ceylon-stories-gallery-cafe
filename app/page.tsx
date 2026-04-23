import Hero from '@/src/components/Hero';
import Story from '@/src/components/Story';
import WhatIsNew from '@/src/components/WhatIsNew';
import FeaturedDrinks from '@/src/components/FeaturedDrinks';
import Gallery from '@/src/components/Gallery';
import Lounge from '@/src/components/Lounge';
import LivingStories from '@/src/components/LivingStories';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Gallery />
      <WhatIsNew />
      <FeaturedDrinks />
      <Lounge />
      <LivingStories />
      <Story />
    </>
  );
}
