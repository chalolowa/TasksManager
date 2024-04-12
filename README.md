**Task Management System**

This project is a backend canister based on Interner Computer developed using TypeScript and the Azle framework. It serves as a task management system where users can create tasks, update their status, and delete them. 

### Features
- **Create Tasks**: Users can create new tasks by providing a title, description, and status.
- **Update Task Status**: Tasks can be updated to reflect their status, such as "pending", "in-progress", or "complete".
- **Delete Tasks**: Users have the ability to delete tasks that are no longer needed.
- **Simple REST API**: The system provides a simple REST API for managing tasks, making it easy to integrate with frontend or other systems.

### Technologies Used
- **TypeScript**: The project is written in TypeScript, providing type safety and enhanced developer experience.
- **Azle Framework**: Azle is used to handle HTTP requests and provide routing for the backend services.
- **Node.js and Express**: The backend server is built using Node.js with Express.js for handling HTTP requests and middleware.

### Getting Started
To get started with the project, follow these steps:
1. Clone the repository to your local machine.
2. Install dependencies using `npm install`.
3. Build the project using `npm run build`.
4. Start the server using `npm start`.

### Usage
Once the server is running, you can use the provided REST API endpoints to manage tasks:
- `GET /tasks`: Retrieve all tasks.
- `POST /tasks`: Create a new task.
- `PUT /tasks/:id`: Update the status of a task with the given ID.
- `DELETE /tasks/:id`: Delete the task with the given ID.

### Contribution
Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

### License
This project is licensed under the [MIT License](LICENSE).

### Contact
For any inquiries or feedback, you can reach out to Chalolowa at locha.softwaredev@gmail.com.

