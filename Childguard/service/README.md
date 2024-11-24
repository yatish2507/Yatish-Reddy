# Course Registration Service

Course Registration Service is a set of REST APIs for managing course registrations.

## Design

1. [Model](docs/model.md)
2. [OpenAPI Spec](docs/course-registration-api.yml)

## Development

### Start the API service

Create a `.env` inside the `course-registration-service` directory with below content.

```shell
PORT=3000
MONGO_CONNECTION=<REPLACE-WITH-MONGODB-CONNECTION-STRING>
```

```shell
npm i
npm run start
```

### Bruno Collections

Clear the existing CourseRegistration bruno collections and open the collections directory at `docs/collections/CourseRegistration`.
