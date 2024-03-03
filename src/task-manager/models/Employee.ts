import {PositionEnum} from "../enums/PositionEnum";

export class Employee {
    private isAdmin: boolean = false;
    public get name(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    constructor(
        private readonly id: number,
        private firstName: string,
        private lastName: string,
        private position: PositionEnum,
    ) {
    }

    public getId(): number {
        return this.id;
    }

    public setFirstName(firstName: string): void {
        this.firstName = firstName;
    }

    public setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    public getPosition(): PositionEnum {
        return this.position;
    }

    public setPosition(position: PositionEnum): void {
        this.position = position;
    }

    public hasAdminRights(): boolean {
        return this.isAdmin;
    }

    public setAdminRules(isAdmin: boolean): void {
        this.isAdmin = isAdmin;
    }
}