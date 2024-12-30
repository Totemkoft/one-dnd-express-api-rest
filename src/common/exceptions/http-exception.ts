export class HttpException extends Error {
    public readonly status: number;
    public readonly data: any;
    public readonly error: string;

    constructor(
        status: number,
        error: string,
        data: any = {},
        message?: string
    ) {
        super(message || error);
        this.name = this.constructor.name;
        this.status = status;
        this.data = data;
        this.error = error;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
