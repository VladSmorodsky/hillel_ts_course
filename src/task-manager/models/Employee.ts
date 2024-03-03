import {PositionEnum} from "../enums/PositionEnum";

export class Employee {
    private isAdmin: boolean = false;

    public get id(): number {
        return this._id;
    }

    public get firstname(): string {
        return this._firstName;
    }

    public set firstname(firstName: string) {
        this._firstName = firstName;
    }

    public set lastName(lastName: string) {
        this._lastName = lastName;
    }

    public get position(): PositionEnum {
        return this._position;
    }

    public set position(position: PositionEnum) {
        this._position = position;
    }

    public get name(): string {
        return `${this._firstName} ${this._lastName}`;
    }

    constructor(
        private readonly _id: number,
        private _firstName: string,
        private _lastName: string,
        private _position: PositionEnum,
    ) {
    }

    public hasAdminRights(): boolean {
        return this.isAdmin;
    }

    public setAdminRules(isAdmin: boolean): void {
        this.isAdmin = isAdmin;
    }
}