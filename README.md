# back-end-assignment---reunion

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-ISC-green)

## Description

APIs for social media platform

## Main

app.js

## Features

- start: `node app.js`
- build: `npm install`
- test: `mocha --require @babel/register --timeout 10000 --exit './test/**/*.test.js'`
- build-docker-image: `docker build --build-arg NODE_VERSION=18.15.0 -t myapp .`
- run-docker-container: `docker run -p 3000:3000 myapp`

## Author

Shivam Uttam

## Dependencies

- body-parser: ^1.20.2
- dotenv: ^16.0.3
- express: ^4.18.2
- jsonwebtoken: ^9.0.0
- mongoose: ^7.0.2

## DevDependencies

- @babel/register: ^7.21.0
- chai: ^4.3.7
- chai-http: ^4.3.0
- mocha: ^10.2.0
- nodemon: ^2.0.21


# Test email and password:
- email: test@gmail.com, 
- password: test123
