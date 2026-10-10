// Jedno miesto pre všetky odkazy a texty. Uprav tu, zvyšok stránky sa prispôsobí.
export const site = {
  name: 'Michal Stupák',
  tagline: 'Staviam firmy, komunity a veci s AI.',
  intro:
    'Programátor a podnikateľ z Martina. Ťahám Unite, ako inovačný manažér pre Turiec pôsobím v INOVIA a budujem komunitu okolo cancel coworkingu.',
  email: 'michal@unite.sk',
  links: {
    linkedin: 'https://www.linkedin.com/in/michalstupak',
    instagram: 'https://www.instagram.com/michalstupak',
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
  { name: '/kolega', href: 'https://askkolega.com', host: 'askkolega.com', text: 'AI kolega, ktorý pozná vašu firmu. Odpovedá len z vašich dokumentov.' },
  { name: 'Aether', href: 'https://unite.sk', host: 'unite.sk', text: 'Platforma na nabíjanie elektromobilov a riadenie energie (CPO a EMSP), white-label.' },
  { name: 'INOVIA', href: 'https://inovia.sk', host: 'inovia.sk', text: 'Regionálne inovačné centrum Žilinského kraja. Inovácie a podpora firiem v Turci.' },
  { name: 'cancel', href: 'https://cancel.sk', host: 'cancel.sk', text: 'Coworking a občianske združenie. Komunita ľudí, ktorí niečo budujú.' },
];

// kind: 'life' = osobné, 'project' = projekty a firmy
// Roky z verejných zdrojov (register, podcasty), over si ich. TODO: doplň osobné míľniky (štúdium, prvá práca…).
export const timeline: { year: string; title: string; text: string; kind: 'life' | 'project' }[] = [
  { year: '2014', title: 'Nápad na cancel', text: 'S Vladislavom Martynekom vzniká myšlienka coworkingu v Martine.', kind: 'project' },
  { year: '2015', title: 'stupo s.r.o. a otvorenie cancel', text: 'Zakladám vlastnú firmu a cancel coworking začína spájať ľudí.', kind: 'project' },
  { year: '2017', title: 'Z stupo vzniká Unite', text: 'Firma mení meno na Unite. Softvér a digitálne riešenia pre priemysel a energetiku.', kind: 'project' },
  { year: '2019', title: 'cancel coworking o.z.', text: 'Komunita dostáva vlastné občianske združenie.', kind: 'project' },
  { year: '2025', title: 'Kolega a INOVIA', text: 'AI asistent Kolega v Unite a práca regionálneho inovačného manažéra pre Turiec.', kind: 'project' },
  { year: 'Dnes', title: 'Michal Stupák ako značka', text: 'Blog, AI, komunita. Tu to teraz píšem.', kind: 'life' },
];
