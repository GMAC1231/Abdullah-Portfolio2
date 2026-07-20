"use client";

import { Award, ExternalLink, FileText, X } from "lucide-react";
import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { certificates } from "@/data/portfolio";
import { withBasePath } from "@/lib/paths";

type SelectedCertificate = (typeof certificates)[number] | null;

export default function CertificatesSection() {
  const [selected, setSelected] = useState<SelectedCertificate>(null);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section className="section-shell" id="certificates">
      <div className="site-container">
        <Reveal>
          <SectionHeading
            eyebrow="Professional certificates"
            title="Professional certificates and internship achievements."
            description="Credentials include a Qwetrum Technologies Web Development remote internship and three IBM Professional Certificates covering 39 courses in mobile, AI, and full-stack development."
            centered
          />
        </Reveal>

        <div className="certificate-grid">
          {certificates.map((certificate, index) => (
            <Reveal className="certificate-card" delay={index * 0.08} key={certificate.title}>
              <div className="certificate-card-top">
                <span className="certificate-icon"><Award size={26} /></span>
                <span className="certificate-number">0{index + 1}</span>
              </div>
              <p>{certificate.issuer} · {certificate.date}</p>
              <h3>{certificate.title}</h3>
              <div className="certificate-divider" />
              <div className="certificate-footer">
                <span><FileText size={16} /> {certificate.courses}</span>
                <button type="button" onClick={() => setSelected(certificate)}>
                  Preview <ExternalLink size={15} />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {selected ? (
        <div className="document-modal" role="dialog" aria-modal="true" aria-label={selected.title}>
          <button className="document-modal-backdrop" type="button" onClick={() => setSelected(null)} aria-label="Close certificate preview" />
          <div className="document-modal-panel">
            <div className="document-modal-header">
              <div>
                <small>{selected.issuer} · {selected.date}</small>
                <strong>{selected.title}</strong>
              </div>
              <div className="document-modal-actions">
                <a href={withBasePath(selected.file)} target="_blank" rel="noreferrer">Open PDF <ExternalLink size={15} /></a>
                <button className="icon-button" type="button" onClick={() => setSelected(null)} aria-label="Close preview">
                  <X size={19} />
                </button>
              </div>
            </div>
            <iframe src={withBasePath(selected.file)} title={selected.title} />
          </div>
        </div>
      ) : null}
    </section>
  );
}
