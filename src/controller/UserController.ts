import { Request, Response } from "express";
import { User } from "../model/User";
import { add, getAll, getById, remove, update } from "../service/UserService";

export function listUser(req: Request, res: Response): void {
    const list = getAll();
    res.status(200).json(list);
}

export function getUser(req: Request, res: Response): void {
    const { id } = req.params;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
        res.status(400).json({ error: "Invalid ID format" });
        return;
    }

    const user = getById(parsedId);

    if (!user) {
        res.status(404).json({ error: "User not found" });
    } else {
        res.status(200).json(user);
    }
}

export function createUser(req: Request, res: Response): void {
    const { name, age } = req.body;

    if (!name || !age) {
        res.status(400).json({ error: "Some fields are missing in the request body (name, age)." });
        return;
    }

    if (typeof age !== "number" || age <= 0 || typeof name !== "string" || name.trim() === "") {
        res.status(400).json({ error: "Invalid data format: age must be a positive number, name must be a non-empty string." });
        return;
    }

    const newUser: Omit<User, "id"> = { name, age };
    const createdUser = add(newUser);
    res.status(201).json(createdUser);
}

export function updateUser(req: Request, res: Response): void {
    const { id } = req.params;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
        res.status(400).json({ error: "Invalid ID format" });
        return;
    }

    const updatedFields: Partial<User> = req.body;

    if (updatedFields.name && (typeof updatedFields.name !== "string" || updatedFields.name.trim() === "")) {
        res.status(400).json({ error: "Name must be a non-empty string" });
        return;
    }
    if (updatedFields.age && (typeof updatedFields.age !== "number" || updatedFields.age <= 0)) {
        res.status(400).json({ error: "Age must be a positive number" });
        return;
    }

    const updatedUser = update(parsedId, updatedFields);

    if (!updatedUser) {
        res.status(404).json({ error: "User not found" });
        return;
    }

    res.status(200).json(updatedUser);
}

export function removeUser(req: Request, res: Response): void {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID format" });
        return;
    }

    const success = remove(id);

    if (!success) {
        res.status(404).json({ error: "User not found" });
    } else {
        res.status(204).send();
    }
}