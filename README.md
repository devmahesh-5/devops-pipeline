# acquisitions

npm install @neondatabase/serverless drizzle-orm

# drizzle

npm install -D drizzle-kit

## Neon + Drizzle

**Neon:**It’s "Serverless Postgres." Traditional Postgres keeps a connection open 24/7, which is expensive and slow for serverless functions (like Vercel or Netlify). Neon allows you to connect via HTTP, which is much faster for cold starts.

**Drizzle:** Unlike heavier ORMs (like Prisma), Drizzle is just a thin wrapper around SQL. It gives you full type safety without the performance overhead.

## steps

1. npm run db:generate -> this generates drizzle schema / sql file with the help of config file
2. npm run db:migrate -> this creates the tables in the database
# devops-pipeline

## Devop pipeline

1. CI/CD
#  GitHub Actions CI/CD 

GitHub Actions is an automated platform that allows you to build, test, and deploy your code right from GitHub.

##  File Structure
Workflows must be stored in the following directory:
`.github/workflows/your-pipeline.yml`

---

##  Core Concepts & Keywords

| Keyword | Purpose |
| :--- | :--- |
| **`name`** | The display name of the workflow or job. |
| **`on`** | **The Trigger.** Defines what event starts the workflow (e.g., `push`, `pull_request`). |
| **`jobs`** | A collection of tasks that run on the same runner. Jobs run in **parallel** by default. |
| **`runs-on`** | Defines the OS (Virtual Machine) to use (e.g., `ubuntu-latest`, `windows-latest`). |
| **`steps`** | The sequence of tasks inside a job. |
| **`uses`** | Imports an external "Action" (reusable code from the marketplace). |
| **`run`** | Executes a shell command (e.g., `npm install`, `python script.py`). |
| **`with`** | Passes input parameters to an action used in `uses`. |
| **`env`** | Sets environment variables for a step, job, or workflow. |
| **`needs`** | Forces a job to wait for another job to complete (creates a dependency). |

---

##  YAML Syntax Rules
* **Whitespace Sensitive:** Indentation matters! Use **2 spaces** (not Tabs).
* **Nested Structure:** Data is organized in a parent-child hierarchy.
* **Key-Value Pairs:** Formatted as `key: value`.



---

##  Example Workflow Template

```yaml
name: CI Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name:  Checkout Code
        uses: actions/checkout@v4

      - name:  Setup Environment
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name:  Install Dependencies
        run: npm install

  test:
    needs: build # This job won't start until 'build' finishes
    runs-on: **ubuntu**-latest
    steps:
      - name:  Run Unit Tests
        run: npm test
        env:
          API_KEY: ${{ secrets.MY_SECRET_KEY }}

```

## 🐳 Docker

Docker is a platform that packages an application and all its dependencies (libraries, settings, code) into a **Container**. This ensures the app runs exactly the same on your laptop, your teammate's computer, and the production server.

for example: this container solves the problem of working on a windows laptop's owner and mac user by wrapping containeer with own os(though uses host resources),dependencies,runtimes

- Docker maintains isolation: 
- protability: containeers are lightweight,lets easy move appn to test,dev,deployment
- verson control: we can return to previous version if something goes wrong
- scalability : allows to have multiple copies to handle traffic
- deployment integration: develop,tested and deployed efficiently 


1. Images:
    - lightweight standalone,executable package includes everything that is need to run a software including code,runtime(like nodejs),librabries,system tools, os
    - like recepies for application.
    - provides instructions such as runtime and specific tools to be run or create.

2. containeers:
    - runs images 
    - runnable instance of image
    - represents execution enviroment
    - takes everything instruction in images and runs or execute those instruction 
    - like bake cake 
    - can run multiple container from single image

# Volume 
- persistance data storage mechanism that allows data to be shared between containeers and host machines.
- like a shared folder in machine that is allowed to be used by containeers

# Network
 - communication chanel that enables different docker containeers to talk to each other or with the external world 
 - creates connectivity betn containeers while maintainning isolation
 - like big resturant kitchen that connects chefs and recipies(or DATA ONLY) to be shared between chefs (containeers)

## Docker Workflow

![docker_workflow](images/dkr.png)

1. Docker client: user interface for interacting with docker.bby cli or gui.like chef
2. Docker Daimon/host: 
    - bg process responsible for managing containers on the host system.
    - listen for docker client commands,creates and manages containers,buuilds images and handlees other docker related tasks.
    - 
3. Docker Registry/hub:
    - centralized repository of docker images.
    - like github for git => docker hub for docker.
    - host both public and private registries or packages.
    - like recipe library that is used by host to get 

![docker_workflow](images/dkr1.png)


##  in examples

