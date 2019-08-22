cd MVCSite
dotnet publish -c Release
cd ../UI
npm run build
cd ../
docker build --no-cache -t mynas .
docker run -d --rm -p 80:80 --name myNAS  mynas
