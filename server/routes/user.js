const express = require('express');
const { addData, deleteDataById, markAsCompleted, getAllTodos, moveToTomorrow, moveToToday, addNewData } = require('../controller/user');

const { addTaskMonthly, getTaskMonthly, deleteTaskMonthly } = require('../controller/muser');
const { authenticator } = require('../middlewears/authenticator');

const userRouter = express.Router();
userRouter.get('/getData/:id', getAllTodos); 
userRouter.get("/getTaskMonthly/:id", getTaskMonthly);  // Authentication required
userRouter.post("/addTaskMonthly", addTaskMonthly);  // Authentication required
userRouter.delete("/deleteTaskMonthly/:id", deleteTaskMonthly);  // Authentication required
userRouter.post("/addData",addData);  // Authentication required
// userRouter.post("/addTodo/:id", addTodo);  // Authentication required
// userRouter.post("/addNewData/:id",addNewData)
userRouter.delete("/deleteDataById/:id", deleteDataById);  // Authentication required
userRouter.put('/moveToTomorrow/:id', moveToTomorrow);  // Authentication required
userRouter.put('/moveToToday/:id', moveToToday);  // Authentication required
userRouter.put('/markAsCompleted/:id', markAsCompleted);  // Authentication required


module.exports = userRouter;
