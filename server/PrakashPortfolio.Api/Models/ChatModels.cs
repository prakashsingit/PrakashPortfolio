using System.Text.Json.Serialization;

namespace PrakashPortfolio.Api.Models;

public record ChatTurn(string Role, string Content);

public record ChatRequest(List<ChatTurn> Messages);

public record ChatResponse(string Reply);

// OpenAI-compatible provider models

public record ProviderMessage(
    [property: JsonPropertyName("role")] string Role,
    [property: JsonPropertyName("content")] string Content
);

public record ProviderRequest(
    [property: JsonPropertyName("model")] string Model,
    [property: JsonPropertyName("messages")] List<ProviderMessage> Messages,
    [property: JsonPropertyName("temperature")] double Temperature = 0.4,
    [property: JsonPropertyName("max_tokens")] int Max_Tokens = 500
);

public record ProviderChoice(ProviderMessage Message);

public record ProviderResponse(List<ProviderChoice>? Choices);