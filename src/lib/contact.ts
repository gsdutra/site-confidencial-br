export const contact = {
  email: 'confidencialbr@confidencialbr.com.br',
  whatsapp: [
    { label: '+55 (11) 97624-8350', number: '5511976248350' },
    { label: '+55 (11) 99113-2613', number: '5511991132613' },
  ],
  company: 'Segredo Indústria e Comércio Ltda',
};

export function whatsappLink(message?: string, number = contact.whatsapp[0].number) {
  const text = message ?? 'Olá! Vi o site da Confidencial Brasil e quero um orçamento.';
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function quoteMessage(ref: string, name: string) {
  return `Olá! Vi o catálogo da Confidencial Brasil e quero um orçamento da referência ${ref} (${name}).`;
}

export const mailLink = `mailto:${contact.email}?subject=${encodeURIComponent('Orçamento - Confidencial Brasil')}`;

// Client logos: single-color masks (see public/clientes). width is the optical size in px on desktop.
export const clients = [
  { name: 'LG', logo: '/clientes/lg.png', width: 113, ratio: 2.269 },
  { name: 'Google', logo: '/clientes/google.png', width: 131, ratio: 3.044 },
  { name: 'Singer', logo: '/clientes/singer.png', width: 190, ratio: 6.606 },
  { name: 'LOUD', logo: '/clientes/loud.png', width: 173, ratio: 5.331 },
  { name: 'Vanderlande', logo: '/clientes/vanderlande.png', width: 190, ratio: 6.513 },
  { name: 'Locaweb', logo: '/clientes/locaweb.png', width: 166, ratio: 4.95 },
  { name: 'CAE', logo: '/clientes/cae.png', width: 122, ratio: 2.663 },
  { name: 'Tetra Pak', logo: '/clientes/tetrapak.png', width: 74, ratio: 1.0 },
];
