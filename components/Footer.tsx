import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import logo from "@/assets/ad-logo.png";
import { contactLinks } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <div className="footer-brand">
          <Image src={logo} alt="AD logo" width={48} height={48} />
          <div><strong>Abdullah Muhammad</strong><span>Frontend · Web · Mobile Developer</span></div>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/#about">About</Link>
          <Link href="/#projects">Projects</Link>
          <Link href="/#skills">Skills</Link>
          <Link href="/#experience">Experience</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <div className="footer-socials">
          <a href={contactLinks.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub size={17} /></a>
          <a href={contactLinks.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn size={17} /></a>
          <a href={`mailto:${contactLinks.email}`} aria-label="Email"><Mail size={18} /></a>
          <a href="#top" aria-label="Back to top"><ArrowUp size={18} /></a>
        </div>
      </div>
      <div className="site-container footer-bottom">
        <span>© {new Date().getFullYear()} Abdullah Muhammad. Built with React, Next.js, TypeScript, and Tailwind CSS.</span>
        <span>Designed and developed in Oman.</span>
      </div>
    </footer>
  );
}
