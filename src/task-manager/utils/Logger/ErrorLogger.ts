import {ILogger} from "../../interfaces/ILogger";

export class ErrorLogger implements ILogger<Error> {
    public log(error: Error): void {
        console.log('<ERROR_LOGGER>', `${error.name}: ${error.message}`, error.stack);
    }
}