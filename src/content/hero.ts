export const heroContent = {
  slogan: 'Marine Drive · Colombo 03 · Gallery Cafe',
  title: {
    line1: 'Ceylon Tea.',
    line2: 'Curated Art.',
  },
  tagline: 'Stay a little longer.',
  subtitle:
    'On Marine Drive, Ceylon Stories pairs single-estate brews with rotating works, warm plates, and the kind of afternoon you do not rush.',
  hours: {
    open: 8,
    close: 22,
    timezone: 'Asia/Colombo',
    label: 'Open Daily · 8:00 AM — 10:00 PM',
    openNowLabel: 'Open now · Until 10 PM',
    closedLabel: 'Closed · Opens at 8 AM',
  },
  primaryCta: 'Reserve Your Table',
  secondaryCta: { text: 'Browse the Menu', href: '#menu' },
  panel: {
    image: '/dilmah-drink.jpg',
    alt: 'Dilmah Reserve cocktail pairing served in a cut-crystal tumbler',
    eyebrow: 'Now Pouring',
    title: { prefix: 'Dilmah', italic: 'Reserve', suffix: 'Pairings' },
    logo: '/dilmah-logo.png',
    logoAlt: 'Dilmah Reserve',
  },
  background: '/dilmah-bg.png',
  established: { prefix: "Est.", year: '2024', display: '24' },
  // TODO: replace placeholder phone with real number before launch
  contact: {
    website: 'ceylonstories.lk',
    phone: '+94 77 000 0000',
    address: 'Marine Drive, Colombo 03, Sri Lanka',
  },
} as const;