| Term | Analogy | Purpose |
| :--- | :--- | :--- |
| **Dockerfile** | The Recipe | A text file with instructions on how to build your environment. |
| **Image** | The Frozen Meal | A lightweight, standalone, executable package (built from the Dockerfile). |
| **Container** | The Cooked Meal | A running instance of an image. You can have many containers from one image. |

---

## How to create docker images ?
- docker file with different keyboard makes an image 

  ##  Essential Keywords & Commands
```
  | Command | Action | Instructions
  | :--- | :--- |
  | **`FROM`** | Sets the Base Image (e.g., `FROM node:20`). |
  | **`WORKDIR`** | Sets the "Home" folder inside the container. |
  | **`COPY`** | Moves files from your computer into the container. |
  | **`RUN`** | Executes commands *during the build* (e.g., `RUN npm install`). |
  | **`CMD`** | The command that starts the app *inside the container*. |
  | **`EXPOSE`** | Documents which port the app runs on (e.g., `8080`). |
  | **`ENV`** | sets enviroment variables to use during the build process. |
  | **`ARGS`** | Defines build time variables. |
  | **`VOLUME`** | creates mount point for externally mounted volumes.(e.g, VOLUME /myvol) |
  | **`ENTRYPOINT`** | for default fixed executable command or starting point for contaainer.|
  ```
---
after creating an image we can just 
`docker build -t docker_image_name .` to make container of the image in dockerfile which has base runtime or image + configuration like where to copy what in container, run what command in project etc 

## we can run docker container with command `docker run -it docker_image_name` or `docker run -it docker_image_name sh` will allow to go into that container

# to allow host (our actual machine to expose port we need to use proxy mapper -p allows to map container's port to host's port )
`docker run -p 5173:5173 react_docker` 
## inorder to reflect our changes in local pwd to docker container we can change the command slightly

`docker run -p 5173:5173 -v "$(pwd):/app" -v /app/node_modules react_docker` #this ensures to make volumes such that node_modules are also created so that it stores dependencies /app/node_modules is mounted in volume so that this can be used later on ..

- now as we have now finally run the container in machine now lets push docker image created with cmd and base image to dockerhub
1.login from terminal
    `docker login`

2. push 
    `docker tag tag_name /user_name/image_name` #its like making commit
    `docker push devmahes/react_docker:latest `

# now our image is on docker hub

# these work of commands for image create, run map host volume etc we can use docker compose up 
- for this we will have docker init to initialize docker and then alter dockerfile as well as compose.yaml and later just in command docker compose up to make container map host create volume etc through compose.yaml
##  Example Dockerfile (Node.js)

```dockerfile
# 1. Use an official Node.js image
FROM node:20

# 2. Create app directory
WORKDIR /app

# 3. Copy package files and install
COPY package*.json ./
RUN npm install

# 4. Copy the rest of the code
COPY . .

# 5. Start the app
CMD ["node", "index.js"]

```



##3. Kubernetes

-> contaainer orchestration platform.
-> its job is to schedule,scale,self heal and manage containers
->defines how where when to run containers

**`Kubernetes`** is an open-source system for automating the deployment, scaling, and management of containerized applications.

## 1. Cluster
**Cluster** is a group of nodes that work together to form a single system.
![kubernetes cluster](images/k8s.png)

- cluster is made up of **control plane** which decides schedule reconciles and monitor health

- **Worker node** is a physical machine that runs a container runtime and is part of a cluster.it runs the **kubelet**, an agent which communicates with control plane and a container runtime like docker.
- also these node have kube-proxy which is a proxy server that runs on the worker node and is responsible for handling network traffic between the cluster and the worker node.

so when u ask kubernetes to run 3 node js app.control plane decides where these containeer go and worker node runs the container

## 2. Pod
**Pod** is a group of containers that are scheduled on the same worker node.

- containers are wrapped up in a pod.
- pod is smallest Unit of deployment
- one container per pod usually.
- when u deploy it will be interacting with pod not with container directly
- for 3 replica to run. kubernetes auto creates 3 pods and run if any one pod fails it will create new pod this is how scalability works in k8s automatically.

![kubernetes pod](images/pod.png)

## 3. Deployment
**Deployment** is a higher level construct that manages the lifecycle of a set of pods/replica sets.
- it allows to define update to application.
- it gradually replace old pods with new pods.so no down time.
- it also provides rollback feature.
  
pods are temprorary they come and go.so the pods are having different ips.so how do pods connect to each other or connect to control plane or user ????

Here comes **Service**
## 4. Service
- **Services** is a stable endpoint  which are permanent ip or dns name that auto route traffic to the available pods and allows load balancing amongst replicas.

## 5. Configmaps and Secrets
apps often needs configurations and credentials so we need **configmaps** and **secrets**

