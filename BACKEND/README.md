## Response Details

### Response Codes

- **201 Created:** Indicates that the user was successfully registered. The response body contains a JSON object with the new user's ID and an authentication token.
- **400 Bad Request:** Indicates that the request could not be understood due to malformed syntax or missing required parameters. The response body contains a JSON object with an error message providing more information about the error.
- **409 Conflict:** Indicates that the email is already registered. The response body contains a JSON object with an error message indicating that the email is already taken.
- **500 Internal Server Error:** Indicates a server error occurred while processing the request. The response body contains a JSON object with a generic error message.

### Response Payload

#### Success Response (201 Created)
```json
{
    "userId": "65a8e4e94fa99949e4624449",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWE4ZTRlOTRmYTk5OTQ5ZTQ2MjQ0NDkiLCJpYXQiOjE3MDYwNzQ4NjUsImV4cCI6MTcwNjY3OTY2NX0.VGhJc_QVt9_3zuQyqVvGufCjDRIz2JuJGCQpsJq7xBY"
}
```

#### Error Response (400 Bad Request)
```json
{
    "message": "Please enter a valid email"
}
```

#### Error Response (409 Conflict)

```json
{
    "message": "Email already taken"
}
```

### Sample Success Response
```http
HTTP/1.1 201 Created
Content-Type: application/json
```

```json
{
    "userId": "65a8e4e94fa99949e4624449",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWE4ZTRlOTRmYTk5OTQ5ZTQ2MjQ0NDkiLCJpYXQiOjE3MDYwNzQ4NjUsImV4cCI6MTcwNjY3OTY2NX0.VGhJc_QVt9_3zuQyqVvGufCjDRIz2JuJGCQpsJq7xBY"
}
```

## Usage

To register a new user, send a POST request to the `/users/register` endpoint with the required user details in the request body. Ensure that the `Content-Type` header is set to `application/json`.

## Authentication

Upon successful registration, the endpoint returns a JWT (JSON Web Token) that can be used for authenticating subsequent requests to protected endpoints. Store this token securely on the client-side and include it in the `Authorization` header of future requests.

## Notes

- The password should be securely stored using bcrypt or a similar hashing algorithm.
- Ensure proper error handling and validation on both the client and server sides to provide a smooth user experience and prevent security vulnerabilities.
- Consider implementing rate limiting to prevent abuse of the registration endpoint.
- The token expires in 7 days.
# /users/register Endpoint Documentation

## Description
The `/users/register` endpoint is used to register a new user into the application. The endpoint accepts user details in JSON format, validates the input, hashes the password, creates the user in the database, and returns an authentication token on success.

This endpoint is implemented in [`/BACKEND/routes/user.routes.js`](C:/Users/ashif/Desktop/UBER/BACKEND/routes/user.routes.js) and handled by [`/BACKEND/controllers/user.controller.js`](C:/Users/ashif/Desktop/UBER/BACKEND/controllers/user.controller.js).

## Request Details

### Request Type
- **Method:** POST
- **URL:** `/users/register`

### Request Payload

The request body must be a JSON object containing the following properties:

| Field                  | Type    | Required | Description                                                          | Validation Criteria                                                           |
| ---------------------- | ------- | -------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `email`                | String  | Yes      | User's email address. Must be a valid email format.                  | Must be a valid email (`express-validator` checks email format)               |
| `fullname.firstname`   | String  | Yes      | User's first name. Must be at least 3 characters long.               | Minimum length of 3 characters                                                |
| `fullname.lastname`    | String  | No       | User's last name.                                                    | If provided, minimum length of 3 characters                                   |
| `password`             | String  | Yes      | User's password. Must be at least 6 characters long.                 | Minimum length of 6 characters                                                |

### Sample Request Body
```json
{
  "email": "user@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "secret123"
}






## /login Endpoint Documentation

## Description
The `/login` endpoint allows a registered user to authenticate using their email and password. Upon successful authentication, the endpoint returns a JSON Web Token (JWT) along with the user's ID for accessing protected resources.

## Request Details

### Request Type
- **Method:** POST
- **URL:** `/login`

### Request Payload

The request body must be a JSON object containing the following properties:

| Field    | Type   | Required | Description                         | Validation Criteria                          |
| -------- | ------ | -------- | ----------------------------------- | -------------------------------------------- |
| `email`  | String | Yes      | User's registered email address.  | Must be a valid email format.                |
| `password` | String | Yes    | User's password.                    | Must match the stored hashed password.       |

### Sample Request Body
```json
{
  "email": "user@example.com",
  "password": "secret123"
}
```

## Response Details

### Success Response (200 OK)
```json
{
  "userId": "65a8e4e94fa99949e4624449",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Error Response (401 Unauthorized)
```json
{
  "message": "Invalid email or password"
}
```

## Usage Notes
- Ensure that the `Content-Type` header is set to `application/json` when making the request.
- Store the received JWT securely and include it in the `Authorization` header for subsequent protected endpoint requests.
- Implement thorough error handling and validation on both client-side and server-side to increase security.
- The token expires in 7 days.

