# build backend
FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build-backend
WORKDIR /backend
COPY backend .
RUN dotnet publish -c Release -o output

# build frontend
FROM node:12 AS build-frontend
WORKDIR /frontend
COPY frontend .
RUN npm install && \
    npm run build:prod
 
# build runtime
FROM mcr.microsoft.com/dotnet/core/aspnet:2.2
RUN apt-get update \
    && apt-get install -y --allow-unauthenticated \
        libc6-dev \
        libgdiplus \
        libx11-dev \
        ffmpeg \
     && rm -rf /var/lib/apt/lists/*
COPY --from=build-backend /backend/MyNAS.Site/output .
COPY --from=build-frontend /frontend/dist/UI ./wwwroot
ENTRYPOINT ["dotnet", "MyNAS.Site.dll"]
EXPOSE 5000
