# Node JS - Rest API

This is a basic "Todo Application" cover concepts such as CRUD, DB Relations, Authentication using the following technologies.

- Node JS
- Express JS
- MongoDB
- JWT
- API

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