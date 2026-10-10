import Image from 'next/image';
import { catalog } from '@/data/catalog';
import { clients, contact, mailLink, whatsappLink } from '@/lib/contact';
import { ArrowIcon, MailIcon, WhatsAppIcon } from '@/components/icons';
import Catalog from './Catalog';
import s from './site.module.css';

const total = catalog.reduce((n, c) => n + c.items.length, 0);

// What the client decides on their uniform, pinned to where it shows on the jacket.
// x, y are fractions of the photo; ly is the label row (% of the drawing height).
const callouts = [
  { n: 1, label: 'Modelagem do seu jeito: gola, punhos e bolsos', x: 0.345, y: 0.25, side: 'left', ly: 22 },
  { n: 2, label: 'Zíperes, botões e vivos na cor da sua marca', x: 0.443, y: 0.56, side: 'left', ly: 62 },
  { n: 3, label: 'Seu logo em bordado ou estampa', x: 0.618, y: 0.4, side: 'right', ly: 30 },
  { n: 4, label: 'Tecido e cor à sua escolha', x: 0.6, y: 0.5, side: 'right', ly: 66 },
] as const;

const steps = [
  { title: 'Escolha o modelo', text: 'Use uma referência do catálogo ou mande a sua ideia.' },
  { title: 'Fale com a nossa equipe', text: 'Alinhamos logo, cores, aplicação, quantidades, tamanhos e prazo.' },
  { title: 'Receba o orçamento', text: 'Respondemos pelo WhatsApp.' },
];

// The photo fills the drawing's height and its middle half (x 25–75%); label columns flank it.
const px = (x: number) => 25 + 50 * x;
const py = (y: number) => 100 * y;

