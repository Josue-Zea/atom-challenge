// import * as functions from "firebase-functions";
import app from "./app";
import { SERVER } from "./config/config";

app.listen(SERVER.SERVER_PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${SERVER.SERVER_PORT}`);
});
