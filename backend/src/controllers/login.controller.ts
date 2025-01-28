import { Request, Response } from "express";
import { COLLECTIONS } from "../config/config";
import { db } from "../config/firebase";
import { collection, addDoc, doc, getDocs, query, where, DocumentData, } from "firebase/firestore";
import { handleAuthResponse } from "../helpers/handleAuthResponse";

const checkUserExists = async (email: string): Promise<{ id: string; data: DocumentData } | undefined> => {
    const usersCollection = collection(db, COLLECTIONS.USERS_COLLECTION);
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, data: doc.data() };
    }

    return undefined; // Retornamos undefined si no se encuentra nada
};

export const lookForUser = async (req: Request, res: Response) => {
    const { email } = req.params;

    try {
        const user = await checkUserExists(email);
        if (!user) {
            return handleAuthResponse(res, true, "This user does not exist", null);
        } else {
            return handleAuthResponse(res, false, "User found successfully", { email, id: user.id });
        }
    } catch (error) {
        console.error(error);
        return handleAuthResponse(
            res,
            true,
            "An error occurred while searching for the user",
            null
        );
    }
};

export const creatUser = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        const userExists = await checkUserExists(email);
        if (userExists) {
            return handleAuthResponse(res, true, "This user already exists", null);
        }

        const tasksCollectionRef = collection(
            db,
            COLLECTIONS.USERS_COLLECTION
        );
        const newUser = await addDoc(tasksCollectionRef, { email });
        return handleAuthResponse(res, false, "User created successfully", {
            email,
            id: newUser.id,
        });
    } catch (error) {
        console.error(error);
        return handleAuthResponse(
            res,
            true,
            "An error occurred while creating the user",
            null
        );
    }
};