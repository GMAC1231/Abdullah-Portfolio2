"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Gamepad2,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import {
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";

import Reveal from "@/components/Reveal";
import { contactLinks } from "@/data/portfolio";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(
        contactLinks.email,
      );

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      window.location.href =
        `mailto:${contactLinks.email}`;
    }
  }

  return (
    <section
      className="contact-section"
      id="contact"
    >
      <div className="site-container contact-grid contact-grid--single">
        <Reveal className="contact-copy">
          <div className="eyebrow eyebrow--light">
            <span />
            Let&apos;s work together
          </div>

          <h2>
            Have a project, opportunity, or idea
            worth building?
          </h2>

          <p>
            I&apos;m open to frontend, web, mobile,
            internship, freelance, part-time,
            full-time, and remote opportunities.
            Feel free to contact me through email,
            WhatsApp, LinkedIn, or GitHub.
          </p>

          <div className="contact-direct-list">
            <button
              type="button"
              onClick={copyEmail}
            >
              <span>
                <Mail size={20} />
              </span>

              <div>
                <small>Email</small>
                <strong>
                  {contactLinks.email}
                </strong>
              </div>

              {copied ? (
                <Check size={18} />
              ) : (
                <Copy size={18} />
              )}
            </button>

            <a
              href={contactLinks.whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <MessageCircle size={20} />
              </span>

              <div>
                <small>WhatsApp</small>
                <strong>
                  {contactLinks.phone}
                </strong>
              </div>

              <ArrowUpRight size={18} />
            </a>

            <div className="contact-location">
              <span>
                <MapPin size={20} />
              </span>

              <div>
                <small>Location</small>
                <strong>
                  Oman · Available remotely
                </strong>
              </div>
            </div>
          </div>

          <div className="contact-social-row">
            <a
              href={contactLinks.github}
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub size={17} />
              GitHub
            </a>

            <a
              href={contactLinks.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedinIn size={17} />
              LinkedIn
            </a>

            <a
              href={contactLinks.itch}
              target="_blank"
              rel="noreferrer"
            >
              <Gamepad2 size={17} />
              Game Portfolio
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}