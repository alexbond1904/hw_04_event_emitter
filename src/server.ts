import {createServer} from "http";
import {userRoutes} from "./routes/userRoutes";
import {config} from "./config/config";
import {UserServiceImpl} from "./services/UserServiceImpl";
import {UserController} from "./controllers/UserController";

const userService = new UserServiceImpl();
const userController = new UserController(userService);

export const launchServer = () => createServer(async (req, res) => {
    await userRoutes(req, res, userController);
}).listen(config.port, () => {
    console.log(`Started on address : http://localhost:${config.port}`);
})