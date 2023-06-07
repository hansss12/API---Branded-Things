# **IKEDA API Documentation**

Demo App : [Ikeda](https://ikeda-8a0d5.web.app/)

---

## **GET /categories**

### success resonse (200) :

```json
[
    {
        "id": ineteger,
        "name": string,
        "createdAt": timestamp,
        "updatedAt": timestamp
    },
]
```

---

## **POST /categories**

### Request body :

```json
{
   "name" : string
}
```

### success resonse (201) :

```json
{
    "message": string
}
```

### Bad Request (400) :

```json
{
    "message": [
        string
    ]
}
```

---

## **DELETE /categories/:id**

### success resonse (200) :

```json
{
    "message": string
}
```

### Data not found (404) :

```json
{
    "message": string
}
```

---

## **UPDATE /categories/:id**

### success resonse (200) :

```json
{
    "message": string
}
```

---

## **GET /categories/:id**

### success resonse (200) :

```json
{
    "id": integer,
    "name": string,
    "createdAt": timestamp,
    "updatedAt": timestamp
}
```

### Data not found (404) :

```json
{
    "message": string
}
```

---

## **GET /**

### success resonse (200) :

```json
[
   {
      "id": integer,
      "username": string,
      "email": string,
      "role": string,
      "phoneNumber": string,
      "address": string,
      "createdAt": timestamp,
      "updatedAt": timestamp
   }
]
```

---

## **POST /register**

### Request body :

```json
{
   "username" : string,
   "email" : string,
   "password" : string,
   "phoneNumber" : string,
   "address" : string
}
```

### success resonse (201) :

```json
{
   "message" : string
}
```

## Invalid Input (400) :

```json
{
   "message": [
        string
    ]
}
```

---

## **POST /login**

### Request body

```json
{
   "email" : string,
   "password" : string,
}
```

### success resonse (200) :

```json
{
    "token": string,
    "username": string,
    "role": string,
    "id": integer
}
```

## Unauthorized (401) :

```json
{
    "message": string
}
```

---

## **GET /products**

### success resonse (200) :

```json
[
   {
      "id": anteger,
      "name": string,
      "description": string,
      "price": integer,
      "stock": integer,
      "imgUrl": string,
      "authorId": ineteger,
      "categoryId": integer,
      "createdAt": timestamp,
      "updatedAt": timestamp,
      "authors": {
         "id": integer,
         "username": string,
         "email": string,
         "role": string,
         "phoneNumber": string,
         "address": string,
         "createdAt": timestamp,
         "updatedAt": timestamp
      }
   }
]
```

---

## **GET /products/:id**

### Request headers

```json
   "access_token" : string
```

### success resonse (200) :

```json
{
   "id": integer,
   "name": string,
   "description": string,
   "price": ineteger,
   "stock": integer,
   "imgUrl": string,
   "authorId": integer,
   "categoryId": integer,
   "createdAt": timestamp,
   "updatedAt": timestamp
}
```

### Unauthorized error (401)

```json
{
   "message": string
}
```

---

## **POST /products**

### Request headers

```json
   "access_token" : string
```

### Request body

```json
{
   "name": string,
   "description": string,
   "price": integer,
   "stock": integer,
   "imgUrl": string,
   "authorId": integer,
   "categoryId": integer,
}
```

### success resonse (201) :

```json
{
   "id": integer,
   "name": string,
   "description": string,
   "price": integer,
   "stock": integer,
   "imgUrl": string,
   "authorId": integer,
   "categoryId": integer,
   "updatedAt": timestamp,
   "createdAt": timestamp
}
```

### Unauthorized error (401)

```json
{
   "message": string
}
```

### Bad request (400)

```json
{
    "message": [
        string
    ]
}
```

---

## **DELETE /products/:id**

### Request headers

```json
   "access_token" : string
```

### success resonse (200) :

```json
{
   "message": string
}
```

### Error not Found (404)

```json
{
   "message": string
}
```

### Error unautorization (403)

```json
{
   "message": string
}
```

---

## **PUT /products/:id**

### Request headers

```json
   "access_token" : string
```

### Request body

```json
{
   "name": string,
   "description": string,
   "price": integer,
   "stock": integer,
   "imgUrl": string,
   "authorId": integer,
   "categoryId": integer,
}
```

### success resonse (200) :

```json
{
   "message": string
}
```

### Error not Found (404)

```json
{
   "message": string
}
```

---

## **PATCH /products/:id**

### Request headers

```json
   "access_token" : string
```

### Request body

```json
{
   "status": string,
}
```

### success resonse (200) :

```json
{
   "message": string
}
```

### Error not Found (404)

```json
{
   "message": string
}
```

---

## **GET /histories**

### Request headers

```json
   "access_token" : string
```

### Request body

```json
{
   "status": string,
}
```

### success resonse (200) :

```json
[
   {
      "name": string,
      "description": string,
   }
]
```

### Error not Found (404)

```json
{
   "message": string
}
```

---

## **POST /customers/register**

### Request body

```json
{
   "username": string,
   "email": string,
   "password": string,
}
```

### success resonse (200) :

```json

{
   "message": string,
   "data": object
}

```

### Bad request (400)

```json
{
   "message": string
}
```

---

## **POST /customers/login**

### Request body

```json
{
   "email": string,
   "password": string,
}
```

### success resonse (200) :

```json

{
   "message" : string,
   "id" : integer,
   "username": string,
   "role": string,
   "token": string,

}

```

### Bad request (400)

```json
{
   "message": string
}
```

---

## **GET /customers/products**

### success resonse (200) :

```json

{
   "totalProducts": integer,
   "product": [
      {
         "id": integer,
         "name": string,
         "description": string,
         "price": integer,
         "stock": integer,
         "imgUrl": string,
         "status": string,
         "price": integer,
         "authorId": integer,
         "categoryId": integer,
         "createdAt": timestamp,
         "updatedAt": timestamp
      }
   ],
   "totalPages": integer,
   "currentPage": integer
}

```

### Bad request (400)

```json
{
   "message": string
}
```

---

## **GET /customers/products/:id**

### success resonse (200) :

```json

{
   "id": integer,
   "name": string,
   "description": string,
   "price": integer,
   "stock": integer,
   "imgUrl": string,
   "status": string,
   "price": integer,
   "authorId": integer,
   "categoryId": integer,
   "createdAt": timestamp,
   "updatedAt": timestamp
}

```

### Bad request (400)

```json
{
   "message": string
}
```

### Data not found (404)

```json
{
   "message": string
}
```

---

## **GET /customers/bookmarks**

### Request headers

```json
   "access_token" : string
```

### success resonse (200) :

```json
{
   "id": integer,
   "CustomerId": integer,
   "ProductId": integer,
   "Product": object
}
```

## **POST /customers/bookmarks/:id**

### Request headers

```json
   "access_token" : string
```

### success resonse (201) :

```json
{
   "id": integer,
   "CustomerId": integer,
   "ProductId": integer
}
```

### Bad request (400)

```json
{
   "message": string
}
```

### Unauthorized (401)

```json
{
   "message": string
}
```

### Data not found (404)

```json
{
   "message": string
}
```

---

## **DELETE /customers/bookmarks/:id**

### Request headers

```json
   "access_token" : string
```

### success resonse (200) :

```json
{
   "message": string
}
```

### Bad request (400)

```json
{
   "message": string
}
```

### Unauthorized (401)

```json
{
   "message": string
}
```

### Data not found (404)

```json
{
   "message": string
}
```

---

## **GLOBAL ERROR**

### Error Server (500)

```json
{
   "message": string
}
```
