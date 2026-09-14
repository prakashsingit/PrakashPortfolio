export default function Contact({ profile }) {
  return (
    <section className="section" id="contact">
      <div className="section__label">contact</div>
      <h2>Get in touch</h2>
      <p>
        Have a role that fits, or just want to talk shop? My inbox is open — or ask the assistant
        first if you just have a quick question about my background.
      </p>
      <div className="contact-links">
        <div>
          <span className="k">email </span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
        <div>
          <span className="k">github </span>
          <a href={profile.links.github}>{profile.links.github.replace("https://", "")}</a>
        </div>
        <div>
          <span className="k">linkedin </span>
          <a href={profile.links.linkedin}>{profile.links.linkedin.replace("https://", "")}</a>
        </div>
      </div>
      <footer>© {new Date().getFullYear()} {profile.name}. Built with .NET Core &amp; React.</footer>
    </section>
  );
}
