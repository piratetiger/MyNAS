FROM microsoft/dotnet
COPY MVCSite/bin/Release/netcoreapp2.2/publish ./
COPY UI/dist/UI ./wwwroot
ENTRYPOINT ["dotnet", "MVCSite.dll"]
EXPOSE 5000
