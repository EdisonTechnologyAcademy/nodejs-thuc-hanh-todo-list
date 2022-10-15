import express, { Express, Request, Response } from "express";
import bodyParser from 'body-parser';
import { ToDos } from "./model/todo.model";
const todoList: ToDos[] = [];

const PORT = 3000;
const app: Express = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.post('/add/todo', (req: Request, res: Response) => {
  try {
    const { work } = req.body;
    if (!work) {
      res.status(500).send({
        status: "fail",
        code: 500,
        data: "Add todo error",
      });
    } else {
      let id = todoList.length + 1;
      const todo: ToDos = {
        id,
        work,
        date: new Date(),
        completed: false
      };
      todoList.push(todo);
      res.json(todo);
    }
  } catch (err) {
    return res.status(500).send({
      status: "fail",
      code: 500,
      data: "Add todo error",
    });
  }
});

app.get('/list/todo', (req: Request, res: Response) => {
  res.json(todoList);
});

app.put('/update/todo', (req: Request, res: Response) => {
  try {
    const {id,  work, completed } = req.body;
    const index = todoList.findIndex(value => value.id == id);
    if (index !== -1) {
      if (work) {
        todoList[index].work = work;
      };
      if (completed) {
        todoList[index].completed = completed;
      }
      res.json({ todo: todoList[index] });
    } else {
      return res.status(500).send({
        status: "fail",
        code: 500,
        data: "Update todo error",
      });
    }

  } catch (err) {
    return res.status(500).send({
      status: "fail",
      code: 500,
      data: "Update todo error",
    });
  }
});

app.delete('/delete/todo/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const index = todoList.findIndex(value => value.id === id);
    if (index !== -1) {
      todoList.splice(index, 1);
      res.send({
        status: "success"
      })
    } else {
      res.send({
        status: "fail",
        code: 500
      })
    }
  } catch (err) {
    res.send({
      status: "fail",
      code: 500
    })
  }
});

app.listen(PORT, () => {
  console.log("App running with port: " + PORT);
});