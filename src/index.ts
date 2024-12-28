import dotenv from "dotenv";
import ServerConfiguration from "./config/server-configuration";

dotenv.config();

console.log("Initializing server...");

try {
    const server: ServerConfiguration = new ServerConfiguration();
    server.start();
    console.log("Server is up!");
} catch (error) {
    console.error("Error while starting the server:", error);
}
