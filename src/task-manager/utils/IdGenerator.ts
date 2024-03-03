export class IdGenerator {
    private static taskCounter: number = 1;
    private static employeeCounter: number = 1;

    public static generateTaskId(): number {
        return this.taskCounter++;
    }

    public static generateEmployeeId(): number {
        return this.employeeCounter++;
    }
}