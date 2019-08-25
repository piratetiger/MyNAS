## To run the project:
``` shell
cd backend
dotnet publish -c Release
cd ../frontend
npm install
npm run build
cd ../
docker build --no-cache -t mynas .
docker run -d --rm -v $local_db_folder:/db_files -v $local_storage_folder:/wwwroot/storage -p 80:5000 --name myNAS  mynas
```
