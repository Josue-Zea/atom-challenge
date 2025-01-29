// import test, { describe } from "node:test";
// import { createTask, deleteTask, getTasks, updateTask } from "../services/task.service";

// describe("Task Service", () => {
//     test("should create a new task", async () => {
//         const userId = "testUserId";
//         const task = { title: "Test Task", description: "This is a test task", completed: false, creation_date: new Date() };

//         const newTask = await createTask(userId, task);
//         expect(newTask.id).toBeDefined();
//     });

//     test("should retrieve all tasks", async () => {
//         const userId = "testUserId";
//         const tasks = await getTasks(userId);
//         expect(tasks).toBeInstanceOf(Object);
//     });

//     test("should update a task", async () => {
//         const userId = "testUserId";
//         const taskId = "testTaskId";
//         const updatedData = { title: "Updated Task Title" };

//         await expect(updateTask(userId, taskId, updatedData)).resolves.not.toThrow();
//     });

//     test("should delete a task", async () => {
//         const userId = "testUserId";
//         const taskId = "testTaskId";

//         await expect(deleteTask(userId, taskId)).resolves.not.toThrow();
//     });
// });
