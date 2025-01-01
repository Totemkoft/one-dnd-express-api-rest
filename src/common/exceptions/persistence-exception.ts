import { HttpException } from "./http-exception";

export class PersistenceException extends HttpException {
    constructor(error: string, data: any = {}, message?: string) {
        super(500, error, data, message);
    }
}
