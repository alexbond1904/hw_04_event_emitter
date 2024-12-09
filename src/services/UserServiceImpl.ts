import {UserService} from "./UserService";
import {User} from "../models/user";

export class UserServiceImpl implements UserService{
    private users: User[] =[];

    addUser(user: User): boolean {
        if(!user.id || !user.zipCode || !user.name || !user.city)
            return false;
        if (this.users.findIndex(elem => elem.id === user.id) === -1) {
            this.users.push(user);
            return true;
        }
        return false;
    }

    getUsers(): User[] {
        return this.users;
    }

    removeUser(id: number): User | null {
        const index = this.users.findIndex(elem => elem.id === id);
        if (index === -1) {
            return null;
        }
        const [victim]:User[] = this.users.splice(index,1);
        return victim;
    }

}