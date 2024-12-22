# SkilHire

**Install backend dependencies**: Run the following command in the project `backend` directory:
    ```sh
    npm init
    ```

### Build and start the application:
   ```sh
   npm start
   ```

### Access the Application

Navigate to `http://localhost:3001` in any web browser.

# API Endpoints

## User Creation
- **Endpoint:** `POST /user/create`
- **Function:** Creates a new user with full name, email, and password. Implement validations for email and full name, and enforce a strong password rule.

## Update User Details
- **Endpoint:** `PUT /user/edit`
- **Function:** Allows updating the user's full name and password. Email cannot be updated. Validate full name and password, and ensure the user exists in the database before updating.

## Delete User
- **Endpoint:** `DELETE /user/delete`
- **Function:** Deletes a user by their email.

## Retrieve All Users
- **Endpoint:** `GET /user/getAll`
- **Function:** Retrieves all users' full names, email addresses, and passwords stored in the database.