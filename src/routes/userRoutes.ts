import {IncomingMessage, ServerResponse} from "node:http";
import {UserController} from "../controllers/UserController";

export const userRoutes = async (req: IncomingMessage, res: ServerResponse
    , controller: UserController) => {
    const {method, url} = req;

    switch (url! + method) {
        case '/api/users' + 'GET': {
            controller.getUsers(req, res);
            break;
        }
        case '/api/users' + 'DELETE': {
            await controller.removeUser(req, res);
            break;
        }
        case '/api/users' + 'POST': {
            await controller.addUser(req, res);
            break;
        }
        case '/api/users/address' + 'GET': {
            await controller.getAddresses(req, res);
            break;
        }
        default : {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Error');
        }
    }
}