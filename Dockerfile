FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-yml-convert
WORKDIR /yml-convert
COPY ./MyNAS-YamlConvert .
RUN dotnet publish -c Release -o output -r linux-x64 --self-contained

FROM docker/compose:debian-1.28.5
WORKDIR /site
COPY ./docker-compose.yml ./docker-compose.yml
COPY ./config ./config
COPY ./scripts .
COPY --from=build-yml-convert /yml-convert/output ./tools/yml-convert

ENTRYPOINT ["sh","init.sh"]
