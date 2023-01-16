import { UserInterface } from "./interfaces/userInterface";
import { User } from "./models/user.model.js";
import mockUsers from "./mockUsers.js";

const uuidValidatePattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const users:UserInterface[] = mockUsers.map((user) => new User(user.username, user.age, user.hobbies));
const createUser = (username: string, age: number, hobbies:string[]):void => {
    if(username && age && hobbies.length > 0) {
        users.push(new User (username, age, hobbies));
    } else {
        throw new Error('Request body does not contain required fields');
    }
}
const getUserById = (userId:string):UserInterface => {
    const user:UserInterface | undefined = users.find((user) => user.id === userId);

    if(user) {
        return user
    } else {
        throw new Error ("Record with id === userId doesn't exist");
    }
}
const updateUser = (userId:string, postData:string):void => {
    const newUserData = JSON.parse(postData);
    
    if(uuidValidatePattern.test(userId)) {
        const user:UserInterface = getUserById(userId);
        user.age = newUserData.age ? newUserData.age : user.age;
        user.username = newUserData.username ? newUserData.username : user.username;
        user.hobbies = newUserData.hobbies ? newUserData.hobbies : user.hobbies;        
    } else {
        throw new Error ('UserId is invalid');
    }
};


export { users, createUser, getUserById, updateUser };