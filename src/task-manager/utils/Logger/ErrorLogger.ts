import {ILogger} from "../../interfaces/ILogger";

export class ErrorLogger implements ILogger<Error> {
    public log(error: Error): void {
        console.error('<ERROR_LOGGER>');
        console.error(`${error.name}: ${error.message}`);
        console.error(error.stack);
        console.error('<------------->');
    }
}