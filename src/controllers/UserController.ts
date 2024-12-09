import {UserService} from "../services/UserService";
import {IncomingMessage, ServerResponse} from "node:http";
import {parseBody} from "../utils/parseBody";
import {User} from "../models/user";
import {eventEmitter} from "../events/eventEmitter";

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    getUsers(req: IncomingMessage, res: ServerResponse) {
        const users = this.userService.getUsers();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(users));
    }

    async removeUser(req: IncomingMessage, res: ServerResponse) {
        const body = await parseBody(req);
        const victim = this.userService.removeUser((body as { id: number }).id);
        if (victim !== null) {
            eventEmitter.emit('userDeleted', victim.name); //TODO
        }
        const users = this.userService.getUsers();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(users));
    }

    async addUser(req:IncomingMessage, res:ServerResponse){
        const body = await parseBody(req);
        const isSuccess = this.userService.addUser(body as User);
        if (isSuccess) {
            eventEmitter.emit('userAdded', (body as User).name); //TODO
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('User added');
        } else {
            res.writeHead(409, {'Content-Type': 'text/plain'});
            res.end('Wrong user');
        }
    }

    async getAddresses(req: IncomingMessage, res: ServerResponse) {
        const users = this.userService.getUsers()
                                        .map(u=> ({zipCode: u.zipCode, city:u.city}));
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(users))
    }
}