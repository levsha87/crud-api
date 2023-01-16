import { UserInterface } from "../interfaces/userInterface";
import { v4 } from 'uuid';

export class User implements UserInterface {
    id: string;
    username: string;
    age: number;
    hobbies: string[];

    constructor(username: string, age: number, hobbies:string[]) {
        this.id = v4();
        this.username = username;
        this.age = age;
        this.hobbies = hobbies;
    }
} 