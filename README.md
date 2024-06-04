## Simple To-Do List API

This project provides a simple REST API for managing a to-do list using JSON data storage.

**Features:**

* **Get All Tasks:** Retrieve the entire list of tasks.
* **Get Task by ID:** Fetch a specific task by its unique identifier.
* **Create Task:** Add a new task to the list with title and completion status.
* **Update Task Completion:** Toggle the completion status of a task identified by its ID.
* **Delete Task:** Permanently remove a task from the list by its ID.

**Technology Stack:**

* Express.js: Web framework for building the API.
* Routing-Controllers: Decorator-based routing for Express.
* TypeScript: Statically typed language for robust code.

**API Endpoints:**

| Method | URL               | Description                                                  |
|---------|--------------------|--------------------------------------------------------------|
| GET     | `/tasks`           | Retrieves all tasks from the to-do list.                    |
| GET     | `/tasks/:id`       | Gets a specific task by its unique ID from the list.         |
| POST    | `/tasks`           | Creates a new task with the provided title and completion status. |
| PATCH   | `/tasks/:id`       | Updates the completion status of a task identified by its ID. |
| DELETE  | `/tasks/:id`       | Permanently removes a task from the to-do list by its ID.     |

**Running the API:**

**Clone the repository:**

```bash
git clone https://github.com/your-username/simple-to-do-list-api.git
```

**Install dependencies:**

```bash
cd simple-to-do-list-api
bun i
```

**Start the server:**

```bash
bun dev
```

**Additional Notes:**

* The API uses a JSON file (`/db/to-do-list.json`) to store task data.
* This is a basic example and can be extended to include features like user authentication, task filtering/sorting, and due dates.
* Feel free to contribute to this project by creating pull requests for improvements or new features!

