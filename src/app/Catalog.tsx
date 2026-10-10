'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Category } from '@/data/catalog';
import { quoteMessage, whatsappLink } from '@/lib/contact';
import { ArrowIcon, CloseIcon, WhatsAppIcon } from '@/components/icons';
import s from './site.module.css';

// The PDF lays the catalog out as fixed A4 pages of 12 pieces (4 x 3), one category per page run.
const PER_PAGE = 12;
function printPages(categories: Category[]) {
  return categories.flatMap((cat) => {
    const parts = Math.ceil(cat.items.length / PER_PAGE);
    return Array.from({ length: parts }, (_, i) => ({
      cat,
      part: i + 1,
      parts,
      items: cat.items.slice(i * PER_PAGE, (i + 1) * PER_PAGE),
    }));
  });
}

export default function Catalog({ categories }: { categories: Category[] }) {
  const [active, setActive] = useState(categories[0].slug);
  const [open, setOpen] = useState<number | null>(null);
  // null = not printing; otherwise the photo quality chosen in the PDF dialog
  const [printAll, setPrintAll] = useState<null | 'full' | 'light'>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const cat = categories.find((c) => c.slug === active)!;
  const item = open !== null ? cat.items[open] : null;

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);

  // The PDF button asks for the full catalog; once every photo has loaded, open the print dialog.
  useEffect(() => {
    const start = (e: Event) => setPrintAll((e as CustomEvent<'full' | 'light'>).detail === 'light' ? 'light' : 'full');
    window.addEventListener('catalog:print', start);
    return () => window.removeEventListener('catalog:print', start);
  }, []);

  useEffect(() => {
    if (!printAll) return;
    const imgs = Array.from(printRef.current?.querySelectorAll('img') ?? []);
    const loaded = imgs.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) return resolve();
          img.addEventListener('load', () => resolve(), { once: true });
          img.addEventListener('error', () => resolve(), { once: true });
        }),
    );
    const done = () => {
      setPrintAll(null);
      window.dispatchEvent(new Event('catalog:printed'));
    };
    window.addEventListener('afterprint', done, { once: true });
    Promise.all(loaded).then(() => requestAnimationFrame(() => window.print()));
    return () => window.removeEventListener('afterprint', done);
  }, [printAll]);

  const step = useCallback(
    (delta: number) => setOpen((i) => (i === null ? i : (i + delta + cat.items.length) % cat.items.length)),
    [cat.items.length],
  );

  const onTabKey = (e: React.KeyboardEvent, idx: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (idx + (e.key === 'ArrowRight' ? 1 : -1) + categories.length) % categories.length;
    setActive(categories[next].slug);
    tabsRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  };

  return (
    <section id="catalogo" className={s.catalog} aria-labelledby="catalogo-title">
      <div className={s.catalogHead}>
        <h2 id="catalogo-title" className={s.h2}>
          Catálogo
        </h2>
        <p className={s.sectionLede}>
          Toque numa peça para ver a ficha e pedir orçamento pela referência. Cores, logo e aplicações são feitos sob
          medida para a sua empresa.
        </p>
      </div>

      <div className={s.tabsWrap}>
        <div className={s.tabs} role="tablist" aria-label="Categorias" ref={tabsRef}>
          {categories.map((c, i) => (
            <button
              key={c.slug}
              role="tab"
              type="button"
              id={`tab-${c.slug}`}
              aria-selected={c.slug === active}
              aria-controls="catalogo-grid"
              tabIndex={c.slug === active ? 0 : -1}
              className={s.tab}
              onClick={() => setActive(c.slug)}
              onKeyDown={(e) => onTabKey(e, i)}
            >
              {c.label}
              <span className={s.tabCount}>{c.items.length}</span>
            </button>
          ))}
        </div>
      </div>

      <ul id="catalogo-grid" role="tabpanel" aria-labelledby={`tab-${active}`} className={s.grid} key={active}>
        {cat.items.map((it, i) => (
          <li key={it.ref} style={{ animationDelay: `${Math.min(i, 12) * 35}ms` }}>
            <button type="button" className={s.card} onClick={() => setOpen(i)} aria-label={`${it.ref}, ${it.name}: abrir ficha`}>
              <span className={s.cardPhoto}>
                <Image src={it.src} alt="" fill sizes="(max-width: 600px) 46vw, (max-width: 1100px) 31vw, 23vw" />
                <span className={s.crop} aria-hidden="true" />
              </span>
              <span className={s.cardMeta}>
                <span className={s.ref}>{it.ref}</span>
                <span className={s.cardName}>{it.name}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {printAll && (
        <div ref={printRef} className={s.printCatalog}>
          {printPages(categories).map((pg, pi) => (
            <div key={`${pg.cat.slug}-${pg.part}`} className={s.printPage}>
              {pi === 0 && (
                <div className={s.printIntro}>
                  <h2 className={s.h2}>Catálogo</h2>
                  <p className={s.sectionLede}>
                    Clique numa peça para pedir orçamento pelo WhatsApp com a referência. Cores, logo e aplicações são
                    feitos sob medida para a sua empresa.
                  </p>
                </div>
              )}
              <h3 className={s.printCategoryTitle}>
                {pg.cat.label}
                <span className={s.tabCount}>
                  {pg.parts > 1 ? `${pg.part} de ${pg.parts}` : `${pg.cat.items.length} peças`}
                </span>
              </h3>
              <ul className={s.printGrid}>
                {pg.items.map((it) => (
                  <li key={it.ref}>
                    <a href={whatsappLink(quoteMessage(it.ref, it.name))} className={s.card}>
                      <span className={s.cardPhoto}>
                        {/* Plain JPEGs: Chrome embeds JPEG as-is in the PDF, but re-encodes WebP as heavy PNG. */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={printAll === 'light' ? it.src.replace('/produtos/', '/produtos/leve/') : it.src}
                          alt=""
                          className={s.printImg}
                        />
                      </span>
                      <span className={s.cardMeta}>
                        <span className={s.ref}>{it.ref}</span>
                        <span className={s.cardName}>{it.name}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <dialog
        ref={dialogRef}
        className={s.dialog}
        aria-labelledby="ficha-title"
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === dialogRef.current && setOpen(null)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1);
          if (e.key === 'ArrowLeft') step(-1);
        }}
      >
        {item && (
          <div className={s.dialogSheet}>
            <div className={s.dialogPhoto}>
              <Image src={item.src} alt={item.name} fill loading="eager" sizes="(max-width: 900px) 92vw, 50vw" />
            </div>
            <div className={s.dialogBody}>
              <button type="button" className={s.close} onClick={() => setOpen(null)} aria-label="Fechar ficha">
                <CloseIcon />
              </button>
              <p className={s.dialogRef}>
                {item.ref}{' '}
                <span className={s.dialogCat}>{cat.label}</span>
              </p>
              <h3 id="ficha-title" className={s.dialogTitle}>
                {item.name}
              </h3>
              <p className={s.dialogNote}>
                Modelo de referência. Fazemos na cor, no tecido e com o logo da sua empresa, em bordado ou estampa.
              </p>
              <a href={whatsappLink(quoteMessage(item.ref, item.name))} target="_blank" rel="noopener" className={s.btnWhats}>
                <WhatsAppIcon /> Pedir orçamento da {item.ref}
              </a>
              <div className={s.pager}>
                <span className={s.pagerCount}>
                  {open! + 1} de {cat.items.length}
                </span>
                <button type="button" onClick={() => step(-1)} aria-label="Peça anterior">
                  <ArrowIcon dir="left" />
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Próxima peça">
                  <ArrowIcon />
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