export default function Home() {
  return (
    <div className={s.page}>
      <a href="#catalogo" className={s.skip}>
        Pular para o catálogo
      </a>

      <header className={s.header}>
        <a href="#topo" className={s.brand} aria-label="Confidencial Brasil, início">
          <span className={s.symbol} aria-hidden="true" />
          <span className={s.wordmark} aria-hidden="true" />
        </a>
        <nav className={s.nav} aria-label="Seções">
          <a href="#catalogo">Catálogo</a>
          <a href="#producao">Produção</a>
          <a href="#clientes">Clientes</a>
          <a href="#contato">Contato</a>
        </nav>
        <a className={s.headerCta} href={whatsappLink()} target="_blank" rel="noopener">
          <WhatsAppIcon />
          <span>WhatsApp</span>
        </a>
      </header>

      <main id="topo">
        <section className={s.hero} aria-labelledby="hero-title">
          <div className={s.heroCopy}>
            <h1 id="hero-title" className={s.heroTitle}>
              Uniformes corporativos e roupas para eventos, feitos na nossa confecção.
            </h1>
            <p className={s.heroLede}>
              Polos, camisas, jaquetas, coletes e moletons com o bordado e a estampa da sua marca. Equipe com mais de
              30 anos de experiência em confecção.
            </p>
            <div className={s.actions}>
              <a href="#catalogo" className={s.btnPrimary}>
                Ver catálogo <ArrowIcon dir="down" />
              </a>
              <a href={whatsappLink()} target="_blank" rel="noopener" className={s.btnLink}>
                <WhatsAppIcon /> Falar no WhatsApp
              </a>
            </div>
            <ul className={s.specs}>
              <li>
                <strong>{total}</strong> referências no catálogo
              </li>
              <li>Bordado industrial próprio</li>
              <li>Tecidos antiviral, dry e U.V.</li>
            </ul>
          </div>

          <figure className={s.sheet} aria-labelledby="sheet-title">
            <h2 id="sheet-title" className={s.sheetTitle}>
              Você define cada detalhe do uniforme
            </h2>
            <div className={s.drawing}>
              <div className={s.heroPhoto}>
                <Image
                  src="/fotos/jaqueta-modelo.jpg"
                  alt="Modelo vestindo jaqueta puffer preta com o logo Confidencial Brasil bordado no peito"
                  fill
                  priority
                  sizes="(max-width: 900px) 92vw, 32vw"
                />
              </div>
              <svg className={s.leaders} viewBox="0 0 100 66.67" aria-hidden="true">
                {callouts.map((c, i) => {
                  const x = px(c.x);
                  const y = py(c.y);
                  const ax = c.side === 'left' ? 22 : 78;
                  const ex = c.side === 'left' ? ax + 4 : ax - 4;
                  return (
                    <polyline
                      key={c.n}
                      points={`${x},${y * 0.6667} ${ex},${c.ly * 0.6667} ${ax},${c.ly * 0.6667}`}
                      pathLength={1}
                      style={{ animationDelay: `${300 + i * 160}ms` }}
                    />
                  );
                })}
              </svg>
              {callouts.map((c, i) => (
                <span
                  key={c.n}
                  className={s.dot}
                  style={{ '--x': c.x, '--y': c.y, animationDelay: `${200 + i * 160}ms` } as React.CSSProperties}
                  aria-hidden="true"
                >
                  {c.n}
                </span>
              ))}
              {callouts.map((c, i) => (
                <span
                  key={c.n}
                  className={`${s.callout} ${c.side === 'left' ? s.calloutLeft : s.calloutRight}`}
                  style={{ top: `${c.ly}%`, animationDelay: `${600 + i * 160}ms` }}
                  aria-hidden="true"
                >
                  {c.label}
                </span>
              ))}
            </div>
            <ol className={s.legend}>
              {callouts.map((c) => (
                <li key={c.n}>
                  <span className={s.legendNum}>{c.n}</span>
                  {c.label}
                </li>
              ))}
            </ol>
            <ol className={s.steps} aria-label="Como pedir">
              {steps.map((st, i) => (
                <li key={st.title} className={s.step}>
                  <span className={s.stepNum}>{i + 1}</span>
                  <span className={s.stepTitle}>{st.title}</span>
                  <span className={s.stepText}>{st.text}</span>
                </li>
              ))}
            </ol>
          </figure>
        </section>

        <Catalog categories={catalog} />

        <section id="producao" className={s.section} aria-labelledby="producao-title">
          <div className={s.sectionHead}>
            <h2 id="producao-title" className={s.h2}>
              Produção própria
            </h2>
            <p className={s.sectionLede}>
              Equipe com mais de 30 anos de experiência no ramo de confecção. Trabalhamos com fornecedores de insumos
              da mais alta qualidade e com tecidos com tratamento antiviral, dry e U.V.
            </p>
          </div>
          <div className={s.prodGrid}>
            <figure className={s.prodSheet}>
              <div className={s.prodPhoto}>
                <Image
                  src="/fotos/bordadeiras.jpg"
                  alt="Fileira de bordadeiras industriais multicabeças na fábrica"
                  fill
                  sizes="(max-width: 900px) 92vw, 44vw"
                />
              </div>
              <figcaption className={s.prodCaption}>
                Bordadeiras industriais multicabeças
              </figcaption>
            </figure>
            <figure className={s.prodSheet}>
              <div className={s.prodPhoto}>
                <Image
                  src="/fotos/producao.jpg"
                  alt="Camisas dobradas e empilhadas em mesas no galpão de produção"
                  fill
                  sizes="(max-width: 900px) 92vw, 44vw"
                />
              </div>
              <figcaption className={s.prodCaption}>
                Camisas sociais em produção
              </figcaption>
            </figure>
          </div>
          <p className={s.alsoMake}>
            Também produzimos bonés, peças de moda e roupas para eventos, campanhas e ações promocionais.
          </p>
        </section>

        <section id="clientes" className={s.section} aria-labelledby="clientes-title">
          <div className={s.sectionHead}>
            <h2 id="clientes-title" className={s.h2}>
              Alguns clientes
            </h2>
          </div>
          <ul className={s.clients}>
            {clients.map((c) => (
              <li key={c.name}>
                <span
                  className={s.clientLogo}
                  role="img"
                  aria-label={c.name}
                  style={{ '--m': `url('${c.logo}')`, '--w': `${c.width}px`, aspectRatio: `${c.ratio}` } as React.CSSProperties}
                />
              </li>
            ))}
          </ul>
        </section>

        <section id="contato" className={s.contact} aria-labelledby="contato-title">
          <div className={s.contactCopy}>
            <h2 id="contato-title" className={s.h2}>
              Peça um orçamento
            </h2>
            <p className={s.sectionLede}>
              Mande a referência que você gostou, a quantidade e o prazo. A gente responde pelo WhatsApp.
            </p>
          </div>
          <div className={s.contactActions}>
            {contact.whatsapp.map((w, i) => (
              <a
                key={w.number}
                href={whatsappLink(undefined, w.number)}
                target="_blank"
                rel="noopener"
                className={i === 0 ? s.btnWhats : s.btnGhost}
              >
                <WhatsAppIcon /> {w.label}
              </a>
            ))}
            <a href={mailLink} className={s.btnGhost}>
              <MailIcon /> {contact.email}
            </a>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <span>© {new Date().getFullYear()} Confidencial Brasil</span>
        <span>{contact.company} · confidencialbr.com.br</span>
      </footer>
    </div>
  );
}
