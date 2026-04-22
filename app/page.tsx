import Hero from '@/src/components/Hero';
import Story from '@/src/components/Story';
import WhatIsNew from '@/src/components/WhatIsNew';
import TeaRoom from '@/src/components/TeaRoom';
import Lounge from '@/src/components/Lounge';
import LivingStories from '@/src/components/LivingStories';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Story />
      <WhatIsNew />
      <TeaRoom />
      <Lounge />
      <LivingStories />
    </>
  );
}
