FROM microsoft/dotnet
COPY backend/MyNAS.Site/bin/Release/netcoreapp2.2/publish ./
COPY frontend/dist/UI ./wwwroot
ENTRYPOINT ["dotnet", "MyNAS.Site.dll"]
EXPOSE 5000
