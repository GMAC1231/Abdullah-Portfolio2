"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/ad-logo.png";
import ThemeToggle from "@/components/ThemeToggle";
import { withBasePath } from "@/lib/paths";

const links = [
  { label: "About", href: "/#about", section: "about" },
  { label: "Projects", href: "/#projects", section: "projects" },
  { label: "Skills", href: "/#skills", section: "skills" },
  { label: "Experience", href: "/#experience", section: "experience" },
  { label: "Certificates", href: "/#certificates", section: "certificates" },
  { label: "DevOS", href: "/#terminal", section: "terminal" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 16);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.section))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-28% 0px -58%", threshold: [0.08, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <div className="site-container nav-shell">
        <Link href="/" className="brand" aria-label="Abdullah Muhammad home">
          <span className="brand-mark">
            <Image src={logo} alt="AD logo" width={44} height={44} priority />
          </span>
          <span className="brand-copy">
            <strong>Abdullah Muhammad</strong>
            <small>Software · Web · Mobile</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <Link
              key={link.section}
              href={link.href}
              className={active === link.section ? "active" : ""}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <ThemeToggle />
          <Link className="button button--compact button--primary desktop-contact" href="/#contact">
            Contact me
          </Link>
          <button
            type="button"
            className="icon-button mobile-menu-button"
            onClick={() => setOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-menu-layer" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <button className="mobile-menu-backdrop" onClick={() => setOpen(false)} aria-label="Close menu" />
          <div className="mobile-menu-panel">
            <div className="mobile-menu-heading">
              <span>Navigate</span>
              <button className="icon-button" onClick={() => setOpen(false)} aria-label="Close navigation menu">
                <X size={20} />
              </button>
            </div>
            <div className="mobile-menu-links">
              {links.map((link, index) => (
                <Link key={link.section} href={link.href} onClick={() => setOpen(false)}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {link.label}
                </Link>
              ))}
              <Link href="/#contact" onClick={() => setOpen(false)}>
                <span>07</span>
                Contact
              </Link>
              <a href={withBasePath("/documents/Abdullah-Muhammad-CV.pdf")} target="_blank" rel="noreferrer">
                <span>08</span>
                View CV
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
