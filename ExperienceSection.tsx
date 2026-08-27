import { BriefcaseBusiness, CheckCircle2 } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TechnologyBadge from "@/components/TechnologyBadge";
import { experiences } from "@/data/portfolio";

export default function ExperienceSection() {
  return (
    <section className="section-shell section-shell--tinted" id="experience">
      <div className="site-container">
        <Reveal>
          <SectionHeading
            eyebrow="Experience & growth"
            title="Growing through internships, independent development, credentials, and real delivery."
            description="My experience combines two remote internships, ongoing independent software development, professional credentials, project delivery, debugging, documentation, and deployment."
          />
        </Reveal>

        <div className="experience-layout">
          <Reveal className="experience-summary-card">
            <span className="experience-summary-icon"><BriefcaseBusiness size={28} /></span>
            <p className="experience-summary-label">Current direction</p>
            <h3>Software and mobile application developer working across web, cloud, data, AI, and game-development projects.</h3>
            <ul>
              <li><CheckCircle2 size={17} /> Open to remote, part-time, and full-time roles</li>
              <li><CheckCircle2 size={17} /> Comfortable with independent and collaborative work</li>
              <li><CheckCircle2 size={17} /> Strong interest in real product development</li>
            </ul>
          </Reveal>

          <div className="timeline">
            {experiences.map((experience, index) => (
              <Reveal className="timeline-item" delay={index * 0.08} key={`${experience.organization}-${experience.period}`}>
                <div className="timeline-marker"><span /></div>
                <div className="timeline-content">
                  <div className="timeline-meta">
                    <span>{experience.period}</span>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3>{experience.role}</h3>
                  <h4>{experience.organization}</h4>
                  <p>{experience.description}</p>
                  <div className="tech-list tech-list--small">
                    {experience.tags.map((tag) => <TechnologyBadge key={tag} name={tag} compact />)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
