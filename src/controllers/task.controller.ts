import { Request, Response } from "express";
import { Get, Controller, Req, Res, Post, Patch, Delete } from "routing-controllers";
import manageJsonFile from "../library/manage-json-file";
import path from "path";

interface ITask {
  id: number;
  title: string;
  completed: boolean;
}

@Controller("/tasks")
export class TasksController {
  async readAJSONFile() {
    return (await manageJsonFile.readAJSONFile(
      path.join(__dirname.replace("controllers", "db"), "/to-do-list.json")
    )) as ITask[];
  }

  async writeAJSONFile(jsonResult: ITask[]) {
    return await manageJsonFile.writeAJSONFile(
      path.join(__dirname.replace("controllers", "db"), "/to-do-list.json"),
      jsonResult
    );
  }

  @Get("/")
  async getTasksAll(@Req() _: Request, @Res() response: Response) {
    const json = await this.readAJSONFile();
    return response.send({
      data: json,
      status: "200",
    });
  }

  @Get("/:id")
  async getTaskById(@Req() request: Request, @Res() response: Response) {
    const { id } = request.params;
    const json = await this.readAJSONFile();
    const data = json.find((j) => +j.id === +id);
    return response.send({
      data: data ?? [],
      status: "200",
    });
  }

  @Post("/")
  async createTask(@Req() request: Request, @Res() response: Response) {
    try {
      const newTask: ITask = request.body

      const tasks = await this.readAJSONFile();
      tasks.push(newTask);
      const jsonResult = tasks.map(this.toTaskResponse);

      await manageJsonFile.writeAJSONFile(
        path.join(__dirname.replace("controllers", "db"), "/to-do-list.json"),
        jsonResult
      );

      return response.send({
        message: "create task complete",
        status: "200",
      });
    } catch (error) {
      return response.status(500).send({ message: "Error creating task" });
    }
  }

  @Patch("/:id")
  async updateCompleteTask(@Req() request: Request, @Res() response: Response) {
    const { id } = request.params;
    const tasks = await this.readAJSONFile();

    // Read tasks from JSON file
    const taskIndex = tasks.findIndex((task) => task.id === +id);

    // Find the task by ID
    if (taskIndex === -1) {
      return response.status(400).send({ message: "Task not found" });
    }

    // Update completed status
    tasks[taskIndex].completed = !tasks[taskIndex].completed;

    // Write updated tasks to JSON file
    await this.writeAJSONFile(tasks);

    // Return updated task
    return response.send({
      data: tasks[taskIndex],
      status: "200",
    });
  }

  @Delete("/:id")
  async hardDeleteTask(@Req() request: Request, @Res() response: Response) {
    const { id } = request.params;
    const tasks = await this.readAJSONFile();

    // Read tasks from JSON file
    const taskIndex = tasks.findIndex((task) => task.id === +id);

    // Find the task by ID
    if (taskIndex === -1) {
      return response.status(400).send({ message: "Task not found" });
    }

    // Filter delete tasks
    const tasksFilter = tasks.filter(item => +item.id !== +id)

    // Write updated tasks to JSON file
    await this.writeAJSONFile(tasksFilter);

    // Return updated task
    return response.send({
      data: tasksFilter,
      status: "200",
    });
  }

  toTaskResponse(json: ITask, index: number) {
    return {
      id: json.id === undefined ? index + 1 : +json.id + 1,
      title: json.title,
      completed: json.completed ? json.completed : false,
    };
  }
}
