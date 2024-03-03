import {ErrorLogger} from "../utils/Logger/ErrorLogger";

export class AppError extends Error {
    private logger: ErrorLogger = new ErrorLogger();
    constructor(message: string) {
        super(message)
        this.name = "AppError";
        this.logger.log(this);
    }
}