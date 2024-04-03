# Backend For Frontends (BFF) Pattern Implementation with JWT Authentication

In this project assignment, you will apply the Backend For Frontends (BFF) pattern to your system, and add authentication control to your API with JWT. You will create an increment of the e-commerce system that you started in A1. The requirements and context in which this system will be used will evolve as the course progresses, so be sure to check the specifications provided in previous assignments and make sure your system complies.

## Learning Objectives

This assignment introduces you to both the core technologies that you will be using throughout the course, and to developing a system to support a given API specification. By the end of this assignment, you should be able to:

- Configure the needed infrastructure
- Develop a simple application
- Deploy your application
- Execute your system
- (Hopefully) Pass test cases generated by an automated testing tool

### Technologies Include:

- AWS services: EC2, VPC, CloudFormation (CF)
- MySQL on AWS RDS
- Postman (or similar API testing tool)
- Docker
- Node JS and Express (or other language/framework you choose to create your services)
- JWT (added in A2)
- BFF pattern (added in A2)
- Single Responsibility Principle (added in A2)

## System Design

In this assignment, you will separate your system into multiple microservices. This is something you may want to do in practice for a number of reasons, including the ability to scale the capability related to books independently from the capability related to customers. In a real scenario, you would do that in case book endpoints are called far more often than customer endpoints.

Also, Books and Customers represent distinct functional contexts. Per the Single Responsibility Principle (SRP), they should be implemented separately. Single responsibility is letter ‘S’ in IDEALS. In our particular case, we want books responsibilities and customers responsibilities in separate microservices.

## BFF Implementation

In addition, you will implement a BFF for two different types of clients. BFF services can provide various capabilities. In our case, they will simply identify the type of client that is making the request (web app or mobile iOS/Android) and configure the response accordingly.

The HTTP request to the BFF services must contain the `X-Client-Type` custom header, which specifies the client component. Your solution should route requests based on the header value as indicated in the table below.

| Value of X-Client-Type | What to do                                   |
|-------------------------|----------------------------------------------|
| Web                     | Route to the Book store web app BFF service  |
| iOS                     | Route to the Book store mobile app BFF service|
| Android                 | Route to the Book store mobile app BFF service|
| header not present      | Reply with a 400 error                       |

The routing shall be performed by the ALB. The provided CF template (`CF-A2-cmu.yml` in this GitHub repo) might be incomplete. Read through the CF template to identify where the routing based on the `X-Client-Type` header is performed. Complement the template for routing rules that might be missing.

The client type (mobile or web app) will dictate the expected response.
