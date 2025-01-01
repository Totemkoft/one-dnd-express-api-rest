import { HttpException } from "./http-exception";

export class NotFoundException extends HttpException {
    constructor(error: string, data: any = {}, message?: string) {
        super(404, error, data, message);
    }
}


