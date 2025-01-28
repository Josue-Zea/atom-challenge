import { db } from "../config/firebase";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    DocumentData,
    DocumentReference,
} from "firebase/firestore";
import { Task } from "../models/task.model";
import { COLLECTIONS } from "../config/config";

export const createTask = async (userId: string, task: Task): Promise<DocumentReference<DocumentData>> => {
    const tasksCollectionRef = collection(
        db,
        COLLECTIONS.USERS_COLLECTION,
        userId,
        COLLECTIONS.TASKS_COLLECTION
    );
    return await addDoc(tasksCollectionRef, task);
};

export const getTasks = async (userId: string): Promise<Record<string, Task>> => {
    const tasksCollectionRef = collection(
        db,
        COLLECTIONS.USERS_COLLECTION,
        userId,
        COLLECTIONS.TASKS_COLLECTION
    );

    const tasksSnapshot = await getDocs(tasksCollectionRef);
    const tasks: Record<string, Task> = {};

    tasksSnapshot.forEach((doc) => {
        tasks[doc.id] = doc.data() as Task;
    });

    return tasks;
};

export const updateTask = async (userId: string, taskId: string, updatedData: Partial<Task>): Promise<void> => {
    const taskDocRef = doc(
        db,
        COLLECTIONS.USERS_COLLECTION,
        userId,
        COLLECTIONS.TASKS_COLLECTION,
        taskId
    );
    await updateDoc(taskDocRef, updatedData);
};

export const deleteTask = async (userId: string, taskId: string): Promise<void> => {
    const taskDocRef = doc(
        db,
        COLLECTIONS.USERS_COLLECTION,
        userId,
        COLLECTIONS.TASKS_COLLECTION,
        taskId
    );
    await deleteDoc(taskDocRef);
};
