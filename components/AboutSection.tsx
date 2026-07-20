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
            title="A developer who connects design, functionality, and real delivery."
            description="My work combines frontend engineering, mobile development, backend integration, cloud data, documentation, and deployment. I enjoy turning a requirement into a product that people can actually use."
          />
        </Reveal>

        <div className="about-layout">
          <Reveal className="about-story-card">
            <div className="about-story-number">01</div>
            <div>
              <p className="large-copy">
                I focus on building <strong>responsive interfaces</strong>, <strong>Firebase-connected applications</strong>,
                cross-platform mobile apps, and practical digital systems. I care about visual clarity, reusable code,
                secure user data, and making the final project easy to demonstrate and deploy.
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
