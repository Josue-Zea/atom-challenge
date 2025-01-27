import * as dotenv from 'dotenv';
dotenv.config();

export const FIREBASE_VARIABLES = {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY || '',
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN || '',
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || '',
    FIREBASE_STORAGE_BUDGET: process.env.FIREBASE_STORAGE_BUDGET || '',
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID || ''
}

export const SERVER = {
    SERVER_PORT: process.env.SERVER_PORT || 3000,
    JWT_KEY: process.env.JWT_KEY || "9e46b0d694484240a054fc89d857c9d2"
}

module.exports = {
    FIREBASE_VARIABLES,
    SERVER
}