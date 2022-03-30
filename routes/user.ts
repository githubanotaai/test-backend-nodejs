import { Router } from "express";
import { UserController } from "../controllers";
import { UserService } from "../services";

const routes = Router();
const userController = new UserController(new UserService());

// User
routes.post('/user', async (req, res) => userController.registerUser(req, res));
routes.get('/user', async (req, res) => userController.getUsers(req, res));

export { routes as userRoute };