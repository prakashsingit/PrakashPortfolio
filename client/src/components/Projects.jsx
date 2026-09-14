import { useState } from "react";
import SyncArchitectureDiagram from "./SyncArchitectureDiagram";

export default function Projects({ profile }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <section className="section" id="projects">
      <div className="section__label">projects</div>
      <h2>Things I've built</h2>

      <div className="project-list">
        {profile.projects.map((project) => {
          const isOpen = expanded === project.name;
          return (
            <div className="project-card" key={project.name}>
              <button
                type="button"
                className="project-card__toggle"
                onClick={() => setExpanded(isOpen ? null : project.name)}
                aria-expanded={isOpen}
              >
                <div className="project-card__head">
                  <span className="project-card__name">{project.name}</span>
                  <span className="mono project-card__toggle-label">
                    {isOpen ? "hide details" : "view case study"}
                  </span>
                </div>
              </button>

              <p>{project.description}</p>
              <div className="skill-tags">
                {project.tags.map((tag) => (
                  <span className="skill-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>

              {project.link ? (
                <a href={project.link} className="mono" style={{ fontSize: "0.8rem" }}>
                  view project
                </a>
              ) : null}

              {isOpen && project.caseStudy && (
                <div className="case-study">
                  {project.hasDiagram && (
                    <div className="case-study__diagram">
                      <SyncArchitectureDiagram />
                    </div>
                  )}
                  <div className="case-study__row">
                    <div className="case-study__label mono">problem</div>
                    <p>{project.caseStudy.problem}</p>
                  </div>
                  <div className="case-study__row">
                    <div className="case-study__label mono">approach</div>
                    <p>{project.caseStudy.approach}</p>
                  </div>
                  <div className="case-study__row">
                    <div className="case-study__label mono">outcome</div>
                    <p style={{ marginBottom: 0 }}>{project.caseStudy.outcome}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
