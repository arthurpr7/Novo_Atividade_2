import { User } from "../model/User";

let users: User[] = [
    { id: 1, name: "Ana", age: 25 },
    { id: 2, name: "João", age: 30 },
    { id: 3, name: "Paula", age: 20 },
];

function getNextId(): number {
    if (users.length === 0) return 1;
    const maxId = Math.max(...users.map(user => user.id));
    return maxId + 1;
}

export function getAll(): User[] {
    return users;
}

export function getById(id: number): User | undefined {
    return users.find(p => p.id === id);
}

export function add(user: Omit<User, "id">): User {
    const id = getNextId();
    const newUser: User = { id, ...user };
    users.push(newUser);
    return newUser;
}

export function update(id: number, updatedFields: Partial<User>): User | null {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
        return null;
    }
    users[userIndex] = { ...users[userIndex], ...updatedFields };
    return users[userIndex];
}

export function remove(id: number): boolean {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
        return false;
    }
    users.splice(index, 1);
    return true;
}