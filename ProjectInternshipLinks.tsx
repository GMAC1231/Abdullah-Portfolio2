import { Building2, ExternalLink } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import type { ProjectInternship } from "@/data/portfolio";

type ProjectInternshipLinksProps = {
  internship: ProjectInternship;
  compact?: boolean;
};

export default function ProjectInternshipLinks({
  internship,
  compact = false,
}: ProjectInternshipLinksProps) {
  const companyUrl = internship.websiteUrl ?? internship.linkedInUrl;

  return (
    <div
      className={`project-internship${compact ? " project-internship--compact" : ""}`}
    >
      <span className="project-internship__icon" aria-hidden="true">
        <Building2 size={compact ? 14 : 17} />
      </span>

      <div className="project-internship__copy">
        <small>Internship project</small>
        <a href={companyUrl} target="_blank" rel="noreferrer">
          {internship.company}
          <ExternalLink size={compact ? 11 : 13} />
        </a>
        {!compact ? <span>{internship.program}</span> : null}
      </div>

      <div className="project-internship__links">
        {internship.websiteUrl ? (
          <a
            href={internship.websiteUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`${internship.company} official website`}
            title="Official website"
          >
            <ExternalLink size={compact ? 13 : 15} />
          </a>
        ) : null}
        <a
          href={internship.linkedInUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`${internship.company} LinkedIn page`}
          title="LinkedIn"
        >
          <FaLinkedin size={compact ? 13 : 15} />
        </a>
      </div>
    </div>
  );
}
