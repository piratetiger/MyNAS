FROM microsoft/dotnet
COPY MVCSite/bin/Release/netcoreapp2.2/publish ./
ENTRYPOINT ["dotnet", "MVCSite.dll"] 
