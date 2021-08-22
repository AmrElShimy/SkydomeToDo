const express = require("express");

const ToDoCtrl = require("../controllers/toDoController");

const router = express.Router();

router.post("/todo", ToDoCtrl.createToDo);
router.get("/todos", ToDoCtrl.getToDos);

module.exports = router;
