## This file is a guild on how to setup travis continuours integration testing and deployment 

*note: the pull request containing the travis setup files based on a develop git repository (account), a develop Amazon ECR and a develop Amazon EC2, many configurations involved ssh keys and urls need to be modified at the first time using this travis set up*

1. make sure you have all the files listed below inside your repository are not in .gitignore
    - Dockerfile
    - default.conf
    - deploy_commends.tar.enc
    - .travis.yml
2. After merge the pull request, there is a folder named encrypt, make sure it exist.
3. After merge the pull request, make sure add *"/encrypt"* to you .gitignore. The encrypt file folder contains all the ssh keys and travis config .sh files which you do not want to expose to other people. The detail of these files are decribed in both VER3 Document and at https://gist.github.com/alexpython1988/501ad971b1f947741a42e20c782b887e. After modify the .gitignore file, it should have a section like:
```sh
# keys, password, remote commend
*.pem
id_rsa
deploy_docker.sh
docker_perserve.sh
ecr_user.sh
/encrypt
deploy_commends.tar
```
4. make sure you set up the git ssh: create a key pair use ssh_gen, add the public key to the github repo and put the private key to the encrypt folder. (you also have to delete the old id_rsa and update the travis env var *GIT_SSH_KEY*="current key file name")
5. you also have to create a ssh key for login your EC2 server, replace the private key (xxx.pem) in encrypt folder with yours and update the travis env var *EC2_SSH_KEY*="you EC2 private key" 
6. In order to make the travis be full functional, adding *EC2_URL*, *EC2_SSH_KEY*, *GIT_SSH_KEY*, *ECR_REPO*, *ECR_IMG*, *GIT_MAIL*, *GIT_USER*, *TAG_ENABLE* and *VER_BUMP* env variables to the travis under the applicaiton repo. Refer these variable set up to the VER3 document @ Build Process for Angular4 app. For just quick set up, you only need to set variable *TAG_ENABLE*=F in Enviroment variables in settings. 
7. encrpt all these files using following commends (must delete "deploy_commends.tar" after running scripts below for security) and move the newly created "deploy_commends.tar.enc" to the root directory (note: if you do not change the file name, you do not need to change the travis yml file, otherwise replace the "openssl aes-256-cbc -K $encrypted_xxxxxxxxx_key -iv $encrypted_xxxxxxxxx_iv -in deploy_commends.tar.enc -out deploy_commends.tar -d" with the new openssl commend showed in the terminal):
```sh
tar -cvf deploy_commends.tar encrypt/alexgre1.pem encrypt/id_rsa encrypt/deploy_docker.sh encrypt/docker_perserve.sh encrypt/ecr_user.sh
travis encrypt-file deploy_commends.tar
```
8. if you still have problem, either refer to VER3 document, git gist at https://gist.github.com/alexpython1988/501ad971b1f947741a42e20c782b887e or contact the author at alexgre@ufl.edu