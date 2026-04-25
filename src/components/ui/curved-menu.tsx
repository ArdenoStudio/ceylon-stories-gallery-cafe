'use client';

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useMotionValue, AnimatePresence } from "motion/react";
import { Instagram, MapPin, Mail, BookOpen } from "lucide-react";
import { useNavMenu } from "@/src/components/NavMenuContext";

interface iNavItem {
	heading: string;
	href: string;
	subheading?: string;
	imgSrc?: string;
}

interface iNavLinkProps extends iNavItem {
	setIsActive: (isActive: boolean) => void;
	index: number;
}

interface iCurvedNavbarProps {
	setIsActive: (isActive: boolean) => void;
	navItems: iNavItem[];
}

interface iHeaderProps {
	navItems?: iNavItem[];
	footer?: React.ReactNode;
}

const MENU_SLIDE_ANIMATION = {
	initial: { x: "calc(100% + 100px)" },
	enter: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const } },
	exit: {
		x: "calc(100% + 100px)",
		transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const },
	},
};

const defaultNavItems: iNavItem[] = [
	{ heading: "Home", href: "/", subheading: "Cinematic hero, brand story" },
	{ heading: "Our Story", href: "/our-story", subheading: "Founders, vision & history" },
	{ heading: "Menu", href: "/menu", subheading: "Food, beverages, Dilmah tea" },
	{ heading: "Dilmah", href: "/dilmah", subheading: "Ceylon tea — brand & story" },
	{ heading: "The Gallery", href: "/gallery", subheading: "Monthly rotating artist feature" },
	{ heading: "Experience", href: "/experience", subheading: "Tea tastings, shisha lounge" },
	{ heading: "Stories", href: "/stories", subheading: "Editorial blog & heritage" },
	{ heading: "Visit Us", href: "/visit", subheading: "Location, hours & reservations" },
	{ heading: "Contact", href: "/contact", subheading: "Inquiry form & social links" },
];

const CustomFooter: React.FC = () => {
	return (
		<div className="px-10 md:px-24 mt-8 font-editorial">
			{/* Status indicator */}
			<div className="flex items-center gap-3 mb-6 pb-5 border-b border-mahogany/15">
				<span className="h-2 w-2 rounded-full bg-forest/80 animate-pulse" />
				<span className="text-[9px] tracking-[0.22em] uppercase text-mahogany/55">
					Open Today · 8:00 AM — 10:00 PM
				</span>
			</div>
			{/* Social links */}
			<div className="flex w-full text-sm justify-between text-mahogany py-3">
				<a href="https://instagram.com/ceylonstories.gallerycafe" target="_blank" rel="noreferrer" className="hover:text-clay-warm transition-colors" aria-label="Instagram">
					<Instagram size={18} />
				</a>
				<a href="/visit" className="hover:text-clay-warm transition-colors" aria-label="Directions">
					<MapPin size={18} />
				</a>
				<a href="mailto:hello@ceylonstories.lk" className="hover:text-clay-warm transition-colors" aria-label="Email">
					<Mail size={18} />
				</a>
				<a href="/menu" className="hover:text-clay-warm transition-colors" aria-label="Menu">
					<BookOpen size={18} />
				</a>
			</div>
		</div>
	);
};

const NavLink: React.FC<iNavLinkProps> = ({
	heading,
	href,
	subheading,
	setIsActive,
	index,
}) => {
	const ref = useRef<HTMLAnchorElement | null>(null);
	const x = useMotionValue(0);
	const y = useMotionValue(0);

	const handleMouseMove = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
	) => {
		const rect = ref.current!.getBoundingClientRect();
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;
		x.set(mouseX / rect.width - 0.5);
		y.set(mouseY / rect.height - 0.5);
	};

	const handleClick = () => {
		return setIsActive(false);
	};

	return (
		<motion.div
			onClick={handleClick}
			initial="initial"
			whileHover="whileHover"
			className="group relative flex items-center justify-between border-b border-mahogany/20 py-3 transition-colors duration-500 md:py-5 uppercase"
		>
			<Link ref={ref} onMouseMove={handleMouseMove} href={href} className="w-full">
				<div className="relative flex flex-col md:flex-row md:items-center gap-1 md:gap-6">
					<span className="text-mahogany/40 transition-colors duration-500 text-xs md:text-sm font-editorial tracking-[0.25em] w-8 shrink-0">
						0{index}
					</span>
					<div className="flex flex-col gap-1">
						<motion.span
							variants={{
								initial: { x: 0 },
								whileHover: { x: 10 },
							}}
							transition={{
								type: "spring",
								stiffness: 300,
								damping: 25,
								staggerChildren: 0.04,
								delayChildren: 0.05,
							}}
							className="relative z-10 font-display text-3xl md:text-4xl lg:text-5xl text-mahogany transition-colors duration-500 tracking-[-0.02em] group-hover:italic"
						>
							{heading.split("").map((letter, i) => {
								return (
									<motion.span
										key={i}
										variants={{
											initial: { x: 0 },
											whileHover: { x: 6 },
										}}
										transition={{ type: "spring", stiffness: 300, damping: 25 }}
										className="inline-block"
									>
										{letter === " " ? "\u00A0" : letter}
									</motion.span>
								);
							})}
						</motion.span>
						{subheading && (
							<span className="font-editorial text-[8px] tracking-[0.18em] text-mahogany/35 normal-case mt-0.5">
								{subheading}
							</span>
						)}
					</div>
				</div>
			</Link>
		</motion.div>
	);
};

