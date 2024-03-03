import {ILogger} from "../../interfaces/ILogger";
import {Employee} from "../../models/Employee";
import {Task} from "../../models/Task";

export type AppLoggerData = {
    employee: Pick<Employee, 'name'>,
    action: 'create' | 'read' | 'update' | 'delete',
    data: Employee | Task,
    time: Date
}

export class AppLogger implements ILogger<AppLoggerData> {
    public log(appData: AppLoggerData): void {
        console.info('[APP LOGGER]', `[${appData.time}]`, appData.action,  appData.employee, appData.data);
    }
}