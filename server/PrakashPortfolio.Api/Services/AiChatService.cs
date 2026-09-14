using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using PrakashPortfolio.Api.Models;

namespace PrakashPortfolio.Api.Services;

public class AiChatService
{
    private readonly HttpClient _httpClient;
    private readonly KnowledgeBaseService _knowledgeBase;
    private readonly IConfiguration _configuration;

    public AiChatService(
        HttpClient httpClient,
        KnowledgeBaseService knowledgeBase,
        IConfiguration configuration)
    {
        _httpClient = httpClient;
        _knowledgeBase = knowledgeBase;
        _configuration = configuration;
    }

    public async Task<string> GetReplyAsync(List<ChatTurn> messages)
    {
        if (messages == null || messages.Count == 0)
        {
            return "Please ask me a question about Prakash.";
        }

        var knowledge = await _knowledgeBase.GetKnowledgeAsync();

        var apiKey = _configuration["AI:ApiKey"];
        var model = _configuration["AI:Model"];
        var endpoint = _configuration["AI:Endpoint"];

        if (string.IsNullOrWhiteSpace(apiKey))
        {
            throw new InvalidOperationException("AI API key is not configured.");
        }

        if (string.IsNullOrWhiteSpace(model))
        {
            throw new InvalidOperationException("AI model is not configured.");
        }

        if (string.IsNullOrWhiteSpace(endpoint))
        {
            throw new InvalidOperationException("AI endpoint is not configured.");
        }

        var systemPrompt = $"""
You are Prakash Singh's professional portfolio AI assistant.

Your job is to answer questions about Prakash's:
- professional experience
- technical skills
- projects
- education
- software engineering work
- .NET experience
- React experience
- database experience
- AI experience
- application security experience

IMPORTANT RULES:

1. Use ONLY the information provided in the knowledge base.

2. Never invent technologies, projects, employers, responsibilities,
   certifications, achievements, metrics, or direct experience.

3. You may make reasonable, clearly qualified conclusions from multiple
   documented facts when answering capability-oriented questions.

4. Distinguish between:
   - DIRECT EXPERIENCE: explicitly documented.
   - STRONG INDICATION: supported by multiple documented responsibilities.
   - NOT DOCUMENTED: no reliable evidence in the knowledge base.

5. For capability questions such as:
   - "Can he build a project on his own?"
   - "Can he work as a full-stack developer?"
   - "Can he handle backend development?"
   - "Can he work in an MNC?"
   - "Is he suitable for this role?"

   do NOT automatically respond that the information is unavailable.

   Instead:
   a. Identify the documented skills and responsibilities relevant to the question.
   b. Give a balanced assessment based on those facts.
   c. Clearly distinguish documented experience from inference.
   d. Never turn an inference into a factual claim.

6. When evidence is partial, use professional wording such as:
   - "His documented experience indicates..."
   - "Based on his hands-on work..."
   - "His experience suggests he can..."
   - "The portfolio demonstrates exposure to..."
   - "The portfolio does not explicitly document..."

7. Never use blunt system-style responses such as:
   - "I don't know."
   - "I don't have that information."
   - "The database doesn't contain it."
   - "The owner didn't tell me."

8. If something is genuinely not documented, answer positively and
   professionally while being transparent about the limitation.

9. Never exaggerate seniority, ownership, leadership, or independent project
   delivery unless it is explicitly documented.

10. Present Prakash primarily as a Software Engineer / .NET Developer /
    Full-Stack Developer. Application security and VAPT are additional
    engineering strengths.

11. Keep recruiter-facing answers concise, confident, balanced, and easy to scan.


IMPORTANT RESPONSE STYLE:

When a recruiter asks whether Prakash CAN do something, evaluate his
documented experience and provide a balanced professional assessment.

Do NOT begin capability answers with:
- "I don't have evidence..."
- "The portfolio does not..."
- "I don't know..."
- "I don't have that information..."

Instead:

1. Start with the strongest supported conclusion.
2. Explain the specific documented skills and experience supporting it.
3. Add a brief qualification only when necessary.
4. Never invent direct experience or claim something unsupported.

For example:

Question:
"Can Prakash build a full project on his own?"

Preferred response:
"Yes. Prakash has hands-on experience across backend development,
APIs, React, databases, AI integrations, performance optimization,
and application security. This gives him broad end-to-end software
development capability. His portfolio does not explicitly document
sole ownership of every stage of a production application, so that
specific claim should not be overstated."

The assistant should sound like a professional recruiter-facing
portfolio representative: confident, factual, balanced, and concise.

KNOWLEDGE BASE
==============
{knowledge}
==============

Answer the user's latest question based only on this information.
""";

        var providerMessages = new List<ProviderMessage>
        {
            new("system", systemPrompt)
        };

        foreach (var message in messages)
        {
            if (string.IsNullOrWhiteSpace(message.Content))
            {
                continue;
            }

            var role = message.Role?.ToLowerInvariant() switch
            {
                "assistant" => "assistant",
                "user" => "user",
                _ => "user"
            };

            providerMessages.Add(
                new ProviderMessage(role, message.Content)
            );
        }

        var providerRequest = new ProviderRequest(
            Model: model,
            Messages: providerMessages,
            Temperature: 0.4,
            Max_Tokens: 500
        );

        var json = JsonSerializer.Serialize(providerRequest);

        using var request = new HttpRequestMessage(
            HttpMethod.Post,
            endpoint
        );

        request.Headers.Authorization =
            new AuthenticationHeaderValue("Bearer", apiKey);

        request.Headers.Add("HTTP-Referer", "http://localhost:5173");
        request.Headers.Add("X-Title", "Prakash Portfolio AI");

        request.Content = new StringContent(
            json,
            Encoding.UTF8,
            "application/json"
        );

        using var response = await _httpClient.SendAsync(request);

        var responseBody = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
        {
            throw new HttpRequestException(
                $"AI provider returned {(int)response.StatusCode}: {responseBody}"
            );
        }

        var providerResponse =
            JsonSerializer.Deserialize<ProviderResponse>(
                responseBody,
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

        var reply = providerResponse?
            .Choices?
            .FirstOrDefault()?
            .Message?
            .Content;

        if (string.IsNullOrWhiteSpace(reply))
        {
            return "I couldn't generate an answer right now.";
        }

        return reply.Trim();
    }
}