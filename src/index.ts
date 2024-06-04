import bodyParser from "body-parser";
import express, { Express } from "express";
import cors from 'cors'
import { useExpressServer } from "routing-controllers";
import { TasksController } from "./controllers/task.controller";
import 'reflect-metadata'

const app: Express = express();

app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))
app.use(bodyParser.json({
  type: '*/*',
  limit: '80mb'
}))
app.use(cors())

useExpressServer(app, {
  routePrefix: '/api',
  controllers: [TasksController]
})

app.listen(4000, () => {
  console.log(`Server listening on port 4000`)
})