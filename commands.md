  ### Install docker 
  ```apt update\
  curl -fsSL https://get.docker.com -o get-docker.sh\
  sh get-docker.sh
  ```

  ### Check weather docker is working fine or not
  ```docker run hello-world```

  ### Listing all running container
  ```docker ps```
  
  ### Listing all running and terminated conatiner
  ```docker ps -a```

  ### Listing all images
  ```docker images```
  
  ### remove image
  ```docker rmi hello-world:latest```

  ### remove container
  ```docker rm b00633c4f52e```

  ### start container in detached mode
  **docker run -d --restart=always  -p 8091:80 --name=c2 nginx**
  ```
  -d------detached mode
  --restart=always-------start container after restarting the host
  -p 8091:80-------host port: container port
  c2-----container name
  nginx----image name
  ```

  ### stop container
  ```docker stop 749cad131cf0 e0ccf00c9d1c```

  ### execute in to container shell
  ```docker exec -it c2 /bin/bash```

  ### copy from host to container
  **docker cp index.html c1:/usr/share/nginx/html**
  ```
  index.html------file from host to be copied (source)
  c1-------container name
  /usr/share/nginx/html-------location into container (destination)
  ```

  ### copy from container to host
  **docker cp c1:/usr/share/nginx/html/container.txt .**
  ```
  c1------container name
  /usr/share/nginx/html/container.txt------source file from container
  .--------current location in host (destination)
  ```

  ### create a new image from an existing container
  **docker commit c1 ym-class-2:99**
  ```
  c1-----existing container
  ym-class-2------image name
  99-------image tag
  ```

  ### save a Docker image to a tarball (compressed archive) file to bring out from docker engine

  ```docker save ym-class-2:99 | gzip > "ym-class-1.tar.gz"```

  ### load docker image into docker engine fro tarball (compressed archive)
  ```docker load -i ym-class-1.tar.gz```

  ### start the new container in detached mode
  **docker run -d --name=c2 --restart=always -p 8092:80 ym-class-2:99**
  ```
  -d------detached mode
  --restart=always-------start container after restarting the host
  -p 8092:80-------host port: container port
  c2-----container name
  m-class-2:99----image name
  ```
  ## view details information of a container
  ```docker inspect c2```

  ### view container log
  ```docker logs -f c2```
  