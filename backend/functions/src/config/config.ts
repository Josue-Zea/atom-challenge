import * as dotenv from 'dotenv';
dotenv.config();

export const FIREBASE_VARIABLES = {
    FB_API_KEY: process.env.FB_API_KEY || '',
    FB_AUTH_DOMAIN: process.env.FB_AUTH_DOMAIN || '',
    FB_PROJECT_ID: process.env.FB_PROJECT_ID || '',
    FB_STORAGE_BUDGET: process.env.FB_STORAGE_BUDGET || '',
    FB_MESSAGING_SENDER_ID: process.env.FB_MESSAGING_SENDER_ID || '',
    FB_APP_ID: process.env.FB_APP_ID || ''
}

export const SERVER = {
    SERVER_PORT: process.env.SERVER_PORT || 3000,
    JWT_KEY: process.env.JWT_KEY || "9e46b0d694484240a054fc89d857c9d2"
}

export const COLLECTIONS = {
    USERS_COLLECTION: process.env.USERS_COLLECTION || "users",
    TASKS_COLLECTION: process.env.TASKS_COLLECTION || "tasks"
}

module.exports = {
    FIREBASE_VARIABLES,
    SERVER,
    COLLECTIONS
}