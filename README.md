# Dr. Baranyi Web Application - Exam Project


## Story

The project is an application of a pediatrist. It can store users, handle private messages and appointments. Its admin system provides management of the webpage content, messages and reservations. It has Google authentication system.


## Commands to start the application

1. Pull the docker images from docker hub:
    - docker pull tkuti/drbaranyiapppublic:1.0.1
    - docker pull tkuti/drbaranyiserverpublic:1.0.1

2. Run the containers:
    - docker run -dp 3000:80 tkuti/drbaranyiapppublic:1.0.1
    - docker run -dp 5000:5000 tkuti/drbaranyiserverpublic:1.0.1

3. Open the browser:
    - http://localhost:3000



## Login

1. With general user role:
    - personal Google account

2. With admin role:
    - test user
        email: testusercodecool@gmail.com
        password: testusercodecool1234



## Documentation

- <i class="far fa-book-open"></i> [Swagger documentation](http://localhost:5000/api/docs/)


