import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { MenuItemCard } from './MenuItemCard'
import { MenuItemModal, type MenuItemDetail } from './MenuItemModal'

export interface MenuItem {
  id: string
  category: string
  name: string
  description: string
  tag: string
  imageUrl: string
  isVegetarian: boolean
  price: number
  originalPrice: number | null
  quantity: string
  prepTimeInMinutes: number
}

interface WhatIsNewProps {
  items: MenuItem[]
}

const PAGE_SIZE = 4

export default function WhatIsNew({ items }: WhatIsNewProps) {
  const [selectedItem, setSelectedItem] = useState<MenuItemDetail | null>(null)
  const [page, setPage] = useState(0)

  const totalPages = Math.ceil(items.length / PAGE_SIZE)
  const visibleItems = items.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  return (
    <section className="relative w-full bg-cream-page py-[clamp(80px,12vh,160px)] px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
            <div className="flex-shrink-0">
              <p className="font-editorial text-[10px] tracking-[0.25em] uppercase text-clay-warm mb-3">
                On The Menu Now
              </p>
              <h2 className="font-display font-light text-mahogany text-[clamp(36px,5vw,72px)] leading-[0.9] tracking-[-0.02em]">
                What&apos;s <i className="font-display font-light">New</i>
              </h2>
            </div>

            <div className="hidden md:block flex-1" />

            <div className="flex-shrink-0 flex flex-col gap-3 md:items-end md:text-right">
              <p className="font-body text-sm text-mahogany/55 leading-relaxed max-w-[260px]">
                New additions, seasonal specials &amp; featured items — updated as the kitchen evolves.
              </p>
              <div className="flex items-center gap-3 md:justify-end">
                <span className="font-editorial text-[9px] tracking-[0.2em] uppercase text-mahogany/30">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </span>
                <span className="w-px h-3 bg-mahogany/15" />
                <a
                  href="/menu"
                  className="font-editorial text-[10px] tracking-[0.2em] uppercase text-clay-deep inline-flex items-center gap-2 hover:gap-3 transition-all duration-300"
                >
                  VIEW FULL MENU <span>→</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-10 border-t border-mahogany/8" />
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {visibleItems.map((item, idx) => (
              <motion.div
                key={`${page}-${item.id ?? idx}`}
                className="h-full"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                <MenuItemCard
                  className="h-full"
                  imageUrl={item.imageUrl}
                  isVegetarian={item.isVegetarian}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  originalPrice={item.originalPrice}
                  quantity={item.quantity}
                  prepTimeInMinutes={item.prepTimeInMinutes}
                  tag={item.tag}
                  onCardClick={() => setSelectedItem(item)}
                  onAdd={(rect) => {
                    // wire up to your cart system here
                    console.log('add', item.name, rect)
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-10 md:mt-12">
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  aria-label={`Go to page ${i + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    i === page
                      ? 'w-6 h-1.5 bg-clay-warm'
                      : 'w-1.5 h-1.5 bg-mahogany/20 hover:bg-mahogany/40'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setPage(p => p - 1)}
                disabled={page === 0}
                aria-label="Previous"
                className="w-10 h-10 flex items-center justify-center border border-mahogany/15 text-mahogany/50 hover:border-mahogany/40 hover:text-mahogany disabled:opacity-25 transition-all duration-200 rounded-sm"
              >
                <span className="font-editorial text-sm">←</span>
              </button>
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={page === totalPages - 1}
                aria-label="Next"
                className="w-10 h-10 flex items-center justify-center border border-mahogany/15 text-mahogany/50 hover:border-mahogany/40 hover:text-mahogany disabled:opacity-25 transition-all duration-200 rounded-sm"
              >
                <span className="font-editorial text-sm">→</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <MenuItemModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToCart={(qty, rect) => {
          if (selectedItem) console.log('add to cart', selectedItem.name, qty, rect)
          setSelectedItem(null)
        }}
      />
    </section>
  )
}
