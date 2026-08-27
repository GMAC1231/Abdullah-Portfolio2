"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { createPortal } from "react-dom";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import logo from "@/assets/ad-logo.png";
import ThemeToggle from "@/components/ThemeToggle";
import { withBasePath } from "@/lib/paths";

const links = [
  {
    label: "About",
    href: "/#about",
    section: "about",
  },
  {
    label: "Projects",
    href: "/#projects",
    section: "projects",
  },
  {
    label: "Skills",
    href: "/#skills",
    section: "skills",
  },
  {
    label: "Experience",
    href: "/#experience",
    section: "experience",
  },
  {
    label: "Certificates",
    href: "/#certificates",
    section: "certificates",
  },
  {
    label: "DevOS",
    href: "/#terminal",
    section: "terminal",
  },
] as const;

const mobileMenuId = "portfolio-mobile-navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  const menuButtonRef =
    useRef<HTMLButtonElement>(null);

  const closeButtonRef =
    useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateScroll = () => {
      setScrolled(window.scrollY > 16);
    };

    updateScroll();

    window.addEventListener(
      "scroll",
      updateScroll,
      { passive: true },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        updateScroll,
      );
    };
  }, []);

  useEffect(() => {
    const sections = links
      .map((link) =>
        document.getElementById(link.section),
      )
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio -
              a.intersectionRatio,
          )[0];

        if (visible?.target.id) {
          setActive(visible.target.id);
        }
      },
      {
        rootMargin: "-24% 0px -62%",
        threshold: [0.08, 0.25, 0.5],
      },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const root = document.documentElement;
    const menuTrigger = menuButtonRef.current;

    root.classList.add("mobile-nav-open");

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 40);

    const closeFromKeyboard = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const closeFromViewport = () => {
      if (window.innerWidth > 900) {
        setOpen(false);
      }
    };

    const closeFromHash = () => {
      setOpen(false);
    };

    window.addEventListener(
      "keydown",
      closeFromKeyboard,
    );

    window.addEventListener(
      "resize",
      closeFromViewport,
      { passive: true },
    );

    window.addEventListener(
      "hashchange",
      closeFromHash,
    );

    return () => {
      window.clearTimeout(focusTimer);

      root.classList.remove("mobile-nav-open");

      window.removeEventListener(
        "keydown",
        closeFromKeyboard,
      );

      window.removeEventListener(
        "resize",
        closeFromViewport,
      );

      window.removeEventListener(
        "hashchange",
        closeFromHash,
      );

      menuTrigger?.focus();
    };
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
  };

  const mobileNavigation = (
    <div
      className="mobile-menu-layer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-menu-title"
    >
      <button
        type="button"
        className="mobile-menu-backdrop"
        onClick={closeMenu}
        aria-label="Close navigation menu"
        tabIndex={-1}
      />

      <aside
        id={mobileMenuId}
        className="mobile-menu-panel"
      >
        <div className="mobile-menu-heading">
          <div className="mobile-menu-heading-copy">
            <span>Portfolio navigation</span>
            <strong id="mobile-menu-title">
              Explore Abdullah&apos;s work
            </strong>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            className="icon-button mobile-menu-close"
            onClick={closeMenu}
            aria-label="Close navigation menu"
          >
            <X size={21} aria-hidden="true" />
          </button>
        </div>

        <nav
          className="mobile-menu-links"
          aria-label="Mobile navigation"
        >
          {links.map((link, index) => (
            <Link
              key={link.section}
              href={link.href}
              className={
                active === link.section
                  ? "active"
                  : undefined
              }
              aria-current={
                active === link.section
                  ? "page"
                  : undefined
              }
              onClick={closeMenu}
            >
              <span>
                {String(index + 1).padStart(
                  2,
                  "0",
                )}
              </span>

              <strong>{link.label}</strong>
            </Link>
          ))}

          <Link
            href="/#contact"
            onClick={closeMenu}
          >
            <span>07</span>
            <strong>Contact</strong>
          </Link>

          <a
            href={withBasePath(
              "/documents/Abdullah-Muhammad-CV.pdf",
            )}
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
          >
            <span>08</span>
            <strong>View CV</strong>
          </a>
        </nav>

        <div className="mobile-menu-footer">
          <div>
            <small>Visual system</small>
            <strong>Change portfolio theme</strong>
          </div>

          <ThemeToggle />
        </div>
      </aside>
    </div>
  );

  return (
    <header
      className={`site-header ${
        scrolled
          ? "site-header--scrolled"
          : ""
      }`}
    >
      <div className="site-container nav-shell">
        <Link
          href="/"
          className="brand"
          aria-label="Abdullah Muhammad home"
        >
          <span className="brand-mark">
            <Image
              src={logo}
              alt=""
              width={44}
              height={44}
              priority
            />
          </span>

          <span className="brand-copy">
            <strong>Abdullah Muhammad</strong>
            <small>
              Software · Web · Mobile
            </small>
          </span>
        </Link>

        <nav
          className="desktop-nav"
          aria-label="Primary navigation"
        >
          {links.map((link) => (
            <Link
              key={link.section}
              href={link.href}
              className={
                active === link.section
                  ? "active"
                  : ""
              }
              aria-current={
                active === link.section
                  ? "page"
                  : undefined
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <div className="desktop-theme-toggle">
            <ThemeToggle />
          </div>

          <Link
            className="button button--compact button--primary desktop-contact"
            href="/#contact"
          >
            Contact me
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            className="icon-button mobile-menu-button"
            onClick={() => {
              setOpen((current) => !current);
            }}
            aria-label={
              open
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={open}
            aria-controls={mobileMenuId}
          >
            {open ? (
              <X
                size={21}
                aria-hidden="true"
              />
            ) : (
              <Menu
                size={21}
                aria-hidden="true"
              />
            )}
          </button>
        </div>
      </div>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          mobileNavigation,
          document.body,
        )}
    </header>
  );
}
