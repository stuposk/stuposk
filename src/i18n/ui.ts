// Texty rozhrania. EN zatiaľ nie je preložená: čo chýba, padá späť na SK.
// Preklad = doplniť kľúče do `en` (a neskôr EN verziu obsahu v src/data).
export const languages = { sk: 'SK', en: 'EN' } as const;
export type Lang = keyof typeof languages;

const sk = {
  'nav.projects': 'Projekty',
  'nav.path': 'Cesta',
  'nav.blog': 'Blog',
  'nav.contact': 'Kontakt',
  'home.now': 'Teraz',
  'home.expertise': 'Čo robím',
  'home.projects': 'Projekty',
  'home.path': 'Cesta',
  'home.path.sub': 'Život a projekty',
  'home.blog': 'Z blogu',
  'home.blog.all': 'Všetky články',
  'contact.title': 'Napíš mi.',
  'contact.sub': 'Projekt, prednáška, káva v Martine alebo len hello.',
  'mode.human': 'human',
  'mode.dev': 'dev',
  'mode.label': 'Režim zobrazenia',
  'lang.label': 'Jazyk',
};
const en: Partial<typeof sk> = {};

export const ui = { sk, en };
export const t = (lang: Lang) => (key: keyof typeof sk) => ui[lang][key] ?? sk[key];
export const langFromUrl = (url: URL): Lang => (url.pathname.startsWith('/en') ? 'en' : 'sk');
export const homeHref = (lang: Lang) => (lang === 'sk' ? '/' : `/${lang}/`);
