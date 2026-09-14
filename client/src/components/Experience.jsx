export default function Experience({ profile }) {
  return (
    <section className="section" id="experience">
      <div className="section__label">experience</div>
      <h2>Where I've worked</h2>
      {profile.experience.map((job) => (
        <div className="exp-entry" key={job.org} style={{ marginBottom: "28px" }}>
          <div className="exp-entry__head">
            <div>
              <div className="exp-entry__role">{job.role}</div>
              <div className="exp-entry__org">{job.org}</div>
            </div>
            <div className="exp-entry__period">{job.period}</div>
          </div>
          <ul>
            {job.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
