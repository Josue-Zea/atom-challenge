import test, { describe } from "node:test";
import { checkUserExists, createUser } from "../services/auth.service";


describe("User Service", () => {
    test("should return a user if it exists", async () => {
        const email = "test@example.com";
        const user = await checkUserExists(email);
        expect(user).toBeDefined();
    });

    test("should create a new user", async () => {
        const email = "newuser@example.com";
        const newUser = await createUser(email);
        eepect(newUser.email).toBe(email);
        expect(newUser.id).toBeDefined();
    });
});