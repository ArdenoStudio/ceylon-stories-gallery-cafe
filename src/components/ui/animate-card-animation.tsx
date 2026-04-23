"use client"

import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"

export interface DrinkCard {
  id: number
  contentType: number
}

export const drinkData: Record<number, {
  name: string
  description: string
  price: number
  tag: string
  image: string
}> = {
  1: {
    name: "Cardamom Cold Brew",
    description: "Ceylon black steeped 18 hours, finished with hand-crushed cardamom and coconut cream.",
    price: 750,
    tag: "New",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=400&fit=crop&q=80",
  },
  2: {
    name: "Spiced Coconut Latte",
    description: "Housemade coconut milk, cinnamon, clove, and a double shot of Ceylon espresso.",
    price: 720,
    tag: "",
    image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600&h=400&fit=crop&q=80",
  },
  3: {
    name: "Gallery Chai",
    description: "Black Ceylon, cardamom, cinnamon, and clove — served in hand-thrown terracotta cups.",
    price: 950,
    tag: "House Blend",
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&h=400&fit=crop&q=80",
  },
  4: {
    name: "Heritage Lemonade",
    description: "Fresh lime, ginger syrup, and a pinch of sea salt — served long over hand-cut ice.",
    price: 650,
    tag: "",
    image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=600&h=400&fit=crop&q=80",
  },
  5: {
    name: "Silver Tips Reserve",
    description: "Nuwara Eliya's rarest leaves harvested once a year at dawn. Steeped at exactly 75°C.",
    price: 1800,
    tag: "Featured",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=400&fit=crop&q=80",
  },
}

export const TOTAL_DRINKS = Object.keys(drinkData).length

const positionStyles = [
  { scale: 1, y: 12 },
  { scale: 0.95, y: -16 },
  { scale: 0.9, y: -44 },
]

const exitAnimation = { y: 340, scale: 1, zIndex: 10 }
const enterAnimation = { y: -16, scale: 0.9 }

function DrinkCardContent({ contentType }: { contentType: number }) {
  const data = drinkData[contentType]

  return (
    <div className="flex h-full w-full flex-col gap-3">
      <div className="relative flex h-[190px] w-full overflow-hidden rounded-xl">
        <img
          src={data.image}
          alt={data.name}
          className="h-full w-full select-none object-cover photo-heritage"
        />
        {data.tag && (
          <span className="absolute top-3 left-3 font-editorial text-[9px] tracking-[0.2em] uppercase bg-clay-warm text-cream-page px-2 py-1">
            {data.tag}
          </span>
        )}
      </div>
      <div className="flex w-full items-center justify-between gap-2 px-2 pb-4">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate font-display font-light text-[17px] text-mahogany leading-tight">
            {data.name}
          </span>
          <span className="font-body text-[11px] text-mahogany/60 leading-snug line-clamp-2">
            {data.description}
          </span>
          <span className="font-editorial text-[11px] tracking-[0.1em] text-clay-warm mt-1">
            LKR {data.price.toLocaleString()}
          </span>
        </div>
        <Link
          href="/menu"
          className="flex h-9 shrink-0 cursor-pointer select-none items-center gap-0.5 rounded-full bg-mahogany pl-4 pr-3 font-editorial text-[10px] tracking-[0.1em] uppercase text-cream-page hover:bg-mahogany-soft transition-colors duration-200"
        >
          View
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="square"
          >
            <path d="M9.5 18L15.5 12L9.5 6" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

function AnimatedDrinkCard({
  card,
  index,
}: {
  card: DrinkCard
  index: number
}) {
  const { scale, y } = positionStyles[index] ?? positionStyles[2]
  const zIndex = 3 - index

  return (
    <motion.div
      key={card.id}
      initial={index === 2 ? enterAnimation : undefined}
      animate={{ y, scale }}
      exit={index === 0 ? exitAnimation : undefined}
      transition={{ type: "spring", duration: 1, bounce: 0 }}
      style={{ zIndex, left: "50%", x: "-50%", bottom: 0 }}
      className="absolute flex h-[308px] w-[300px] overflow-hidden rounded-t-xl border-x border-t border-mahogany/20 bg-cream-paper p-2 shadow-[0_8px_32px_rgba(42,24,16,0.22)] will-change-transform sm:w-[400px]"
    >
      <DrinkCardContent contentType={card.contentType} />
    </motion.div>
  )
}

export default function AnimatedDrinkStack({ cards }: { cards: DrinkCard[] }) {
  return (
    <div className="relative h-[380px] w-full overflow-visible sm:w-[480px]">
      <AnimatePresence initial={false}>
        {cards.slice(0, 3).map((card, index) => (
          <AnimatedDrinkCard key={card.id} card={card} index={index} />
        ))}
      </AnimatePresence>
    </div>
  )
}
