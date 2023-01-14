import { UserInterface } from "./interfaces/userInterface";
import { User } from "./models/user.model.js";
import mockUsers from "./mockUsers.js";

const users:UserInterface[] = mockUsers.map((user) => new User(user.username, user.age, user.hobbies));

export { users };