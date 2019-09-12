# To build the docker image
## To build in local and dockerize
Use Dockerfile-local
Run below commads:
``` shell
cd backend
dotnet publish -c Release
cd ../frontend
npm install
npm run build:prod
cd ../
docker build --no-cache -t mynas .
```

## To build in docker
``` shell
docker build --no-cache -t mynas .
```

# To run the docker
docker run -d --rm -v $local_db_folder:/db_files -v $local_storage_folder:/wwwroot/storage -p 80:5000 --name myNAS  mynas