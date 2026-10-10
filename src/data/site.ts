// Jedno miesto pre všetky odkazy a texty. Uprav tu, zvyšok stránky sa prispôsobí.
export const site = {
  name: 'Michal Stupák',
  tagline: 'Staviam firmy, komunity a veci s AI.',
  intro:
    'Programátor a podnikateľ z Košíc. Ťahám Unite, rozbiehal som Inovia a budujem komunitu okolo Cancel coworkingu.',
  email: 'michal@unite.sk',
  links: {
    linkedin: 'https://www.linkedin.com/in/TODO',
    instagram: 'https://www.instagram.com/TODO',
  },
};

export const expertise = [
  { title: 'AI', text: 'Praktické nasadenie AI do firiem a produktov. Menej hype, viac vecí, ktoré fungujú.' },
  { title: 'Programovanie', text: 'Od prototypu po produkciu. Web, automatizácie a nástroje na mieru.' },
  { title: 'Podnikanie', text: 'Zakladanie, budovanie tímu, predaj. Čo funguje a čo nie.' },
  { title: 'Komunita', text: 'Cancel coworking o.z. a ľudia okolo neho. Miesto, kde sa veci dejú.' },
];

export const projects = [
  { name: 'Unite', href: 'https://unite.sk', host: 'unite.sk', text: 'Moja firma. Softvér, AI a digitálne produkty.' },
  { name: 'Inovia', href: 'https://TODO-inovia', host: 'inovia', text: 'TODO: jedna veta o tom, čo je Inovia.' },
  { name: 'Cancel', href: 'https://TODO-cancel', host: 'cancel', text: 'Coworking a občianske združenie. Komunita ľudí, ktorí niečo budujú.' },
];

// kind: 'life' = osobné, 'project' = projekty a firmy
// TODO: nahraď placeholdery skutočnými rokmi a udalosťami.
export const timeline: { year: string; title: string; text: string; kind: 'life' | 'project' }[] = [
  { year: '20XX', title: 'Začiatok', text: 'TODO: kde to celé začalo.', kind: 'life' },
  { year: '20XX', title: 'Prvý projekt', text: 'TODO: prvá vec, ktorú si postavil.', kind: 'project' },
  { year: '20XX', title: 'Unite', text: 'TODO: vznik Unite.', kind: 'project' },
  { year: '20XX', title: 'Cancel', text: 'TODO: vznik Cancel coworkingu a o.z.', kind: 'project' },
  { year: '20XX', title: 'Inovia', text: 'TODO: Inovia.', kind: 'project' },
  { year: 'Dnes', title: 'Michal Stupák ako značka', text: 'Blog, AI, komunita. Tu to teraz píšem.', kind: 'life' },
];
