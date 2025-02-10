# Blog Application

Creating a blog site with frontend using Reactjs and Backend in Nestjs where user can signin using Google oAuth which is implemented using Passportjs after which jwt token is generated, user is then redirected to the dashboard page where user can see list of posts and create their own posts.


## Description

- The project uses **NestJS** to build a backend system for user authentication which is then used for performing CRUD operations on database created using Postgres.
- It includes **CRUD APIs** to perform operations like (read list of posts and create post) and authentication api that perform google authentication.
- Google Authentication is done using **Passportjs** which helps in Authenticating users and redirect user to the dashboard sending the JWT token to the client.
- Then the client makes the subsequent requests to fetch and create posts by sending jwt token in the header.
- Only authorized user (i.e. users having bearer token in the header) are able to make request to the **CRUD APIs**.
- Operations are done on postgres database with the help of **TypeORM**.
- Frontend is created using Reactjs in which UI components are created using **Material-UI** and routing is done using **react-router-dom**.
- All the routes related to creating and reading blogs are protected and only authenitcated user can access these routes.
- Project also contains scripts that use **Terraform** to deploy the frontend and backend to AWS.
- **Docker Image** is there for both frontend and backend.
- **Unit Testing** is done for the components in frontend and API's in backend.

## Prerequisites

- **Nest.js**
- **Reactjs**
- **PostgreSQL**
- **Passportjs**
- **Material-UI**

## Installation

It contains two folder : Frontend (Reactjs) Backend (Nestjs) -> 
Both requires below steps:

```sh
git clone https://github.com/akshay0311/jk-tech-project
npm install
```

# Add configuration 

Create .env file and add these configuration

```sh
GOOGLE_CLIENT_ID=126855534697-pq76bphdugh533jlp62r5jh3qtvid52p.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD= 'DomSec#123'
DB_NAME=postgres
JWT_SECRET=your-secret-key
```

## Run the app

```sh
# Reactjs App
npm start

# Visit
localhost:3001

# Nestjs App

# development
npm run start:dev

# Visit
localhost:3002


```

## Dockerize the app

Run the docker build for React frontend

```sh
docker build -t react-app .
docker run -d -p 3001:3001 react-app
```

Run the docker build for Nest backend 

```sh
docker build -t nest-app .
docker run -d -p 3002:3002 nest-app
```

## Key APIS

CRUD API for Posts

```sh
- GET `/posts`
- GET `/posts/:id`
- POST `/posts`
- DELETE `/posts`
- PUT `/posts`
```

APIs for users authentication

```sh
- GET `auth/google`
- GET `auth/google/callback`
```
