import { Schema } from "joi";
import { BadRequestException } from "../exceptions/bad-request-exception";

export const validator = <T>(schema: Schema) => (payload: T) => {
    const { error, value } = schema.validate(payload, { abortEarly: false });

    if (error) {
        throw new BadRequestException(
            "Validation Error",
            error.details.map(({ message, path }) => ({ message, path }))
        );
    }

    return value;
}