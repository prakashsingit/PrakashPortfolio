# Prakash — Portfolio Site

A recruiter-facing portfolio built as a **.NET Core Web API** backend + **React** frontend, with an
AI assistant embedded on the page that answers visitor questions about Prakash using a free-tier
LLM API (Groq or OpenRouter — both work out of the box, just swap config).

```
PrakashPortfolio/
├── client/     React + Vite frontend
└── server/
    └── PrakashPortfolio.Api/   ASP.NET Core Web API (chat backend)
```

> **Note on this build:** the code here was written and the React app was built/verified in a
> sandbox without the .NET SDK available, so the backend compiles cleanly in theory but has not
> been run with `dotnet build` yet. Run the "Run the backend" steps below first thing to confirm
> it builds on your machine, and fix up anything the compiler flags (there shouldn't be much).

## 1. Content — start here

All the actual copy (name, stack, experience, projects, links) lives in **one file**, duplicated
in two places so both frontend and backend can use it without one calling the other at build time:

- `client/src/data/profile.json`
- `server/PrakashPortfolio.Api/Data/profile.json`

Edit both (they should stay identical) to:
- fill in your real email, GitHub, and LinkedIn links (currently placeholders)
- add a `resume.pdf` to `client/public/` or update the `links.resume` path
- add/edit projects and experience bullet points as your work evolves

## 2. Run the backend

Requires the [.NET 8 SDK](https://dotnet.microsoft.com/download).

```bash
cd server/PrakashPortfolio.Api
dotnet restore
dotnet run
```

Note the port it starts on (printed in the console, e.g. `http://localhost:5199`) — update
`client/vite.config.js`'s proxy target if it differs.

### Configure the AI provider (free tier)

The backend calls any OpenAI-chat-completions-compatible API. Pick one:

**Groq (recommended — fast, generous free tier)**
1. Get a free API key at https://console.groq.com
2. In `appsettings.json` (or better, an environment variable — see below), set:
   ```json
   "AiProvider": {
     "BaseUrl": "https://api.groq.com/openai/v1/chat/completions",
     "Model": "llama-3.1-8b-instant",
     "ApiKey": "YOUR_KEY"
   }
   ```

**OpenRouter (more model choice, free models available)**
1. Get a free API key at https://openrouter.ai
2. Use:
   ```json
   "AiProvider": {
     "BaseUrl": "https://openrouter.ai/api/v1/chat/completions",
     "Model": "meta-llama/llama-3.1-8b-instruct:free",
     "ApiKey": "YOUR_KEY"
   }
   ```

**Never commit a real API key.** Instead, set it as an environment variable (ASP.NET Core reads
`AiProvider__ApiKey` automatically) or via `dotnet user-secrets`:

```bash
dotnet user-secrets init
dotnet user-secrets set "AiProvider:ApiKey" "YOUR_KEY"
```

If no key is set, the `/api/chat` endpoint still responds (no crash) — it just returns a message
saying the assistant isn't configured yet, so the rest of the site stays usable.

## 3. Run the frontend

```bash
cd client
npm install
npm run dev
```

Visit the printed local URL (typically `http://localhost:5173`). The dev server proxies
`/api/*` requests to the backend, so both need to be running for the chat assistant to work.

## 4. Deploying

- **Frontend:** `npm run build` in `client/` produces a static `dist/` folder — deploy it to
  Vercel, Netlify, GitHub Pages, or serve it from the .NET app itself.
- **Backend:** `dotnet publish` in `server/PrakashPortfolio.Api/` — deploy to Azure App Service,
  Render, Fly.io, or any host that runs ASP.NET Core. Set `AiProvider__ApiKey` and
  `Cors__AllowedOrigins__0` (your deployed frontend URL) as environment variables there.

## What's implemented vs. left for you

- ✅ Full page: hero, about, tech stack, experience, projects, VAPT/AI focus section, contact
- ✅ Chat widget wired to a real `.NET Core` endpoint (`POST /api/chat`)
- ✅ Backend is provider-agnostic — Groq, OpenRouter, or anything OpenAI-compatible via config only
- ⬜ Real links (GitHub, LinkedIn, resume PDF) — currently placeholders in `profile.json`
- ⬜ Verify `dotnet build`/`dotnet run` on a machine with the SDK installed (not available in the
  environment this was built in)
- ⬜ Optional: swap the JSON-file knowledge base for something richer if you want the assistant to
  answer more open-ended questions (e.g. a short "how I think about VAPT" write-up)
