import {INotifiable} from "../interfaces/INotifiable";

export class NotificationService {
    private notifications: INotifiable[] = [];

    public addNotifier(notifier: INotifiable): void {
        this.notifications.push(notifier);
    }

    public removeNotifier(notifier: INotifiable): void {
        this.notifications = this.notifications.filter(notifierItem => notifier.name === notifierItem.name)
    }

    public notify(message: string): void {
        this.notifications.forEach(notifier => {
            notifier.notify(message);
        })
    }
}