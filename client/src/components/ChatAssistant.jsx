import { useEffect, useRef, useState } from "react";
import { marked } from "marked";

const GREETING = {
  id: crypto.randomUUID(),
  role: "assistant",
  text: "Hi, I'm Prakash's portfolio assistant. Ask me about his experience, skills, projects, etc.",
};

marked.setOptions({
  breaks: true,
  gfm: true,
});

function renderMarkdown(text) {
  return {
    __html: marked.parse(text || ""),
  };
}

export default function ChatAssistant({ open, onClose, profileName }) {
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  if (!open) {
    return null;
  }

  async function sendMessage(event) {
    event.preventDefault();

    const text = input.trim();

    if (!text || loading) {
      return;
    }

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text,
    };

    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextMessages.map((message) => ({
            role: message.role,
            content: message.text,
          })),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();

        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();

      const assistantMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: data.reply || "I couldn't generate a response.",
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        assistantMessage,
      ]);
    } catch (err) {
      console.error("Chat error:", err);

      setError(
        "Couldn't reach the assistant backend. Is the .NET Core API running?"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <aside
      className="chat-overlay"
      aria-label={`Ask ${profileName || "Prakash"} about his experience`}
    >
      <div className="chat-panel">
        <div className="chat-panel__titlebar">
          <span className="mono">
            ask-{profileName?.toLowerCase() || "prakash"} — zsh
          </span>

          <button
            type="button"
            className="chat-panel__close"
            onClick={onClose}
            aria-label="Close assistant"
          >
            ×
          </button>
        </div>

        <div
          className="chat-panel__body"
          ref={scrollRef}
          aria-live="polite"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat-line chat-line--${message.role}`}
            >
              <span className="chat-line__prompt mono">
                {message.role === "user" ? "you $" : "bot $"}
              </span>

              <div
                className="chat-line__text chat-line__markdown"
                dangerouslySetInnerHTML={renderMarkdown(message.text)}
              />
            </div>
          ))}

          {loading && (
            <div className="chat-line chat-line--assistant">
              <span className="chat-line__prompt mono">
                bot $
              </span>

              <span className="chat-line__text chat-line__text--thinking">
                thinking…
              </span>
            </div>
          )}

          {error && (
            <div className="chat-error">
              {error}
            </div>
          )}
        </div>

        <form
          className="chat-panel__input-row"
          onSubmit={sendMessage}
        >
          <span className="mono chat-panel__caret">
            $
          </span>

          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about my Experience, Skills, Projects, etc..."
            disabled={loading}
            aria-label="Ask Prakash a question"
          />

          <button
            type="submit"
            className="btn btn--primary"
            disabled={loading}
          >
            {loading ? "..." : "Send"}
          </button>
        </form>
      </div>
    </aside>
  );
}