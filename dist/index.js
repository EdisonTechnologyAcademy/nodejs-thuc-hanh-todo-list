"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const todoList = [];
const PORT = 3000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.post('/add/todo', (req, res) => {
    try {
        const { work } = req.body;
        if (!work) {
            res.status(500).send({
                status: "fail",
                code: 500,
                data: "Add todo error",
            });
        }
        else {
            let id = todoList.length + 1;
            const todo = {
                id,
                work,
                date: new Date(),
                completed: false
            };
            todoList.push(todo);
            res.json(todo);
        }
    }
    catch (err) {
        return res.status(500).send({
            status: "fail",
            code: 500,
            data: "Add todo error",
        });
    }
});
app.get('/list/todo', (req, res) => {
    res.json(todoList);
});
app.put('/update/todo', (req, res) => {
    try {
        const { id, work, completed } = req.body;
        const index = todoList.findIndex(value => value.id == id);
        if (index !== -1) {
            if (work) {
                todoList[index].work = work;
            }
            ;
            if (completed) {
                todoList[index].completed = completed;
            }
            res.json({ todo: todoList[index] });
        }
        else {
            return res.status(500).send({
                status: "fail",
                code: 500,
                data: "Update todo error",
            });
        }
    }
    catch (err) {
        return res.status(500).send({
            status: "fail",
            code: 500,
            data: "Update todo error",
        });
    }
});
app.delete('/delete/todo/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const index = todoList.findIndex(value => value.id === id);
        if (index !== -1) {
            todoList.splice(index, 1);
            res.send({
                status: "success"
            });
        }
        else {
            res.send({
                status: "fail",
                code: 500
            });
        }
    }
    catch (err) {
        res.send({
            status: "fail",
            code: 500
        });
    }
});
app.listen(PORT, () => {
    console.log("App running with port: " + PORT);
});
//# sourceMappingURL=index.js.map