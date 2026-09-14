//using Microsoft.AspNetCore.Mvc;
//using PrakashPortfolio.Api.Models;
//using PrakashPortfolio.Api.Services;

//namespace PrakashPortfolio.Api.Controllers;

//[ApiController]
//[Route("api/[controller]")]
//public class ChatController : ControllerBase
//{
//    private readonly AiChatService _aiChatService;

//    public ChatController(AiChatService aiChatService)
//    {
//        _aiChatService = aiChatService;
//    }

//    [HttpPost]
//    public async Task<ActionResult<ChatResponse>> Post([FromBody] ChatRequest request, CancellationToken ct)
//    {
//        if (request.Messages is null || request.Messages.Count == 0)
//        {
//            return BadRequest("At least one message is required.");
//        }

//        var reply = await _aiChatService.GetReplyAsync(request.Messages, ct);
//        return Ok(new ChatResponse(reply));
//    }
//}


using Microsoft.AspNetCore.Mvc;
using PrakashPortfolio.Api.Models;
using PrakashPortfolio.Api.Services;

namespace PrakashPortfolio.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChatController : ControllerBase
{
    private readonly AiChatService _aiChatService;

    public ChatController(AiChatService aiChatService)
    {
        _aiChatService = aiChatService;
    }

    [HttpPost]
    public async Task<IActionResult> Chat([FromBody] ChatRequest request)
    {
        if (request == null || request.Messages == null || request.Messages.Count == 0)
        {
            return BadRequest(new
            {
                message = "Please provide at least one message."
            });
        }

        try
        {
            var reply = await _aiChatService.GetReplyAsync(request.Messages);

            return Ok(new ChatResponse(reply));
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                message = "Unable to process the AI request.",
                detail = ex.Message
            });
        }
    }
}