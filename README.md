# Task Management API

## About the Challenge

In this challenge, you will develop an API to perform CRUD operations on your tasks. The API must include the following functionalities:

- Creating a task
- Listing all tasks
- Updating a task by `id`
- Removing a task by `id`
- Marking a task as complete by `id`
- And the real challenge: Importing tasks in bulk via a CSV file

## Functional Requirements

### Task Structure
A task must have the following properties:
- `id` - Unique identifier for each task
- `title` - Title of the task
- `description` - Detailed description of the task
- `completed_at` - Date when the task was completed. The initial value should be `null`
- `created_at` - Date when the task was created
- `updated_at` - Should always be updated to the date when the task was last updated

### Routes and Business Rules

#### `POST - /tasks`
- Create a new task in the database.
- The `title` and `description` fields must be sent in the body of the request.
- The `id`, `created_at`, `updated_at`, and `completed_at` fields should be automatically filled as per the property guidelines.

#### `GET - /tasks`
- List all tasks saved in the database.
- It should also be possible to search for tasks by filtering by `title` and `description`.

#### `PUT - /tasks/:id`
- Update a task by `id`.
- The body of the request should contain only `title` and/or `description`.
- Validate if the `id` belongs to a task saved in the database before updating.

#### `DELETE - /tasks/:id`
- Remove a task by `id`.
- Validate if the `id` belongs to a task saved in the database before deleting.

#### `PATCH - /tasks/:id/complete`
- Mark a task as complete or revert it to incomplete.
- Validate if the `id` belongs to a task saved in the database before updating.

## Non-Functional Requirements

### Performance
- The API must be able to handle a large number of simultaneous requests.
- The bulk import of tasks via CSV should be efficient and able to process large volumes of data without significant performance degradation.

### Security
- Input validation should be rigorous to prevent SQL injection and other common vulnerabilities.
- Error responses should not expose internal system details.

### Maintainability
- The code should be modular and follow good programming practices, facilitating maintenance and future expansion.
- Clear documentation should be provided on how to use the API, including request and response examples.

### Reliability
- The API should have high availability and be resilient to failures.
- Appropriate logging should be implemented to monitor and diagnose issues.

### Usability
- The API should be simple and intuitive for developers to use.
- API responses should be clear and consistent.

### Compatibility
- The API should be compatible with current versions of major browsers and HTTP client tools.
- It should be easy to integrate the API with other applications and services.

## Conclusion

The Task Management API should provide an efficient and secure way to manage tasks, including CRUD operations and bulk import via CSV. By following the described functional and non-functional requirements, the API should offer a robust and reliable experience for users.