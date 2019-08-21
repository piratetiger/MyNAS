dotnet publish -c Release ./MVCSite/MVCSite.csproj
docker build -t mynas .
docker run -d --rm -p 80:80 --name myNAS  mynas
