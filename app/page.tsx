import Hero from '@/src/components/Hero';
import Story from '@/src/components/Story';
import WhatIsNew from '@/src/components/WhatIsNew';
import FeaturedDrinks from '@/src/components/FeaturedDrinks';
import Lounge from '@/src/components/Lounge';
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
