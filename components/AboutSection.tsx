import Link from "next/link";
import { ArrowUpRight, Blocks, Braces, Workflow } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const values = [
  {
    icon: Blocks,
    title: "Component-first development",
    text: "I break interfaces into reusable, maintainable pieces instead of building one large page that is difficult to extend.",
  },
  {
    icon: Workflow,
    title: "Complete user workflows",
    text: "I think beyond individual screens and connect navigation, validation, data, feedback, and deployment into one working experience.",
  },
  {
    icon: Braces,
    title: "AI-assisted, human-reviewed",
    text: "I use AI tools to accelerate research, debugging, and documentation while reviewing logic and making final implementation decisions myself.",
  },
];

export default function AboutSection() {
  return (
    <section className="section-shell" id="about">
      <div className="site-container">
        <Reveal>
          <SectionHeading
            eyebrow="About me"
            title="A multidisciplinary developer connecting software, data, AI, and interactive experiences."
            description="My work combines frontend and mobile engineering, backend integration, Firebase, analytics, AI-assisted development, Unity game production, documentation, and deployment."
          />
        </Reveal>

        <div className="about-layout">
          <Reveal className="about-story-card">
            <div className="about-story-number">01</div>
            <div>
              <p className="large-copy">
                I focus on building <strong>responsive interfaces</strong>, <strong>Firebase-connected applications</strong>, cross-platform mobile apps, Python and Flask services, data-driven dashboards, and Unity game prototypes. I care about visual clarity, reusable code, secure user data, and making the final result easy to test, document, and deploy.
              </p>
              <Link className="text-link" href="/#contact">
                Start a conversation <ArrowUpRight size={17} />
              </Link>
            </div>
          </Reveal>

          <div className="about-values">
            {values.map((value, index) => (
              <Reveal className="value-card" delay={index * 0.08} key={value.title}>
                <span className="value-icon"><value.icon size={22} /></span>
                <div>
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
