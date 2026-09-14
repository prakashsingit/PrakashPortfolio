export default function FocusAreas() {
  return (
    <section className="section" id="focus">
      <div className="section__label">specialization</div>
      <h2>VAPT &amp; applied AI</h2>
      <div className="focus-grid">
        <div className="focus-card">
          <div className="focus-card__icon">security</div>
          <h3>Vulnerability Assessment &amp; Penetration Testing</h3>
          <p style={{ marginBottom: 0 }}>
            I've worked on identifying and assessing security weaknesses in applications and
            infrastructure — thinking about systems from an attacker's perspective as well as a
            builder's, so the software I ship holds up under scrutiny.
          </p>
        </div>
        <div className="focus-card">
          <div className="focus-card__icon">ai</div>
          <h3>Applied AI</h3>
          <p style={{ marginBottom: 0 }}>
            I bring AI into real product features rather than treating it as a novelty — including
            the assistant on this page, which is wired up to answer questions about my background
            using an LLM API behind a .NET Core backend.
          </p>
        </div>
      </div>
    </section>
  );
}
