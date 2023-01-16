import { UserInterface } from "./interfaces/userInterface";
import { User } from "./models/user.model.js";
import mockUsers from "./mockUsers.js";

const users:UserInterface[] = mockUsers.map((user) => new User(user.username, user.age, user.hobbies));
const createUser = (username: string, age: number, hobbies:string[]):void => {
    if(username && age && hobbies.length > 0) {
        users.push(new User (username, age, hobbies));
    } else {
        throw new Error('Request body does not contain required fields');
    }
}
const getUserById = (userId:string) => users.find((user) => user.id === userId)


export { users, createUser, getUserById };