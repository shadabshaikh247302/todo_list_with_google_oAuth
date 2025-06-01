const express = require('express');
const { signIn, logIn, getDataById } = require('../controller/auth');
const authRouter = express.Router();

authRouter.post("/signIn", signIn);
authRouter.post("/logIn", logIn);
authRouter.get("/getDataById/:id", getDataById);

module.exports = authRouter;