const Curve: React.FC = () => {
    const [windowHeight, setWindowHeight] = useState(0);

    useEffect(() => {
        setWindowHeight(window.innerHeight);
        const handleResize = () => setWindowHeight(window.innerHeight);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!windowHeight) return null;

	const initialPath = `M100 0 L200 0 L200 ${windowHeight} L100 ${windowHeight} Q-100 ${windowHeight / 2} 100 0`;
	const targetPath = `M100 0 L200 0 L200 ${windowHeight} L100 ${windowHeight} Q100 ${windowHeight / 2} 100 0`;

	const curve = {
		initial: { d: initialPath },
		enter: {
			d: targetPath,
			transition: { duration: 1, ease: [0.76, 0, 0.24, 1] as const },
		},
		exit: {
			d: initialPath,
			transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const },
		},
	};

	return (
		<svg
			className="absolute top-0 -left-[99px] w-[100px] stroke-none h-full overflow-visible pointer-events-none"
			style={{ fill: "#F4ECDC" }}
		>
			<motion.path
				variants={curve}
				initial="initial"
				animate="enter"
				exit="exit"
			/>
		</svg>
	);
};

const CurvedNavbar: React.FC<
	iCurvedNavbarProps & { footer?: React.ReactNode }
> = ({ setIsActive, navItems, footer }) => {
	return (
		<motion.div
			variants={MENU_SLIDE_ANIMATION}
			initial="initial"
			animate="enter"
			exit="exit"
			className="h-[100dvh] w-screen max-w-[600px] fixed right-0 top-0 z-40"
		>
            <div className="absolute inset-0 bg-[#F4ECDC] pointer-events-none" />
            <Curve />
            <div className="absolute inset-0 pointer-events-none paper-texture opacity-30" />
			<div className="h-full pt-20 md:pt-32 pb-12 flex flex-col justify-between relative z-10 overflow-y-auto no-scrollbar pointer-events-auto" data-lenis-prevent="true">
				<div className="flex flex-col gap-3 mt-0 px-10 md:px-24">
					<div className="text-mahogany-soft/60 border-b border-mahogany/30 uppercase text-[10px] tracking-[0.18em] mb-4 pb-4 font-editorial">
						<p>TABLE OF CONTENTS</p>
					</div>
					<section className="bg-transparent mt-0">
						<div className="mx-auto flex flex-col">
							{navItems.map((item, index) => {
								return (
									<NavLink
										key={item.href}
										{...item}
										setIsActive={setIsActive}
										index={index + 1}
									/>
								);
							})}
						</div>
					</section>
				</div>
				{footer}
			</div>
			<Curve />
            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                  display: none;
                }
                .no-scrollbar {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
            `}</style>
		</motion.div>
	);
};

export default function CurvedMenuHeader({
	navItems = defaultNavItems,
	footer = <CustomFooter />,
}: iHeaderProps) {
	const [isActive, setIsActiveLocal] = useState(false);
	const { setIsNavOpen } = useNavMenu();
	const openAudioRef = useRef<HTMLAudioElement | null>(null);
	const closeAudioRef = useRef<HTMLAudioElement | null>(null);

	const setIsActive = (val: boolean) => {
		setIsActiveLocal(val);
		setIsNavOpen(val);
	};

	useEffect(() => {
		if (isActive) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [isActive]);

	const handleClick = () => {
		if (isActive) {
			closeAudioRef.current?.play().catch(e => {}); // safe catch
		} else {
			openAudioRef.current?.play().catch(e => {}); // safe catch
		}
		setIsActive(!isActive);
	};

	return (
		<>
			<div className="relative pointer-events-auto">
				<div
					onClick={handleClick}
					className="fixed right-6 top-6 md:right-12 md:top-8 z-50 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer bg-cream-paper border border-mahogany/20 hover:bg-cream-page transition-colors duration-300 shadow-ink lg:hidden"
				>
					<div className="relative w-6 h-4 flex flex-col justify-between items-center">
						<span
							className={`block h-[1px] w-full bg-mahogany transition-transform duration-300 ${isActive ? "rotate-45 translate-y-[7.5px]" : ""}`}
						></span>
						<span
							className={`block h-[1px] w-full bg-mahogany transition-opacity duration-300 ${isActive ? "opacity-0" : ""}`}
						></span>
						<span
							className={`block h-[1px] w-full bg-mahogany transition-transform duration-300 ${isActive ? "-rotate-45 -translate-y-[7.5px]" : ""}`}
						></span>
					</div>
				</div>
			</div>

			{/* Overlay to close menu when clicking outside */}
			<AnimatePresence>
				{isActive && (
					<motion.div 
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5 }}
						className="fixed inset-0 bg-mahogany/30 backdrop-blur-sm z-30"
						onClick={() => setIsActive(false)}
					/>
				)}
			</AnimatePresence>

			<AnimatePresence mode="wait">
				{isActive && (
					<CurvedNavbar
						setIsActive={setIsActive}
						navItems={navItems}
						footer={footer}
					/>
				)}
			</AnimatePresence>
		</>
	);
}
