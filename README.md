Chan Zhuo Yang A0217806

Webapp Link: https://zhuoyang-taskify.herokuapp.com/

### Using the Container

```
cd railsToDo/

docker-compose build

# create database
docker-compose run webapp rake db:create

# if migrations pending run
# docker-compose run webapp rake db:migrate

docker-compose up
```
