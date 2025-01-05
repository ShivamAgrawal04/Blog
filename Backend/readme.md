# Backend API Documentation

## Overview

This document provides an overview of the API endpoints available in the backend application, including request and response formats, status codes, and descriptions of each endpoint.

## Environment Setup

Ensure you have a `.env` file with the following variables:

```
ORIGIN=http://localhost:5173/
PORT=3000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
```

## API Endpoints

### User Routes

- **Register a User**

  - **Endpoint:** `/api/users/register`
  - **Method:** `POST`
  - **Request Body:**
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string",
      "role": "string" // "admin" or "user"
    }
    ```
  - **Response:**
    - **Success:** `201 Created`
      ```json
      {
        "message": "Admin added successfully",
        "user": {
          /* user object */
        }
      }
      ```
    - **Error:** `400 Bad Request` or `500 Internal Server Error`

- **Login a User**

  - **Endpoint:** `/api/users/login`
  - **Method:** `POST`
  - **Request Body:**
    ```json
    {
      "email": "string",
      "password": "string",
      "role": "string" // optional
    }
    ```
  - **Response:**
    - **Success:** `200 OK`
      ```json
      {
        "message": "Login successful",
        "token": "jwt_token"
      }
      ```
    - **Error:** `404 Not Found`, `401 Unauthorized`, or `500 Internal Server Error`

- **Logout a User**

  - **Endpoint:** `/api/users/logout`
  - **Method:** `GET`
  - **Response:**
    - **Success:** `200 OK`
      ```json
      {
        "message": "Logged out successfully"
      }
      ```

### Blog Routes

- **Get Blog List**

  - **Endpoint:** `/api/blogs/blogLists`
  - **Method:** `GET`
  - **Response:**
    - **Success:** `200 OK`
      ```json
      {
        "totalBlogs": "number",
        "currentPage": "number",
        "totalPages": "number",
        "blogs": [
          /* array of blog objects */
        ]
      }
      ```

- **Get Blog by ID**

  - **Endpoint:** `/api/blogs/:id`
  - **Method:** `GET`
  - **Response:**
    - **Success:** `200 OK`
      ```json
      {
        /* blog object */
      }
      ```
    - **Error:** `404 Not Found`

- **Create a Blog**

  - **Endpoint:** `/api/blogs/blogCreate`
  - **Method:** `POST`
  - **Headers:** `Authorization: Bearer <token>`
  - **Request Body:** Form data with fields `title`, `content`, `tags`, `seoTitle`, `seoDescription`, and `image` (file)
  - **Response:**
    - **Success:** `201 Created`
      ```json
      {
        "message": "Blog created successfully",
        "blog": {
          /* blog object */
        }
      }
      ```
    - **Error:** `403 Forbidden` or `500 Internal Server Error`

- **Update a Blog**

  - **Endpoint:** `/api/blogs/:id`
  - **Method:** `PUT`
  - **Headers:** `Authorization: Bearer <token>`
  - **Request Body:** Form data with fields `title`, `content`, `tags`, `seoTitle`, `seoDescription`, and `image` (file)
  - **Response:**
    - **Success:** `200 OK`
      ```json
      {
        "message": "Blog updated successfully",
        "blog": {
          /* blog object */
        }
      }
      ```
    - **Error:** `404 Not Found`, `403 Forbidden`, or `500 Internal Server Error`

- **Delete a Blog**

  - **Endpoint:** `/api/blogs/:id`
  - **Method:** `DELETE`
  - **Headers:** `Authorization: Bearer <token>`
  - **Response:**
    - **Success:** `200 OK`
      ```json
      {
        "message": "Blog deleted successfully"
      }
      ```
    - **Error:** `404 Not Found` or `500 Internal Server Error`

### Comment Routes

- **Add a Comment**

  - **Endpoint:** `/api/comments`
  - **Method:** `POST`
  - **Headers:** `Authorization: Bearer <token>`
  - **Request Body:**
    ```json
    {
      "blogId": "string",
      "content": "string"
    }
    ```
  - **Response:**
    - **Success:** `201 Created`
      ```json
      {
        "message": "Comment added successfully",
        "comment": {
          /* comment object */
        }
      }
      ```
    - **Error:** `404 Not Found` or `500 Internal Server Error`

- **Get Comments by Blog ID**

  - **Endpoint:** `/api/comments/:blogId`
  - **Method:** `GET`
  - **Response:**
    - **Success:** `200 OK`
      ```json
      [
        /* array of comment objects */
      ]
      ```
    - **Error:** `404 Not Found` or `500 Internal Server Error`

### SEO Routes

- **Get SEO Stats**

  - **Endpoint:** `/api/seo/seo-stats`
  - **Method:** `GET`
  - **Response:**
    - **Success:** `200 OK`
      ```json
      {
        "totalBlogs": "number",
        "totalComments": "number",
        "mostPopularTag": "string",
        "mostCommentedBlog": "string",
        "avgSeoScore": "number"
      }
      ```
    - **Error:** `500 Internal Server Error`

## Error Handling

All endpoints return a JSON object with a `message` field describing the error in case of failure, along with an appropriate HTTP status code.

## Authentication

- JWT is used for authentication. Include the token in the `Authorization` header as `Bearer <token>` for protected routes.

## License

This project is licensed under the ISC License.

```

This `README.md` provides a structured overview of your API, including endpoints, request/response formats, and status codes. You can further customize it by adding more details or sections as needed.
```
