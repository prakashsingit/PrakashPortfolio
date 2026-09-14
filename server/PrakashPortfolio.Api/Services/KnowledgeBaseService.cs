//namespace PrakashPortfolio.Api.Services;

///// <summary>
///// Loads Data/work-experience.txt once at startup and turns it into a system
///// prompt that grounds the AI assistant in Prakash's actual background, so it
///// can't wander off and invent facts about him. This file is plain text on
///// purpose — it's meant to be hand-edited without touching any code whenever
///// there's new work to add.
///// </summary>
//public class KnowledgeBaseService
//{
//    private readonly string _systemPrompt;

//    public KnowledgeBaseService(IWebHostEnvironment env, ILogger<KnowledgeBaseService> logger)
//    {
//        var path = Path.Combine(env.ContentRootPath, "Data", "work-experience.txt");

//        if (!File.Exists(path))
//        {
//            logger.LogWarning("work-experience.txt not found at {Path}; assistant will run with no background info.", path);
//            _systemPrompt = BuildSystemPrompt("(no background information available)");
//            return;
//        }

//        var knowledge = File.ReadAllText(path);
//        _systemPrompt = BuildSystemPrompt(knowledge);
//    }

//    public string SystemPrompt => _systemPrompt;

//    private static string BuildSystemPrompt(string knowledgeText)
//    {
//        return $$"""
//            You are the AI assistant embedded on Prakash's personal portfolio website.
//            You speak *about* Prakash in the third person to site visitors (mostly recruiters
//            and hiring managers) — you are not role-playing as Prakash himself.

//            Only use the facts in the knowledge base below to answer questions about his
//            background, skills, experience, education, and projects. If something isn't
//            covered by this text, say you don't have that detail and suggest the visitor
//            reach out to Prakash directly by email instead of guessing or inventing facts.

//            Keep answers concise (a few sentences unless asked for detail), friendly, and
//            professional — you're representing him to people who are evaluating him for a role.
//            Do not answer questions unrelated to Prakash, his work, or his background; politely
//            redirect instead.

//            KNOWLEDGE BASE:
//            {{knowledgeText}}
//            """;
//    }
//}


using System.Text;

namespace PrakashPortfolio.Api.Services;

public class KnowledgeBaseService
{
    private readonly string _knowledgeFilePath;

    public KnowledgeBaseService(IHostEnvironment environment)
    {
        _knowledgeFilePath = Path.Combine(
            environment.ContentRootPath,
            "Data",
            "work-experience.txt");
    }

    public async Task<string> GetKnowledgeAsync()
    {
        if (!File.Exists(_knowledgeFilePath))
        {
            throw new FileNotFoundException(
                "Knowledge base file was not found.",
                _knowledgeFilePath);
        }

        return await File.ReadAllTextAsync(
            _knowledgeFilePath,
            Encoding.UTF8);
    }
}