import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

// Register GSAP Plugins safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

const menuItemsData = [
  { num: "01", title: "Home", desc: "Cinematic hero, brand story", path: "#" },
  { num: "02", title: "Our Story", desc: "Founders, vision & history", path: "#story" },
  { num: "03", title: "Menu", desc: "Food, beverages, Dilmah tea", path: "#menu" },
  { num: "04", title: "The Gallery", desc: "Rotating artist feature", path: "#gallery" },
  { num: "05", title: "Experience", desc: "Tea tastings & shisha", path: "#experience" },
  { num: "06", title: "Stories / Blog", desc: "Editorial & heritage", path: "#stories" },
  { num: "07", title: "Visit Us", desc: "Location & opening hours", path: "#visit" },
  { num: "08", title: "Contact", desc: "Inquiries & social links", path: "#contact" }
];

export function SterlingGateKineticNavigation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection for logo
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initial Setup & Hover Effects
  useEffect(() => {
    if (!containerRef.current) return;

    try {
        if (!gsap.parseEase("main")) {
            CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
            gsap.defaults({ ease: "main", duration: 0.7 });
        }
    } catch (e) {
        console.warn("CustomEase failed to load, falling back to default.", e);
        gsap.defaults({ ease: "power2.out", duration: 0.7 });
    }

    const ctx = gsap.context(() => {
      // Shape Hover
      const menuItems = containerRef.current!.querySelectorAll(".menu-list-item[data-shape]");
      const shapesContainer = containerRef.current!.querySelector(".ambient-background-shapes");
      
      menuItems.forEach((item) => {
        const shapeIndex = item.getAttribute("data-shape") || "1";
        // Map 8 items to the 5 shapes available via modulo
        const mappedIndex = ((parseInt(shapeIndex) - 1) % 5) + 1;
        const shape = shapesContainer ? shapesContainer.querySelector(`.bg-shape-${mappedIndex}`) : null;
        
        if (!shape) return;

        const shapeEls = shape.querySelectorAll(".shape-element");

        const onEnter = () => {
             if (shapesContainer) {
                 shapesContainer.querySelectorAll(".bg-shape").forEach((s) => s.classList.remove("active"));
             }
             shape.classList.add("active");
             
             gsap.fromTo(shapeEls, 
                { scale: 0.5, opacity: 0, rotation: -10 },
                { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.08, ease: "back.out(1.7)", overwrite: "auto" }
             );
        };
        
        const onLeave = () => {
            gsap.to(shapeEls, {
                scale: 0.8, opacity: 0, duration: 0.3, ease: "power2.in",
                onComplete: () => shape.classList.remove("active"),
                overwrite: "auto"
            });
        };

        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);
        
        (item as any)._cleanup = () => {
            item.removeEventListener("mouseenter", onEnter);
            item.removeEventListener("mouseleave", onLeave);
        };
      });
      
    }, containerRef);

    return () => {
        ctx.revert();
        if (containerRef.current) {
            const items = containerRef.current.querySelectorAll(".menu-list-item[data-shape]");
            items.forEach((item: any) => item._cleanup && item._cleanup());
        }
    };
  }, []);

  // Menu Open/Close Animation Effect
  useEffect(() => {
      if (!containerRef.current) return;
      if (isMenuOpen) document.body.style.overflow = 'hidden';
      else document.body.style.overflow = 'auto';
      
      const ctx = gsap.context(() => {
        const navWrap = containerRef.current!.querySelector(".nav-overlay-wrapper");
        const menu = containerRef.current!.querySelector(".menu-content");
        const overlay = containerRef.current!.querySelector(".overlay");
        const bgPanels = containerRef.current!.querySelectorAll(".backdrop-layer");
        const menuLinks = containerRef.current!.querySelectorAll(".nav-link");
        const fadeTargets = containerRef.current!.querySelectorAll("[data-menu-fade]");
        
        const menuButton = containerRef.current!.querySelector(".nav-close-btn");
        const menuButtonTexts = menuButton?.querySelectorAll("p");
        const menuButtonIcon = menuButton?.querySelector(".menu-button-icon");

        const tl = gsap.timeline();
        
        if (isMenuOpen) {
            if (navWrap) navWrap.setAttribute("data-nav", "open");
            
            tl.set(navWrap, { display: "block" })
              .set(menu, { xPercent: 0 }, "<")
              .fromTo(menuButtonTexts ?? [], { yPercent: 0 }, { yPercent: -100, stagger: 0.2 }, "<")
              .fromTo(menuButtonIcon ?? [], { rotate: 0 }, { rotate: 315 }, "<")
              .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
              .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, "<")
              .fromTo(menuLinks, { yPercent: 140, rotate: 10 }, { yPercent: 0, rotate: 0, stagger: 0.05 }, "<+=0.35");
              
            if (fadeTargets.length) {
                tl.fromTo(fadeTargets, { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04, clearProps: "all" }, "<+=0.2");
            }

        } else {
            if (navWrap) navWrap.setAttribute("data-nav", "closed");

            tl.to(overlay, { autoAlpha: 0 })
              .to(menu, { xPercent: 120 }, "<")
              .to(menuButtonTexts ?? [], { yPercent: 0 }, "<")
              .to(menuButtonIcon ?? [], { rotate: 0 }, "<")
              .set(navWrap, { display: "none" });
        }

      }, containerRef);
      
      return () => {
        ctx.revert();
        document.body.style.overflow = 'auto';
      }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isMenuOpen) {
            setIsMenuOpen(false);
        }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div ref={containerRef} className="sterling-gate-nav relative z-[500]">
      {/* HEADER ROW */}
      <div className="site-header-wrapper fixed top-0 w-full z-[100] pointer-events-none px-6 md:px-[6%] lg:px-12 py-8 transition-all duration-700" style={{ backgroundColor: scrolled && !isMenuOpen ? '#EBE0CA' : 'transparent' }}>
        <header className="header flex justify-between items-start w-full">
          <div className="flex-1 flex justify-start pointer-events-auto">
            <button 
              onClick={toggleMenu}
              className={`font-editorial text-[11px] uppercase tracking-[0.18em] transition-colors duration-500 hover-underline pt-1 ${scrolled && !isMenuOpen ? 'text-mahogany' : 'text-cream-page md:text-cream-page text-mahogany mix-blend-difference'}`}
            >
              INDEX
            </button>
          </div>

          <a href="#" aria-label="home" className="flex-1 flex justify-center pointer-events-auto mt-1">
             <span className="font-display font-normal text-mahogany text-[18px] tracking-wide select-none outline-none">
              CEYLON STORIES
            </span>
          </a>
          
          <div className="flex-1 flex justify-end pointer-events-auto mt-2 h-[20px] overflow-hidden relative group">
            <button role="button" className="nav-close-btn flex items-center gap-3" onClick={toggleMenu}>
              <div className="menu-button-text font-editorial text-[11px] uppercase tracking-[0.18em] text-mahogany h-[15px] overflow-hidden relative">
                <p className="p-large m-0 h-full flex items-center">Menu</p>
                <p className="p-large m-0 h-full flex items-center absolute top-full">Close</p>
              </div>
              <div className="icon-wrap text-mahogany w-3 h-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 16 16" fill="none" className="menu-button-icon">
                  <path d="M7.33333 16L7.33333 -3.2055e-07L8.66667 -3.78832e-07L8.66667 16L7.33333 16Z" fill="currentColor"></path>
                  <path d="M16 8.66667L-2.62269e-07 8.66667L-3.78832e-07 7.33333L16 7.33333L16 8.66667Z" fill="currentColor"></path>
                  <path d="M6 7.33333L7.33333 7.33333L7.33333 6C7.33333 6.73637 6.73638 7.33333 6 7.33333Z" fill="currentColor"></path>
                  <path d="M10 7.33333L8.66667 7.33333L8.66667 6C8.66667 6.73638 9.26362 7.33333 10 7.33333Z" fill="currentColor"></path>
                  <path d="M6 8.66667L7.33333 8.66667L7.33333 10C7.33333 9.26362 6.73638 8.66667 6 8.66667Z" fill="currentColor"></path>
                  <path d="M10 8.66667L8.66667 8.66667L8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667Z" fill="currentColor"></path>
                </svg>
              </div>
            </button>
          </div>
        </header>
      </div>

      <section className="fullscreen-menu-container">
        <div data-nav="closed" className="nav-overlay-wrapper hidden fixed inset-0 z-[200]">
          <div className="overlay absolute inset-0 bg-mahogany/30 backdrop-blur-sm opacity-0 invisible cursor-pointer" onClick={closeMenu}></div>
          
          <nav className="menu-content absolute right-0 top-0 w-full md:w-[60%] lg:w-[45%] h-full bg-cream-page overflow-hidden pt-32 px-8 md:px-16 pb-12 flex flex-col justify-center">
            <div className="menu-bg absolute inset-0 -z-10 pointer-events-none">
              <div className="backdrop-layer first absolute inset-0 w-full h-full bg-clay-deep translate-x-full"></div>
              <div className="backdrop-layer second absolute inset-0 w-full h-full bg-clay-warm translate-x-full"></div>
              <div className="backdrop-layer absolute inset-0 w-full h-full bg-cream-page translate-x-full paper-texture !opacity-40"></div>

              {/* Abstract shapes container adapted to colors */}
              <div className="ambient-background-shapes absolute inset-0 w-full h-full overflow-hidden opacity-30">
                <svg className="bg-shape bg-shape-1 absolute inset-0 w-full h-full opacity-0 transition-opacity duration-300" viewBox="0 0 400 400" fill="none" preserveAspectRatio="xMidYMid slice">
                  <circle className="shape-element" cx="80" cy="120" r="40" fill="var(--color-clay-warm)" />
                  <circle className="shape-element" cx="300" cy="80" r="60" fill="var(--color-clay-deep)" />
                  <circle className="shape-element" cx="200" cy="300" r="80" fill="var(--color-gold-leaf)" />
                </svg>

                <svg className="bg-shape bg-shape-2 absolute inset-0 w-full h-full opacity-0 transition-opacity duration-300" viewBox="0 0 400 400" fill="none" preserveAspectRatio="xMidYMid slice">
                  <path className="shape-element" d="M0 200 Q100 100, 200 200 T 400 200" stroke="var(--color-clay-deep)" strokeWidth="60" fill="none" />
                  <path className="shape-element" d="M0 280 Q100 180, 200 280 T 400 280" stroke="var(--color-clay-warm)" strokeWidth="40" fill="none" />
                </svg>

                <svg className="bg-shape bg-shape-3 absolute inset-0 w-full h-full opacity-0 transition-opacity duration-300" viewBox="0 0 400 400" fill="none" preserveAspectRatio="xMidYMid slice">
                  <circle className="shape-element" cx="50" cy="50" r="8" fill="var(--color-mahogany)" />
                  <circle className="shape-element" cx="150" cy="50" r="8" fill="var(--color-mahogany)" />
                  <circle className="shape-element" cx="250" cy="50" r="8" fill="var(--color-mahogany)" />
                  <circle className="shape-element" cx="100" cy="150" r="12" fill="var(--color-clay-deep)" />
                  <circle className="shape-element" cx="200" cy="150" r="12" fill="var(--color-clay-warm)" />
                  <circle className="shape-element" cx="50" cy="250" r="10" fill="var(--color-gold-leaf)" />
                  <circle className="shape-element" cx="150" cy="250" r="10" fill="var(--color-gold-leaf)" />
                </svg>

                <svg className="bg-shape bg-shape-4 absolute inset-0 w-full h-full opacity-0 transition-opacity duration-300" viewBox="0 0 400 400" fill="none" preserveAspectRatio="xMidYMid slice">
                  <path className="shape-element" d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100" fill="var(--color-clay-warm)" />
                  <path className="shape-element" d="M250 200 Q300 150, 350 200 Q400 250, 350 300 Q400 250, 350 300 Q300 350, 250 300 Q200 250, 250 200" fill="var(--color-clay-deep)" />
                </svg>

                <svg className="bg-shape bg-shape-5 absolute inset-0 w-full h-full opacity-0 transition-opacity duration-300" viewBox="0 0 400 400" fill="none" preserveAspectRatio="xMidYMid slice">
                  <line className="shape-element" x1="0" y1="100" x2="300" y2="400" stroke="var(--color-clay-deep)" strokeWidth="30" />
                  <line className="shape-element" x1="100" y1="0" x2="400" y2="300" stroke="var(--color-clay-warm)" strokeWidth="25" />
                </svg>
              </div>
            </div>

            <div className="font-editorial text-[10px] tracking-[0.18em] uppercase text-mahogany-soft/60 mb-8" data-menu-fade>
              TABLE OF CONTENTS
            </div>

            <div className="menu-content-wrapper overflow-y-auto pr-8 -mr-8 no-scrollbar h-full">
              <ul className="menu-list flex flex-col gap-6 lg:gap-8 pb-32">
                {menuItemsData.map((item, index) => (
                  <li key={index} className="menu-list-item relative group cursor-pointer" data-shape={index + 1}>
                    <a href={item.path} onClick={closeMenu} className="w-inline-block flex items-baseline gap-6">
                      <span className="font-editorial text-[12px] text-mahogany/40 tracking-[0.2em] w-8 shrink-0 overflow-hidden block">
                        <span className="nav-link block">{item.num}</span>
                      </span>
                      <div className="flex flex-col relative overflow-hidden flex-1">
                        <p className="nav-link-text block m-0 p-0 overflow-hidden">
                          <span className="nav-link block font-display font-light text-[32px] md:text-[44px] text-mahogany tracking-tight transition-all duration-300 group-hover:italic group-hover:translate-x-3">
                            {item.title}
                          </span>
                        </p>
                        <p className="text-[12px] font-body text-mahogany-soft/70 mt-1" data-menu-fade>
                          {item.desc}
                        </p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="absolute bottom-8 left-8 right-8 flex justify-between border-t border-mahogany/10 pt-6" data-menu-fade>
               <span className="font-editorial text-[10px] tracking-[0.18em] uppercase text-mahogany-soft">CEYLON STORIES</span>
               <span className="font-editorial text-[10px] tracking-[0.18em] uppercase text-mahogany-soft">KOLPETTY, LK</span>
            </div>
            
          </nav>
        </div>
      </section>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .hover-underline {
          position: relative;
          display: inline-block;
        }
        .hover-underline::after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 1px;
          bottom: -2px;
          left: 0;
          background-color: var(--color-clay-warm);
          transform-origin: bottom right;
          transition: transform 0.4s cubic-bezier(0.65, 0, 0.35, 1);
        }
        .hover-underline:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
      `}</style>
    </div>
  );
}
