# ENDPOINTS

- GET /products
- POST /products
- GET /categories
- GET /products/:id
- DELETE /products/:id
- POST /register
- POST /login
- POST /google-sign-in
- POST /categories
- DELETE /categories

# GET /products

## Description

- Get all products data

## Request

- headers

```json
{
  "authorization": "TOKEN"
}
```

## Response

200 - OK

- Body

```json
[
  {
    "id": "INTEGER",
    "name": "STRING",
    "description": "STRING",
    "price": "INTEGER",
    "stock": "INTEGER",
    "imgUrl": "STRING",
    "categoryId": "INTEGER",
    "authorId": "INTEGER",
    "createdAt": "DATE",
    "updatedAt": "DATE",
    "authors": {
      "id": "INTEGER",
      "username": "STRING",
      "email": "STRING",
      "role": "STRING",
      "phoneNumber": "STRING",
      "address": "STRING",
      "createdAt": "DATE",
      "updatedAt": "DATE"
    }
  }
]
```

# POST /products

## Description

- create a product to database

## Request

- headers

```json
{
  "authorization": "TOKEN"
}
```

## Response

201 - Created

- Body

```json
{
  "id": "INTEGER",
  "name": "STRING",
  "description": "STRING",
  "price": "INTEGER",
  "stock": "INTEGER",
  "imgUrl": "STRING",
  "categoryId": "INTEGER",
  "authorId": "INTEGER",
  "createdAt": "DATE",
  "updatedAt": "DATE"
}
```

400 - Bad Request

```json
{
  "message": "STRING"
}
```

# GET /categories

## Request

- headers

```json
{
  "authorization": "TOKEN"
}
```

## Response

200 - OK

- Body

```json
{
  "id": "INTEGER",
  "name": "STRING",
  "createdAt": "DATE",
  "updatedAt": "DATE"
}
```

# GET /products/:id

## Description

- Get the product data

## Request

- headers

```json
{
  "authorization": "TOKEN"
}
```

## Response

200 - OK

- Body

```json
{
  "id": "INTEGER",
  "name": "STRING",
  "description": "STRING",
  "price": "INTEGER",
  "stock": "INTEGER",
  "imgUrl": "STRING",
  "categoryId": "INTEGER",
  "authorId": "INTEGER",
  "createdAt": "DATE",
  "updatedAt": "DATE"
}
```

404 - Not Found

```json
{
  "message": "Product not found"
}
```

# DELETE /products/:id

## Description

- Delete the Product data

## Request

- headers

```json
{
  "authorization": "TOKEN"
}
```

## Response

200 - OK

- Body

```json
{
  "message": "Product successfully deleted",
  "data": {
    "id": "INTEGER",
    "name": "STRING",
    "description": "STRING",
    "price": "INTEGER",
    "stock": "INTEGER",
    "imgUrl": "STRING",
    "categoryId": "INTEGER",
    "authorId": "INTEGER",
    "createdAt": "DATE",
    "updatedAt": "DATE"
  }
}
```

401 - Access Denied

```json
{
  "message": "STRING"
}
```

404 - Not Found

```json
{
  "message": "Product not found"
}
```

# POST /register

# Description

- Add User to database

201 - Created

- body

```json
{
  "message": "User with username <username> successfully created",
  "data": {
    "id": "INTEGER",
    "email": "STRING"
  }
}
```

# POST /login

200 - OK

```json
{
  "message": "Success Login",
  "id": "INTEGER",
  "username": "STRING",
  "role": "STRING",
  "token": "STRING"
}
```

401 - Login Failed

```json
{
  "message": "STRING"
}
```

401 - Invalid Token

```json
{
  "message": "STRING"
}
```

403 - Invalid Email or Password

```json
{
  "message": "STRING"
}
```

# POST /google-sign-in

- Authentication (login)

200 - OK

```json
{
  "message": "Success Login",
  "id": "INTEGER",
  "username": "STRING",
  "role": "STRING",
  "token": "STRING"
}
```

# POST /categories

## description

- add new category

## Request

- headers

```json
{
  "authorization": "TOKEN"
}
```

200 - OK

```json
{
  "message": "STRING"
}
```

# DELETE /categories

## description

- delete category

## Request

- headers

```json
{
  "authorization": "TOKEN"
}
```

200 - OK

```json
{
  "message": "STRING"
}
```
