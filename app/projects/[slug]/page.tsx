import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Lightbulb,
  Target,
  Trophy,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProjectInternshipLinks from "@/components/ProjectInternshipLinks";
import ProjectVisual from "@/components/ProjectVisual";
import TechnologyBadge from "@/components/TechnologyBadge";
import { projects } from "@/data/portfolio";

export const dynamicParams = false;

type Project = (typeof projects)[number];

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface ProjectActionsProps {
  project: Project;
  compact?: boolean;
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.shortTitle,
    description: project.summary,
  };
}

function ProjectActions({
  project,
  compact = false,
}: ProjectActionsProps) {
  const githubUrl =
    project.githubUrl?.trim() || "https://github.com/GMAC1231";

  const githubLabel = project.githubUrl
    ? "GitHub repository"
    : "GitHub profile";

  if (compact) {
    return (
      <div className="related-project-actions">
        <Link
          className="related-project-action related-project-action--primary"
          href={`/projects/${project.slug}`}
          aria-label={`View ${project.title} case study`}
        >
          View case study
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>

        {project.liveUrl ? (
          <a
            className="related-project-action"
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title} live project`}
          >
            Live project
            <ExternalLink size={15} aria-hidden="true" />
          </a>
        ) : null}

        {!project.liveUrl && project.deploymentUrl ? (
          <a
            className="related-project-action"
            href={project.deploymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title} deployment`}
          >
            Deployment
            <ExternalLink size={15} aria-hidden="true" />
          </a>
        ) : null}

        <a
          className="related-project-action related-project-action--github"
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={
            project.githubUrl
              ? `Open ${project.title} GitHub repository`
              : "Open Abdullah Muhammad GitHub profile"
          }
        >
          <FaGithub size={15} aria-hidden="true" />
          {githubLabel}
        </a>
      </div>
    );
  }

  return (
    <div className="project-links">
      {project.liveUrl ? (
        <a
          className="button button--primary"
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title} live project`}
        >
          View live project
          <ExternalLink size={17} aria-hidden="true" />
        </a>
      ) : null}

      {project.deploymentUrl ? (
        <a
          className="button button--secondary"
          href={project.deploymentUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title} deployment`}
        >
          View deployment
          <ExternalLink size={17} aria-hidden="true" />
        </a>
      ) : null}

      <a
        className="button button--secondary button--github"
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={
          project.githubUrl
            ? `Open ${project.title} GitHub repository`
            : "Open Abdullah Muhammad GitHub profile"
        }
      >
        <FaGithub size={16} aria-hidden="true" />
        {githubLabel}
      </a>
    </div>
  );
}

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = projects
    .filter((item) => item.slug !== project.slug)
    .slice(0, 3);

  return (
    <>
      <Header />

      <main className="project-detail-page theme-aware-project-page">
        <section className="project-detail-hero">
          <div className="site-container">
            <Link href="/#projects" className="back-link">
              <ArrowLeft size={17} aria-hidden="true" />
              Back to projects
            </Link>

            <div className="project-detail-grid">
              <div className="project-detail-copy">
                <div className="eyebrow">
                  <span />
                  {project.eyebrow}
                </div>

                <h1>{project.title}</h1>

                <p>{project.summary}</p>

                {project.internship ? (
                  <ProjectInternshipLinks
                    internship={project.internship}
                  />
                ) : null}

                <div className="tech-list">
                  {project.technologies.map((technology) => (
                    <TechnologyBadge
                      key={technology}
                      name={technology}
                    />
                  ))}
                </div>

                <ProjectActions project={project} />
              </div>

              <ProjectVisual project={project} />
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="site-container case-study-layout">
            <div className="case-study-main">
              <article className="case-study-block">
                <span className="case-study-icon">
                  <Target size={22} aria-hidden="true" />
                </span>

                <div>
                  <small>Project overview</small>
                  <h2>What I built</h2>
                  <p>{project.description}</p>
                </div>
              </article>

              <article className="case-study-block">
                <span className="case-study-icon">
                  <Lightbulb size={22} aria-hidden="true" />
                </span>

                <div>
                  <small>The challenge</small>
                  <h2>Problem and constraints</h2>
                  <p>{project.challenge}</p>
                </div>
              </article>

              <article className="case-study-block">
                <span className="case-study-icon">
                  <CheckCircle2 size={22} aria-hidden="true" />
                </span>

                <div>
                  <small>The solution</small>
                  <h2>My approach</h2>
                  <p>{project.solution}</p>
                </div>
              </article>

              <article className="case-study-block">
                <span className="case-study-icon">
                  <Trophy size={22} aria-hidden="true" />
                </span>

                <div>
                  <small>The outcome</small>
                  <h2>Result and learning</h2>
                  <p>{project.outcome}</p>
                </div>
              </article>
            </div>

            <aside className="case-study-sidebar">
              <div className="case-study-sidebar-card">
                <small>Key features</small>

                <ul>
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>
                      <CheckCircle2
                        size={16}
                        aria-hidden="true"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {project.internship ? (
                <div className="case-study-sidebar-card project-internship-sidebar">
                  <small>Internship context</small>

                  <h3>{project.internship.company}</h3>

                  <p>{project.internship.program}</p>

                  <ProjectInternshipLinks
                    internship={project.internship}
                  />
                </div>
              ) : null}

              <div className="case-study-sidebar-card">
                <small>Technology stack</small>

                <div className="skill-pills">
                  {project.technologies.map((technology) => (
                    <TechnologyBadge
                      key={technology}
                      name={technology}
                    />
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="section-shell section-shell--tinted">
          <div className="site-container">
            <div className="section-topline related-heading">
              <div className="section-heading">
                <div className="eyebrow">
                  <span />
                  More work
                </div>

                <h2>Continue exploring my projects.</h2>
              </div>

              <Link className="text-link" href="/#projects">
                View all projects
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>

            <div className="related-project-grid">
              {relatedProjects.map((relatedProject) => (
                <article
                  className="related-project-card"
                  key={relatedProject.slug}
                >
                  <ProjectVisual
                    project={relatedProject}
                    compact
                  />

                  <div className="related-project-card__body">
                    <small>{relatedProject.eyebrow}</small>

                    <h3>{relatedProject.shortTitle}</h3>

                    <ProjectActions
                      project={relatedProject}
                      compact
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}