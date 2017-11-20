VERSION=$(node -e "console.log(require('./package.json').version)")
docker tag hello-world alexgre/hw:$VERSION 
docker tag hello-world alexgre/hw:latest  