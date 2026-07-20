import {
  Braces,
  Database,
  ServerCog,
  Smartphone,
  Sparkles,
  Wrench,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TechnologyBadge from "@/components/TechnologyBadge";
import { skillGroups } from "@/data/portfolio";

const iconMap = {
  code: Braces,
  mobile: Smartphone,
  server: ServerCog,
  database: Database,
  tools: Wrench,
  sparkles: Sparkles,
};

export default function SkillsSection() {
  return (
    <section className="section-shell" id="skills">
      <div className="site-container">
        <Reveal>
          <SectionHeading
            eyebrow="Technical capabilities"
            title="A practical toolkit across frontend, mobile, backend, and cloud."
            description="I choose technologies based on the product requirement and focus on connecting them into a clear, maintainable workflow."
            centered
          />
        </Reveal>

        <div className="skills-grid">
          {skillGroups.map((group, index) => {
            const Icon = iconMap[group.icon as keyof typeof iconMap];
            return (
              <Reveal className="skill-group" delay={(index % 3) * 0.07} key={group.title}>
                <div className="skill-group-top">
                  <span><Icon size={23} /></span>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                </div>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <div className="skill-pills">
                  {group.skills.map((skill) => <TechnologyBadge key={skill} name={skill} showSymbol />)}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
