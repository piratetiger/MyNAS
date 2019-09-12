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
COPY --from=build-backend /backend/output .
COPY --from=build-frontend /frontend/dist/UI ./wwwroot
ENTRYPOINT ["dotnet", "MyNAS.Site.dll"]
EXPOSE 5000
