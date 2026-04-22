/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Cursor from './components/Cursor';
import SmoothScroll from './components/SmoothScroll';
import IntroSequence from './components/IntroSequence';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Story from './components/Story';
import Gallery from './components/Gallery';
import TeaRoom from './components/TeaRoom';
import Lounge from './components/Lounge';
import LivingStories from './components/LivingStories';
import Footer from './components/Footer';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(
    sessionStorage.getItem('hasVisitedCeylonStories') ? true : false
  );

  return (
    <SmoothScroll>
      <div className="noise-overlay" />
      <Cursor />
      
      {!sessionStorage.getItem('hasVisitedCeylonStories') && (
        <IntroSequence onComplete={() => setIsLoaded(true)} />
      )}
      
      <Navigation />
      
      <main>
        <Hero isLoaded={isLoaded} />
        <Story />
        <Gallery />
        <TeaRoom />
        <Lounge />
        <LivingStories />
      </main>
      
      <Footer />
    </SmoothScroll>
  );
}

