# Node JS - Rest API

This is a basic "Todo Application" cover concepts such as CRUD, DB Relations, Authenticatio using the following technologies.

- Node JS
- Express JS
- MongoDB
- JWT
- API

## Setup and Start Application
- `yarn` This will install application dependecies
- Ensure you have an instance of mongodb running
- `yarn start` will start the application

## Route API

### POST: api/users
- Expected body
```
{
  "email": "nate@gmail.com", (string)
  "password: "123456" (string)
}
```

### POST: api/users/login
- Expected body
```
{
  "email": "nate@gmail.com", (string)
  "password: "123456" (string)
}
```

### DELETE: api/users/me/token
- Expected x-auth in header


### GET: api/todos

### GET: api/api/todos/:id

### POST: api/todos
- Expected body
```
{
  "text": "Some text"
}
```

### DELETE: api/api/todos/:id

### PATCH: api/todos/:id
- Expected body
```
{
  "text": "Some text",
  "completed: true / false
}
```