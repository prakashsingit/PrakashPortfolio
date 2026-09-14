import { useState } from "react";
import NavRail from "./components/NavRail";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import FocusAreas from "./components/FocusAreas";
import Contact from "./components/Contact";
import ChatAssistant from "./components/ChatAssistant";
import profile from "./data/profile.json";

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="app-shell">
      <NavRail profile={profile} onOpenChat={() => setChatOpen(true)} />
      <main className="content">
        <Hero profile={profile} onOpenChat={() => setChatOpen(true)} />
        <About profile={profile} />
        <Skills profile={profile} />
        <Experience profile={profile} />
        <Projects profile={profile} />
        <FocusAreas />
        <Contact profile={profile} />
      </main>

      {/* {!chatOpen && (
        <button type="button" className="chat-fab" onClick={() => setChatOpen(true)}>
          ask-{profile.name.toLowerCase()} $
        </button>
      )} */}

{!chatOpen && (
  <button
    type="button"
    className="chat-fab"
    onClick={() => setChatOpen(true)}
    aria-label="Open Prakash AI assistant"
  >
    <span className="chat-fab__icon">✦</span>

    <span className="chat-fab__content">
      <span className="chat-fab__title">
        Ask Prakash AI
      </span>

      <span className="chat-fab__subtitle">
        Ask about my experience
      </span>
    </span>
  </button>
)}

      <ChatAssistant open={chatOpen} onClose={() => setChatOpen(false)} profileName={profile.name} />
    </div>
  );
}