- **configMaps** stores configuration data 
- **secrets** stores credentials like passwords

Kubernetes injejcts these configmaps and secrets into pods without taking them into docker containers.

![kubernetes config](images/configs.png)
![kubernetes secret](images/secret.png)

But wait ? How does external user access these?

Welcome **Ingress**

![kubernetes ingress](images/ingres.png)

## 6. Ingress
- likes a smart router or gateway.it exposes http and https to outside world
- for example it can map api.myapp.com to your backend service.
  
## 7. Persistent Volumes
- **Persistent Volumes** are a way to persist data across multiple pods.
- like a shared folder in machine that is allowed to be used by containeers


## Putting All Together
The Goal: You tell K8s, "Keep 4 Pods of my React app running."

The Reality: VPS #2 (a Node) loses internet connection. 2 Pods were on that Node.

The Reaction: K8s sees only 2 Pods are now reachable. It instantly pulls your image from Docker Hub and starts 2 new Pods on VPS #1 and VPS #3.

The Result: Your website never went down.


##Using K8s with Docker
1.install minikube and kubectl
2. make all files like we did in dockeer and push the image to docker hub
3. now make a directory k8s and cd into it
4. now create 2 files deployment.yaml and service.yaml
5. deployment.yaml holds command to run how many contaainer,what resources it needs what images to use and checking health and readyness
6. and the sevice.yaml is used to expose the service to outside world use tcp protocoll and port  expose 
7. now start minikube  in terminal with `minikube start`
8. check if cluster is running with `kubectl cluster-info`
9. now we need to create a deployment with `kubectl apply -f k8s/` what this does is deploys the yaml file to control plane so that control plane knows what to do (which is mentioned on deployment.yaml and service.yaml)

![kubernetes minikube](images/kube.png)

now the deployement.yaml creates pods and service.yaml creates service to allow access to outside world

##lets check the status of our deployment with `kubectl get pods -w` this will show us the status of our deployment


##lets check the status of our service with `kubectl get service`

![status](images/status.png)

# lets test if our service is working or not with `minikube service service_name`

![minikube service](images/servicetest.png)

![minikube service](images/res.png)


## This is alot of work to do.is not it?
first make docker image,then push to dockerhub,then create deployment.yaml and service.yaml,then start minikube,then create deployment with `kubectl apply -f k8s/`,then check status of deployment,then check status of service,then test if service is working or not

- so it is good to create the bash file so that the commands are easy to run while deploying.

## steps 
1.create a file called deploy.sh `touch deploy.sh`
2.make it executable `chmod +x deploy.sh`
3.write the commands in deploy.sh file
4.run the deploy.sh file `./deploy.sh`


## Summary

---
# acquisitions API is the project i made to learn devop pipeline
in this repo:
`git clone https://github.com/devmahesh-5/devops-pipeline.git`
`cd acquisitions`
`docker compose -f docker-dev-compose.yaml up #make sure the docker is running`
#in terminal run `minikube start` to start minikube control plane for kubernetes
`chmode +x deploy.sh`
`./deploy.sh`

now you can check the status of the deployment with `kubectl get pods -w` and also check the apis by opening http://localhost:3000 in browser.
---

## Kubernetes System Architecture Summary

This project follows a standard "Code -> Container -> Cluster" pipeline. Here is the logic:

### 1. Packaging (Dockerfile)
* **Role:** Converts local source code into a portable **Image**.
* **Logic:** Bundles the OS (Alpine), Runtime (Node), and App code so the environment is identical everywhere.

### 2. Local Environment (Docker Compose)
* **Role:** Orchestrates the app and database for development.
* **Connection:** The app talks to the `db` service over a virtual bridge.
* **Advantage:** No need to install Postgres locally; the container handles the data layer.

### 3. Management (K8s Deployment)
* **Role:** The "State Manager" handled by the Minikube Control Plane.
* **Scaling:** Maintains **2 Replicas** (Pods) for high availability.
* **Identity:** Labels every Pod as `app: acquisitions`.
* **Port Mapping:** Opens `containerPort: 3000` to match the Node.js `app.listen`.

### 4. Routing (K8s Service)
* **Role:** The permanent entry point for traffic.
* **The Glue:** Uses a **Selector** to find any Pod with the `app: acquisitions` label.
* **Flow:** External Traffic → Service (Port 3000) → Pod (targetPort 3000) → App Code.



---


## Next Steps:
As i have kubernetes workflow also this can be executed with cd (continuous deployment) workflow
- now i need another workflow for the deployment
- this will contain command that 1st logs in to the vps and then deploys the code
- deployment is in deploy.sh file so change mode to +x and execute it
- then run deploy.sh file
- it will run the deployment and services.yaml the kubernetes manifest
- and we are done with complete pipeline