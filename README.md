## To build the docker image
### 1. You can build in local and dockerize
Use Dockerfile-local and run below commads:
``` shell
cd backend
dotnet publish -c Release
cd ../frontend
npm install
npm run build:prod
cd ../
docker build --no-cache -t my-nas .
```

### 2. You can build all in docker
``` shell
docker build --no-cache -t my-nas .
```

### 3. You can also use the docker image directly
``` shell
docker pull piratetiger/my-nas:latest
```

## To run the docker
docker run -d --rm -v $local_db_folder:/db_files -v $local_storage_folder:/wwwroot/storage -p 80:5000 --name myNAS  my-nas