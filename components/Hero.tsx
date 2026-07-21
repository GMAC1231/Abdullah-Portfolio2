"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  Download,
  Gamepad2,
  Mail,
  MapPin,
  Sparkles,
  TerminalSquare,
} from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import profilePhoto from "@/assets/abdullah-photo.png";
import TechnologyShowcase from "@/components/TechnologyShowcase";
import { contactLinks, projects } from "@/data/portfolio";
import { withBasePath } from "@/lib/paths";

const stats = [
  { value: String(projects.length), label: "Portfolio projects" },
  { value: "62", label: "Credential courses" },
  { value: "7", label: "Major credentials" },
  { value: "2", label: "Remote internships" },
];

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero-section" id="home">
      <div className="hero-glow hero-glow--one" />
      <div className="hero-glow hero-glow--two" />
      <div className="site-container hero-grid">
        <motion.div
          className="hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="availability-pill">
            <span className="availability-dot" />
            Open to software, web, mobile, data, and game-development opportunities
          </div>

          <p className="hero-kicker"><Sparkles size={15} /> Software · Web · Mobile Application Developer</p>
          <h1>
            I build digital products that feel <span>clear, fast, and complete.</span>
          </h1>
          <p className="hero-description">
            I’m <strong>Abdullah Muhammad</strong>, a software developer based in Oman. I build responsive React and Next.js applications, cross-platform Flutter experiences, Firebase and Flask services, data-driven solutions, and Unity game prototypes with a strong focus on maintainable code and reliable user workflows.
          </p>

          <div className="hero-actions">
            <Link className="button button--primary" href="/#terminal">
              <TerminalSquare size={18} /> Launch DEVOS
            </Link>
            <Link className="button button--secondary" href="/#projects">
              Explore projects <ArrowDownRight size={18} />
            </Link>
            <a className="button button--secondary" href={withBasePath("/documents/Abdullah-Muhammad-CV.pdf")} target="_blank" rel="noreferrer">
              <Download size={18} /> View CV
            </a>
          </div>

          <div className="hero-command-hint">
            <TerminalSquare size={15} />
            <span>Try <code>layout console</code>, <code>game snake</code>, or press <kbd>Ctrl K</kbd></span>
          </div>

          <div className="hero-contact-row">
            <a href={`mailto:${contactLinks.email}`}><Mail size={16} /> {contactLinks.email}</a>
            <span><MapPin size={16} /> Oman · Available remotely</span>
          </div>

          <div className="hero-socials">
            <a href={contactLinks.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <FaGithub size={18} />
            </a>
            <a href={contactLinks.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn size={18} />
            </a>
            <a href={contactLinks.itch} target="_blank" rel="noreferrer" aria-label="itch.io game portfolio">
              <Gamepad2 size={19} />
            </a>
            <a href={`mailto:${contactLinks.email}`} aria-label="Email">
              <Mail size={19} />
            </a>
          </div>

          <TechnologyShowcase />
        </motion.div>

        <motion.div
          className="hero-profile-wrap"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.94, x: 30 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-profile-card">
            <div className="profile-card-header">
              <span>Developer profile</span>
              <span className="profile-card-code">AD/2026</span>
            </div>
            <div className="profile-photo-shell">
              <div className="profile-photo-ring" />
              <Image
                src={profilePhoto}
                alt="Abdullah Muhammad"
                className="profile-photo"
                priority
                sizes="(max-width: 900px) 75vw, 420px"
              />
              <div className="profile-floating-badge profile-floating-badge--top">
                <CheckCircle2 size={15} /> Firebase connected
              </div>
              <div className="profile-floating-badge profile-floating-badge--bottom">
                <Sparkles size={15} /> AI-assisted workflow
              </div>
            </div>
            <div className="profile-card-footer">
              <div>
                <small>Current focus</small>
                <strong>React · Flutter · Firebase · Unity</strong>
              </div>
              <a href={contactLinks.linkedin} target="_blank" rel="noreferrer" aria-label="Open LinkedIn">
                <ArrowUpRight size={19} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="site-container hero-stats" aria-label="Portfolio statistics">
        {stats.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
