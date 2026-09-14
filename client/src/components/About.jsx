export default function About({ profile }) {
  return (
    <section className="section" id="about">
      <div className="section__label">about</div>
      <h2>A bit about me</h2>
      <p>{profile.summary}</p>
      <p>
        I'm based in {profile.location}. Outside of day-to-day feature work, I spend time on{" "}
        {profile.stack.focusAreas.join(" and ")}.
      </p>
      <h3 style={{ fontSize: "1rem", marginTop: "28px", marginBottom: "10px" }}>Education</h3>
      {profile.education.map((edu) => (
        <div key={edu.degree} style={{ marginBottom: "8px" }}>
          <div style={{ color: "var(--text)" }}>{edu.degree}</div>
          <div className="mono" style={{ fontSize: "0.82rem", color: "var(--text-faint)" }}>
            {edu.school}
            {edu.period ? ` · ${edu.period}` : ""}
          </div>
        </div>
      ))}
    </section>
  );
}
