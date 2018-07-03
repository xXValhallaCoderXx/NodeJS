# Node JS - GraphQl API

This is a basic "Todo Application" cover concepts such as CRUD, DB Relations, Authentication using the following technologies: **ExpressJS, GraphQL, MongoDB, Mongoose, JWT**

## Setup and Start Application
- `yarn` This will install application dependecies
- Ensure you have an instance of mongodb running
- `yarn dev` will start the application
- `yarn test` will run tests **WIP**

## Query

### Get All Todos - For Current Logged In User
- Expects `x-auth` token to be in header
```
query {
  todos{
    id
    text
    completed
  }
}
```
## Mutations

### Sign Up
- Response will inject token in header so he will be authenticated on success
```
mutation {
  addUser(email: "gung_fu", password: "123456"){
    id
    email
    password
  }
}
```

## Create App and Initial Heroku Deployment
- `heroku create`
- `heroku addons:create mongolab:sandbox`
- `heroku config`
- ADD JWT CONFIG ENV
- `heroku config:set SOMENAME=DragonBallZIsTheBest`
- `git push heroko master` NOTE: Since we are working on a sidebranch this wont work
- Run this command instead: `git push heroku 02-GraphQL-JWT:master`

### Heroku Commands
- `heroku logs`
- `heroku config`
- `heroku config:set SOMENAME=SOMEVALUE`
- `heroku config:unset SOMENAME`
- `heroku config:get SOMENAME`
