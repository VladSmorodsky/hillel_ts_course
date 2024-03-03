import {INotifiable} from "../../interfaces/INotifiable";

export class ConsoleNotification implements INotifiable {
    name: 'ConsoleNotification';

    public notify(message: string): void {
        console.log(message);
    }
}