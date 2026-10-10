'use client';

import { useEffect, useRef, useState } from 'react';
import { CloseIcon, DownloadIcon } from '@/components/icons';
import s from './site.module.css';

const options = [
  { id: 'full', title: 'Qualidade máxima', text: 'Fotos em alta resolução, ideal para imprimir.', size: '~6 MB' },
  { id: 'light', title: 'Versão leve', text: 'Arquivo menor, ideal para enviar por WhatsApp ou e-mail.', size: '~2 MB' },
] as const;

export default function PdfButton() {
  const [busy, setBusy] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const done = () => setBusy(false);
    window.addEventListener('catalog:printed', done);
    return () => window.removeEventListener('catalog:printed', done);
  }, []);

  const choose = (quality: 'full' | 'light') => {
    dialogRef.current?.close();
    setBusy(true);
    window.dispatchEvent(new CustomEvent('catalog:print', { detail: quality }));
  };

  return (
    <>
      <button type="button" className={s.btnSmall} disabled={busy} onClick={() => dialogRef.current?.showModal()}>
        <DownloadIcon /> {busy ? 'Preparando o PDF…' : 'Exportar catálogo em PDF'}
      </button>

      <dialog
        ref={dialogRef}
        className={s.pdfDialog}
        aria-labelledby="pdf-title"
        onClick={(e) => e.target === dialogRef.current && dialogRef.current?.close()}
      >
        <div className={s.pdfDialogBody}>
          <button type="button" className={s.close} onClick={() => dialogRef.current?.close()} aria-label="Fechar">
            <CloseIcon />
          </button>
          <h3 id="pdf-title" className={s.pdfDialogTitle}>
            Exportar catálogo em PDF
          </h3>
          <p className={s.pdfHint}>Escolha a qualidade do arquivo.</p>
          <div className={s.pdfOptions}>
            {options.map((o) => (
              <button key={o.id} type="button" className={s.pdfOption} onClick={() => choose(o.id)}>
                <span className={s.pdfOptionHead}>
                  <span className={s.pdfOptionTitle}>{o.title}</span>
                  <span className={s.ref}>{o.size}</span>
                </span>
                <span className={s.pdfHint}>{o.text}</span>
              </button>
            ))}
          </div>
          <p className={s.pdfNote}>Na janela que abrir, escolha “Salvar como PDF”.</p>
        </div>
      </dialog>
    </>
  );
}
