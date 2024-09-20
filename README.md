# Commit Journal 
Application to store version control commits with description and theme tags. 

# Structure 
Application is divided into two parts : 
* Backend module: commit-journal-backend , provides REST API to store and retrieve Commit records.
  - Language: Java 17
  - Build Tool: Maven
  - Framework: Spring Boot 3
  - Dockerfile: Dockerfile
  - Port: 8080
  - Database: MySQL
  - Database Connection: Configured via environment variables in docker-compose.yaml
  

* Frontend module: commit-journal , provides UI to perform browse , text search and add operations on Commit records.
  - Language: JavaScript
  - Framework: React
  - Package Manager: npm
  - Dockerfile: Dockerfile
  - Port: 3000
  - CSS Framework: Bootstrap
 
# Run with Docker
To run both parts of the application together, execute the following commands in the root directory of the project:

```bash
docker-compose up
```
Application will be available at http://localhost:3000