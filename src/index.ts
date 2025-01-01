import dotenv from "dotenv";
import ServerConfiguration from "./config/server-configuration";
import Logger from "./config/logger";

dotenv.config();

Logger.info("Initializing server...");

try {
    const server: ServerConfiguration = new ServerConfiguration();
    server.start();
} catch (error) {
    Logger.error("Error while starting the server:", error);
}
