## Config your folders
Create a new folder with below config.txt file in it. You can update the folders and port below as you want.
``` shell
storage_folder=/mnt/Data/storage
db_folder=/mnt/Data/db_files
log_folder=/mnt/Data/logs
site_port=80
```

## Start the application
You can manually pull below dependency images first:
``` shell
docker pull piratetiger/my-nas-api
docker pull piratetiger/my-nas-ui
docker pull piratetiger/my-nas-site
```
Then start the application:
``` shell
docker run -d --rm -v /var/run/docker.sock:/var/run/docker.sock -v $config_folder:/site/config --name my-nas piratetiger/my-nas
```
The $config_folder is your folder which contains config.txt file.

Access below url for application
``` shell
http://$your_host:$your_port/login
```

## Login
Default user name: admin  
Password: Admin
