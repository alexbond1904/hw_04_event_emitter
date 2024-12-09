import {User} from "../models/user";

export interface UserService{
    getUsers():User[];
    addUser(user:User):boolean;
    removeUser(id:number): User|null;
}