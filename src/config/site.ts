export const siteConfig = {
  name: 'Bagua Zhang – Szkoła Trzech Okręgów',
  shortName: 'BZ3O',
  internationalName: 'San Yuan Baguazhang · 三圓八卦掌',
  url: 'https://baguatrzechokregow.pl',
  email: 'bz3o@proton.me',
  phone: '+48 515 81 81 86',
  phoneHref: 'tel:+48515818186',
  whatsappNumber: '',
  social: {
    facebook: '',
    instagram: '',
    youtube: ''
  },
  classes: {
    day: 'Środa',
    time: '19:30–21:00',
    startDate: '23.09.2026',
    endDate: 'koniec czerwca 2027',
    price: '150 zł / miesiąc',
    firstClass: 'Pierwszy trening bezpłatny',
    maxParticipants: 20,
    audience: 'Dorośli i młodzież od 16 roku życia'
  },
  location: {
    name: 'Dom Kultury SM „Kurdwanów Nowy”',
    street: 'Wincentego Witosa 39',
    postalCode: '30-612',
    city: 'Kraków',
    room: '1. piętro',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Wincentego+Witosa+39%2C+Krak%C3%B3w'
  },
  gaId: import.meta.env.PUBLIC_GA_ID ?? 'G-QFFYEN6ZXS'
} as const;

export const navigation = [
  { label: 'Bagua', href: '/#bagua' },
  { label: 'Trzy Okręgi', href: '/#trzy-okregi' },
  { label: 'Korzyści', href: '/#korzysci' },
  { label: 'Trening', href: '/#trening' },
  { label: 'Program', href: '/#program' },
  { label: 'Szkoła', href: '/#szkola' },
  { label: 'Zajęcia', href: '/#zajecia' },
  { label: 'Artykuły', href: '/#artykuly' },
  { label: 'Kontakt', href: '/#kontakt' }
] as const;
