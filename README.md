## To run the project:
``` shell
cd bakcend
dotnet publish -c Release
cd ../frontend
npm run build
cd ../
docker build --no-cache -t mynas .
docker run -d --rm -p 80:5000 --name myNAS  mynas
```
