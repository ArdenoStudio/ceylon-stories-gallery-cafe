export default function MenuHero() {
  return (
    <section
      className="w-full bg-mahogany relative"
      style={{ minHeight: '60vh' }}
    >
      {/* Left copper accent bar */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0"
        style={{ width: 3, background: 'var(--color-copper)', opacity: 0.7 }}
      />

      <div
        className="flex flex-col justify-center"
        style={{
          minHeight: '60vh',
          padding: 'clamp(56px, 9vw, 112px) clamp(40px, 8vw, 120px)',
        }}
      >
        {/* Overline */}
        <div className="flex items-baseline gap-6 mb-10">
          <span
            className="text-copper/60 tracking-[0.22em] uppercase"
            style={{ fontFamily: 'var(--font-editorial)', fontSize: 10 }}
          >
            03
          </span>
          <span className="block w-12 h-px bg-copper/30 self-center" />
          <span
            className="text-cream-page/30 tracking-[0.18em] uppercase"
            style={{ fontFamily: 'var(--font-editorial)', fontSize: 10 }}
          >
            The Menu
          </span>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(54px, 8.5vw, 124px)',
            lineHeight: 0.92,
            letterSpacing: '-0.025em',
            fontWeight: 300,
          }}
        >
          <span className="block" style={{ color: 'var(--color-cream-page)' }}>
            Food, Tea
          </span>
          <span
            className="block"
            style={{
              color: 'var(--color-copper)',
              fontStyle: 'italic',
              marginTop: 8,
            }}
          >
            & the Lounge.
          </span>
        </h1>

        {/* Supporting line */}
        <p
          className="mt-12 text-cream-page/30 leading-relaxed"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            maxWidth: '36ch',
            letterSpacing: '0.01em',
          }}
        >
          An exploration of Sri Lankan cuisine, tea, and the art of gathering.
        </p>
      </div>
    </section>
  )
}
