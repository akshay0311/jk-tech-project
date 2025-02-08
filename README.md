# Blog Application

Creating a blog site with frontend using Reactjs and Backend in Nestjs where user can signin using Google oAuth which is implemented using Passportjs after which jwt token is generated which allows user to make request to the list of posts and create their own posts


## Description

- The project uses **NestJS** to build a backend system for user authentication, performing CRUD operation on database created using Postgres.
- It includes **CRUD APIs** to perform operation posts and authentication api that perform google authentication and generate JWT.
- Google Authentication is done using Passportjs which helps in Authenticating users and redirect user to the dashboard sending the JWT token to the client
- Then the client makes the subsequent request to fetch and create posts by sending jwt token in the header.
- Frontend is created using Reactjs in which UI components are created using Material-UI and routing is done using react-router-dom.
- All the routes related to creating and reading blogs are protected and only authenitcated user can access these routes

