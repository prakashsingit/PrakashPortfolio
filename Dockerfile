FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

COPY PrakashPortfolio.Api.csproj .
RUN dotnet restore PrakashPortfolio.Api.csproj

COPY . .
RUN dotnet publish PrakashPortfolio.Api.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 8080

ENTRYPOINT ["dotnet", "PrakashPortfolio.Api.dll"]
