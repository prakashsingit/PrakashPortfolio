const LINKS = [
  { href: "#about", label: "~/about" },
  { href: "#skills", label: "~/skills" },
  { href: "#experience", label: "~/experience" },
  { href: "#projects", label: "~/projects" },
  { href: "#focus", label: "~/vapt-and-ai" },
  { href: "#contact", label: "~/contact" },
];

export default function NavRail({ profile, onOpenChat }) {
  return (
    <nav className="nav-rail">
      <div>
        <div className="nav-rail__id">
          <div className="nav-rail__name">{profile.name}</div>
          <div className="nav-rail__role">{profile.role}</div>
        </div>
        <ul className="nav-rail__list">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a className="nav-rail__link" href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <button
              type="button"
              className="nav-rail__link"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                width: "100%",
                textAlign: "left",
                font: "inherit",
              }}
              onClick={onOpenChat}
            >
              ~/ask-prakash
            </button>
          </li>
        </ul>
      </div>
      <div className="nav-rail__status">
        <span className="status-dot" aria-hidden="true" />
        open to opportunities
      </div>
    </nav>
  );
}
