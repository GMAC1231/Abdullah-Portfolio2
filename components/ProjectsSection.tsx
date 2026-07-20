"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Blocks,
  ExternalLink,
  GitBranch,
  Globe2,
  Smartphone,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useMemo, useState } from "react";
import ProjectInternshipLinks from "@/components/ProjectInternshipLinks";
import ProjectVisual from "@/components/ProjectVisual";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TechnologyBadge from "@/components/TechnologyBadge";
import { projects, type ProjectCategory } from "@/data/portfolio";

const filters: Array<"All" | ProjectCategory> = [
  "All",
  "React",
  "Frontend",
  "Mobile",
  "Full Stack",
  "Firebase",
  "Guide",
  "Portfolio",
];

export default function ProjectsSection() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const filteredProjects = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((project) => project.categories.includes(filter)),
    [filter],
  );

  const featured = projects.find((project) => project.featured) ?? projects[0];

  const projectStats = [
    {
      label: "Portfolio projects",
      value: projects.length,
      detail: "Complete case studies",
      code: "PROJECTS",
      Icon: Blocks,
    },
    {
      label: "Live applications",
      value: projects.filter(
        (project) => Boolean(project.liveUrl || project.deploymentUrl),
      ).length,
      detail: "Publicly accessible",
      code: "DEPLOYED",
      Icon: Globe2,
    },
    {
      label: "Mobile projects",
      value: projects.filter((project) =>
        project.categories.includes("Mobile"),
      ).length,
      detail: "Android and cross-platform",
      code: "MOBILE",
      Icon: Smartphone,
    },
    {
      label: "Source repositories",
      value: projects.filter((project) => Boolean(project.githubUrl)).length,
      detail: "GitHub project sources",
      code: "SOURCE",
      Icon: GitBranch,
    },
  ];

  const filterCount = (item: (typeof filters)[number]) =>
    item === "All"
      ? projects.length
      : projects.filter((project) => project.categories.includes(item)).length;

  return (
    <section className="section-shell section-shell--tinted" id="projects">
      <div className="site-container">
        <Reveal>
          <div className="section-topline">
            <SectionHeading
              eyebrow="Selected projects"
              title="Projects built to solve real interface and workflow problems."
              description="Each project represents a different part of my development journey—from responsive frontend systems to mobile apps and Firebase-connected platforms."
            />
            <a
              className="text-link section-side-link"
              href="https://github.com/GMAC1231"
              target="_blank"
              rel="noreferrer"
            >
              View GitHub profile <ArrowUpRight size={17} />
            </a>
          </div>
        </Reveal>

        <Reveal className="featured-project">
          <div className="featured-project-copy">
            <div className="eyebrow">
              <span />Featured case study
            </div>
            <p className="project-index">
              01 / {String(projects.length).padStart(2, "0")}
            </p>
            <h3>{featured.title}</h3>
            <p>{featured.summary}</p>
            {featured.internship ? (
              <ProjectInternshipLinks internship={featured.internship} />
            ) : null}
            <div className="tech-list">
              {featured.technologies.slice(0, 6).map((technology) => (
                <TechnologyBadge key={technology} name={technology} />
              ))}
            </div>
            <div className="project-links project-links--complete">
              <Link
                className="button button--primary"
                href={`/projects/${featured.slug}`}
              >
                View case study <ArrowUpRight size={17} />
              </Link>

              {featured.liveUrl ? (
                <a
                  className="button button--secondary"
                  href={featured.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live project <ExternalLink size={17} />
                </a>
              ) : featured.deploymentUrl ? (
                <a
                  className="button button--secondary"
                  href={featured.deploymentUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  View deployment <ExternalLink size={17} />
                </a>
              ) : null}

              <a
                className="button button--secondary button--github"
                href={featured.githubUrl ?? "https://github.com/GMAC1231"}
                target="_blank"
                rel="noreferrer"
              >
                {featured.githubUrl ? "GitHub repository" : "GitHub profile"}
                <FaGithub size={17} />
              </a>
            </div>
          </div>
          <ProjectVisual project={featured} />
        </Reveal>

        <Reveal className="project-stats-grid">
          {projectStats.map(({ label, value, detail, code, Icon }) => (
            <article className="project-stat-card" key={label}>
              <div className="project-stat-card__top">
                <span className="project-stat-card__icon" aria-hidden="true">
                  <Icon size={19} />
                </span>
                <code>{code}</code>
              </div>
              <div className="project-stat-card__content">
                <strong>{String(value).padStart(2, "0")}</strong>
                <div>
                  <span>{label}</span>
                  <small>{detail}</small>
                </div>
              </div>
              <i className="project-stat-card__line" aria-hidden="true" />
            </article>
          ))}
        </Reveal>

        <div className="project-filter-shell">
          <div
            className="project-filter"
            role="group"
            aria-label="Filter projects"
          >
            {filters.map((item) => (
              <button
                type="button"
                key={item}
                className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
              >
                <span>{item}</span>
                <b>{filterCount(item)}</b>
              </button>
            ))}
          </div>

          <p className="project-result-count" aria-live="polite">
            Showing <strong>{filteredProjects.length}</strong> of{" "}
            <strong>{projects.length}</strong> projects
            <code>{filter.toLowerCase().replace(" ", "-")}</code>
          </p>
        </div>

        <div className="project-grid">
          {filteredProjects.map((project, index) => {
            const projectNumber =
              projects.findIndex((item) => item.slug === project.slug) + 1;

            return (
              <Reveal
                className="project-card"
                delay={(index % 3) * 0.06}
                key={project.slug}
              >
                <ProjectVisual project={project} compact />
                <div className="project-card-body">
                  <div className="project-card-meta">
                    <span>{project.eyebrow}</span>
                    <span>{String(projectNumber).padStart(2, "0")}</span>
                  </div>
                  {project.internship ? (
                    <ProjectInternshipLinks
                      internship={project.internship}
                      compact
                    />
                  ) : null}
                  <h3>{project.shortTitle}</h3>
                  <p>{project.summary}</p>
                  <div className="tech-list tech-list--small">
                    {project.technologies.slice(0, 4).map((technology) => (
                      <TechnologyBadge
                        key={technology}
                        name={technology}
                        compact
                      />
                    ))}
                  </div>
                  <div className="project-card-actions">
                    <Link
                      className="project-card-action project-card-action--primary"
                      href={`/projects/${project.slug}`}
                      aria-label={`View ${project.title} case study`}
                    >
                      View case study <ArrowUpRight size={15} />
                    </Link>

                    {project.liveUrl ? (
                      <a
                        className="project-card-action"
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Live project <ExternalLink size={15} />
                      </a>
                    ) : project.deploymentUrl ? (
                      <a
                        className="project-card-action"
                        href={project.deploymentUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Deployment <ExternalLink size={15} />
                      </a>
                    ) : null}

                    <a
                      className="project-card-action project-card-action--github"
                      href={project.githubUrl ?? "https://github.com/GMAC1231"}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={
                        project.githubUrl
                          ? `${project.title} GitHub repository`
                          : "Abdullah Muhammad GitHub profile"
                      }
                    >
                      <FaGithub size={15} />
                      {project.githubUrl ? "GitHub repository" : "GitHub profile"}
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
