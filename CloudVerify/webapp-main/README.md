
# Health Check API

This repository contains a Flask-based API that checks the health of the application's database connection. The `/healthz` endpoint is designed to return the status of the connection to a PostgreSQL database.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/cloud_api.git
   cd cloud_api
   ```

2. **Install the dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up the PostgreSQL database**:
   - Ensure that PostgreSQL is installed and running.
   - Create a new database named `Cloud_DB` (or another name of your choice).
   - Note down the username, password, and database name as you'll need them in the next step.

### Running the API

1. **Configure environment variables**:

   Example `.env` file:
   ```
   DATABASE_URL=postgresql://<username>:<password>@localhost:5432/<database_name>
   ```

2. **Run the Flask application**:
   ```bash
   python app.py
   ```

   The API will start running on `http://127.0.0.1:5000`.

---

## Environment Variables

You will need to set the following environment variables in a `.env` file to properly connect to your PostgreSQL database:

| Variable       | Description                                  |
|----------------|----------------------------------------------|
| `DATABASE_URL` | Connection URL to the PostgreSQL database     |

Example:

```
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/Cloud_DB
```

---

## File Structure

The repository is organized into the following structure:

```
webapp/
│
├── app/
│   ├── __init__.py        # Initializes Flask app and registers routes
│   ├── models.py          # Defines the database models
│   ├── routes.py          # Contains route definitions, including health check
│   └── config.py          # Configures app settings, including the database URI
├── app.py                  # Main entry point for running the Flask app
├── requirements.txt        # List of Python dependencies
└── README.md               # Project documentation (this file)
```

### Key Files:

- **`app/__init__.py`**: Initializes the Flask application and registers routes.
- **`app/models.py`**: Contains the database model definitions using SQLAlchemy.
- **`app/routes.py`**: Contains the `/healthz` route, which performs the health check by connecting to the database.
- **`app/config.py`**: Loads environment variables and configures the SQLAlchemy database URI.
- **`.env.example`**: A sample environment file that shows how to structure the actual `.env` file with the correct database credentials.
- **`app.py`**: The entry point to start the Flask application.

---

## API Endpoints

### `/healthz`

- **Method**: `GET`
- **Description**: The `/healthz` endpoint checks the health of the database connection.
  - If the connection is successful, it returns an empty response with status `200 OK`.
  - If the connection fails, it returns a `503 Service Unavailable` status.
  
- **Method**: `POST`, `PUT`, `DELETE`, `PATCH`
  - These methods return a `405 Method Not Allowed` status with an empty response.

---

## Troubleshooting

### Common Issues

1. **503 Service Unavailable Error**:
   - Ensure your PostgreSQL server is running and that the credentials in the `.env` file are correct.
   - Check the PostgreSQL logs to ensure there are no errors with the connection.

2. **Method Not Allowed (405)**:
3. 

testing flow build
   - This API only supports the `GET` method for the `/healthz` endpoint. Ensure that you are sending a `GET` request.

4. **Flask app not starting**:
   - Ensure all required dependencies are installed (`pip install -r requirements.txt`).
   - Check that your environment variables are set up correctly in the `.env` file.
