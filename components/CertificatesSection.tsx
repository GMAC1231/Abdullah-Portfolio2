"use client";

import { Award, ExternalLink, FileText, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TechnologyBadge from "@/components/TechnologyBadge";
import { certificates } from "@/data/portfolio";
import { withBasePath } from "@/lib/paths";

type SelectedCertificate = (typeof certificates)[number] | null;

export default function CertificatesSection() {
  const [selected, setSelected] = useState<SelectedCertificate>(null);
  const [filter, setFilter] = useState("All");

  const filters = useMemo(
    () => ["All", ...Array.from(new Set(certificates.map((certificate) => certificate.category)))],
    [],
  );

  const filteredCertificates = useMemo(
    () => filter === "All" ? certificates : certificates.filter((certificate) => certificate.category === filter),
    [filter],
  );

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
            eyebrow="Professional credentials"
            title="Seven major credentials covering 62 courses across software, mobile, AI, data, BI, and games."
            description="My professional learning includes IBM, Google, and Michigan State University credentials, together with a completed remote web-development internship."
            centered
          />
        </Reveal>

        <Reveal>
          <div className="project-filter certificate-filter" aria-label="Certificate filters">
            {filters.map((item) => (
              <button
                type="button"
                className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)}
                key={item}
              >
                {item}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="certificate-grid">
          {filteredCertificates.map((certificate, index) => (
            <Reveal className="certificate-card" delay={(index % 4) * 0.06} key={certificate.title}>
              <div className="certificate-card-top">
                <span className="certificate-icon"><Award size={26} /></span>
                <span className="certificate-number">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <p>{certificate.issuer} · {certificate.date}</p>
              <h3>{certificate.title}</h3>
              <div className="certificate-skills">
                {certificate.skills.slice(0, 5).map((skill) => (
                  <TechnologyBadge key={skill} name={skill} compact />
                ))}
              </div>
              <div className="certificate-divider" />
              <div className="certificate-footer">
                <span><FileText size={16} /> {certificate.courses}</span>
                <div className="certificate-actions">
                  <button type="button" onClick={() => setSelected(certificate)}>
                    Preview <ExternalLink size={15} />
                  </button>
                </div>
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
