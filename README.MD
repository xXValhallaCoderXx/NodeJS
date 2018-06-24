# Node JS - Rest API

This is a basic "Todo Application" cover concepts such as CRUD, DB Relations, Authentication using the following technologies: **ExpressJS, MongoDB, Mongoose, JWT**

## Setup and Start Application
- `yarn` This will install application dependecies
- Ensure you have an instance of mongodb running
- `yarn dev` will start the application
- `yarn test` will run tests **WIP**

## USER API

### Create User
- POST
- Route: `/api/users`
**body**
```
{
  "email": "nate@gmail.com", (string)
  "password: "123456" (string)
}
```

### Login User
- POST
- Route: `/api/users/login`
**body**
```
{
  "email": "nate@gmail.com", (string)
  "password: "123456" (string)
}
```
### DELETE TOKEN - LOGOUT
- DELETE
- Route: `api/users/me/token`
- Expected x-auth in header

## TODO API

### GET TODOS
- GET
- Route: `api/todos`
- Expected x-auth in header

### GET A TODO
- GET
- Route: `api/todos/:id`
- Expected x-auth in header

### DELETE A TODO
- DELETE
- Route: `api/todos/:id`
- Expected x-auth in header

### CREATE TODO
- POST
- Route: `/api/todos`
- Expected x-auth in header
**body**
```
{
  "text": "Some text"
}
```
### UPDATE A TODO
- POST
- Route: `/api/todos/:id`
- Expected x-auth in header
**body**
```
{
  "text": "Some text",
  "completed: true / false
}
```

## Create App and Initial Heroku Deployment
- `heroku create`
- `heroku addons:create mongolab:sandbox`
- `heroku config`
- ADD JWT CONFIG ENV
- `git push heroko master` NOTE: If working from a branch: `git push heroku 02-JWT-Rest-API:master`

### Heroku Commands
- `heroku logs`
- `heroku config`
- `heroku config:set SOMENAME=SOMEVALUE`
- `heroku config:unset SOMENAME`
- `heroku config:get SOMENAME`
