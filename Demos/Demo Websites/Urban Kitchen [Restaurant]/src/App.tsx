import React, { useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Locations from './pages/Locations';
import Reviews from './pages/Reviews';
import About from './pages/About';
import Contact from './pages/Contact';
import CustomCursor from './components/ui/CustomCursor';
import DemoLoader from './components/DemoLoader';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(() => sessionStorage.getItem('loaderShown_urbankitchen') === '1');

  const handleLoaderComplete = () => {
    sessionStorage.setItem('loaderShown_urbankitchen', '1');
    setIsLoaded(true);
  };

  return (
    <>
      <AnimatePresence>
        {!isLoaded && <DemoLoader demoName="Urban Kitchen" demoLogoUrl="/logo.svg" onComplete={handleLoaderComplete} />}
      </AnimatePresence>
      <motion.div
        animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <HashRouter>
          <ScrollToTop />
          <CustomCursor />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="menu" element={<Menu />} />
              <Route path="locations" element={<Locations />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
            </Route>
          </Routes>
        </HashRouter>
      </motion.div>
    </>
  );
};

export default App;