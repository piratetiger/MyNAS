## Build the docker image
### 1. You can build in local and dockerize
``` shell
cd backend
dotnet publish -c Release
cd ../frontend
npm install
npm run build:prod
cd ../
docker build -t my-nas -f Dockerfile-local .
```

### 2. You can build all in docker
``` shell
docker build -t my-nas .
```

### 3. You can also use the docker image directly
``` shell
docker pull piratetiger/my-nas:latest
```

## Run the docker
``` shell
docker run -d --rm -v $local_db_folder:/db_files -v $local_storage_folder:/wwwroot/storage -v $local_logs_folder:/logs -p 80:5000 --name myNAS  my-nas
```

## Login
Default user name: admin  
Password: Admin
