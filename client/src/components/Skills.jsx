const GROUP_LABELS = {
  languages: "languages",
  backend: "backend",
  frontend: "frontend",
  databases: "databases",
  focusAreas: "focus areas",
};

export default function Skills({ profile }) {
  const groups = Object.entries(profile.stack);

  return (
    <section className="section" id="skills">
      <div className="section__label">skills</div>
      <h2>Tech stack</h2>
      <div className="skill-groups">
        {groups.map(([key, values]) => (
          <div key={key}>
            <div className="skill-group__title mono">{GROUP_LABELS[key] || key}</div>
            <div className="skill-tags">
              {values.map((v) => (
                <span className="skill-tag" key={v}>
                  {v}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
