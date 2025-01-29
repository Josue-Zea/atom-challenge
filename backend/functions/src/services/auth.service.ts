import { db } from "../config/firebase";
import { collection, addDoc, getDocs, query, where, DocumentData } from "firebase/firestore";
import { COLLECTIONS } from "../config/config";

export const checkUserExists = async (email: string): Promise<{ id: string; data: DocumentData } | undefined> => {
    const usersCollection = collection(db, COLLECTIONS.USERS_COLLECTION);
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, data: doc.data() };
    }

    return undefined;
};

export const createUser = async (email: string): Promise<{ id: string; email: string }> => {
    const usersCollection = collection(db, COLLECTIONS.USERS_COLLECTION);
    const newUser = await addDoc(usersCollection, { email });
    return { id: newUser.id, email };
};