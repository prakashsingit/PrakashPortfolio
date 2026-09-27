FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY server/PrakashPortfolio.Api.csproj server/
RUN dotnet restore server/PrakashPortfolio.Api.csproj

COPY server/ server/
RUN dotnet publish server/PrakashPortfolio.Api.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:10000
EXPOSE 10000

ENTRYPOINT ["dotnet", "PrakashPortfolio.Api.dll"]
