
set -e

NAME="acquisitions"
USERNAME="devmahes"

IMAGE="$USERNAME/$NAME:latest"

echo "building image"
docker build -t $IMAGE .

echo "pushing image"
docker push $IMAGE

#in production above build and push part will be handled by CI/CD github actions through docker hub

echo "deploying image"
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

echo "getting pods"
kubectl get pods

echo "getting services"
kubectl get services

echo "fetching main service"
kubectl get service $NAME