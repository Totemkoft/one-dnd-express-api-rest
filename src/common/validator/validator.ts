import { Schema } from "joi";
import { BadRequestException } from "../exceptions/bad-request-exception";
import Logger from "../../config/logger";

export const validator = <T>(schema: Schema) => (payload: T) => {
    const { error, value } = schema.validate(payload, { abortEarly: false });

    if (error) {
        Logger.error("Validation Error", error);
        throw new BadRequestException(
            "Validation Error",
            error.details.map(({ message, path }) => ({ message, path }))
        );
    }

    return value;
}