# Homebase Nodejs Django mock project

## Introduction

The project consists of two subsystems, `Node.js` and `Django`, connected to each other through a `Python proxy` on the `Django` side. The project can be started using `Docker Compose`.

### Node.js Application

- **Create Resource "User"**: Utilizes Sequelize ORM to create a "User" resource.
  
- **UserService**: Contains CRUD actions performed through the `User` model.
  
- **UserController**: Manages logic for returning HTTP responses following RESTful standards.
  
- **Routing**: Directs HTTP requests to the appropriate controller.
  
- **Other Features**: Includes database migrations and testing using Jest.

### Django Functionality

- **Admin Interface**: Access the admin interface at [http://localhost:8000/admin](http://localhost:8000/admin) (default credentials: admin/123qwe!@#QWE).
  
- **Product Module**: Includes the `Product` model, which is added to the admin interface.
  
- **Proxy Module**: Contains the `proxy_view` function to forward requests to Node.js (http://localhost:3000). For example, to fetch all users from Node.js: [http://localhost:8000/proxy/api/users](http://localhost:8000/proxy/api/users).
  
- **Proxy Module Helpers**: the main logic and helper scripts to handle the proxy functionality.

### Python Script handle proxy
[apps/django/app/proxy/helpers.py](apps/django/app/proxy/helpers.py)

## Getting Started

To run this project, you will need Docker and Docker Compose installed on your machine.

### Running the Applications
1. Clone this repository to your local machine.

2. Navigate to the project's root directory.

3. Build and start

#### Docker compose
- Build and start the Docker containers using Docker Compose:

   ```bash
   docker-compose up
   ```
   or use `make` command
   ```bash
   make up
   ```
#### None Docker
##### Start NodeJs
- Start Node.js - require Node version >=18, navigate to root project
- Run command `cd apps/express/app && npm install && npm start`
- Server start at: [http://localhost:3000](http://localhost:3000)
##### Start Django
- Start Django - require Python 3x, navigate to root project
- Update `.env`, navigate to `apps/django/app/.evn` update `EXPRESS_BASEURL=http://localhost:3000`
- Navigate to `cd apps/django`
- Run command `./install_start.sh` to install depends and start project at [http://localhost:8000](http://localhost:8000/admin)

## API Testing with Postman

You can use the provided Postman collection to perform API testing. Download the collection file using the following link:

[Postman Collection](./api.postman_collection.json)