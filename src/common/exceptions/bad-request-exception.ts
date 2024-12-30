import { HttpException } from "./http-exception";

export class BadRequestException extends HttpException {
    constructor(error: string, data: any = {}, message?: string) {
        super(400, error, data, message);
    }
}
