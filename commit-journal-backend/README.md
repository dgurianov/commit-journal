# Commit Journal Backend

## Overview

The Commit Journal Backend is a Spring Boot backed application that provides a RESTful API for managing commit journal records. It uses a MySQL database in the development environment and an H2 in-memory database for testing.

## Project Structure

The project is structured as follows:

- **controller**: Contains REST controllers.
- **model**: Contains entity classes.
- **repository**: Contains Spring Data JPA repositories.
- **service**: Contains service classes.
- **resources**: Contains configuration files.

## Prerequisites

- Java 17
- Maven
- Docker and Docker Compose

## Running the Application

### Using Docker Compose

1. Build and start the application using Docker Compose:

    ```sh
    docker-compose up --build
    ```

2. The application will be available at `http://localhost:8080`.

### Running Locally

1. Start the MySQL database:

    ```sh
    docker-compose up mysql
    ```

2. Build the application:

    ```sh
    mvn clean install
    ```

3. Run the application:

    ```sh
    mvn spring-boot:run
    ```

4. The application will be available at `http://localhost:8080`.

## Configuration

The application uses different profiles for different environments. The profiles are defined in the following files:

- `application.properties`: Common properties.
- `application-dev.properties`: Development environment properties.
- `application-local.properties`: Local testing properties.

You can specify the active profile using the `SPRING_PROFILES_ACTIVE` environment variable.

# API 

#### Endpoints  by entity:
* Commit

  | Description       | Method | Endpoint                            | Payload                                                                                                                                                                                   | 
  |-------------------|--------|-------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
  | Get all           | GET    | /api/v1/commit/                     | None                                                                                                                                                                                      | 
  | Get by id         | GET    | /api/v1/commit/{id}                 | None                                                                                                                                                                                      |
  | Search            | GET    | /api/v1/commit?q=x&page=#&size=#    | None                                                                                                                                                                                      |
  | Create or replace | PUT    | /api/v1/commit/                     | <pre> [{ "commitId": "1234", <br>  "userName": "mark",  <br>  "repoId": "important-app", <br>  "tags": [{"id": "dev"}, {"id":"PROD"}], <br>  "description": "Lorem ipsum." <br>  }]</pre> |     
  | Delete by id      | DELETE | /api/v1/commit/{id}                 | None                                                                                                                                                                                      |                                                                                                                                                                           




