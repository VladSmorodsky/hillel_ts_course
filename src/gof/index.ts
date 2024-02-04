import {ICommand, TransactionType} from "./command/ICommand";
import {RetryCommand} from "./command/RetryCommand";
import {UndoCommand} from "./command/UndoCommand";

type BankCurrency = 'USD' | 'UAH' | 'EU';

interface IBankClient {
    firstname: string,
    lastname: string
}

class BankClient implements IBankClient {
    public get accountNumber(): string {
        if (!this._accountNumber) throw new Error('User is new')

        return this._accountNumber;
    }

    public set accountNumber(value: string) {
        this._accountNumber = value;
    }

    public get age(): number {
        return new Date().getFullYear() - this._birthDay;
    }

    public get firstname(): string {
        return this._firstname;
    }

    public get lastname(): string {
        return this._lastname;
    }

    constructor(
        private _firstname: string,
        private _lastname: string,
        private _birthDay: number,
        private _accountNumber: string = null
    ) {
    }
}

export class BankAccount {
    private readonly iban: string;
    private transactionHistory: Transaction[] = [];
    private transactionCommand: ICommand;

    public get info(): string {
        return `${this.currency}: ${this.balance}`;
    }

    public get accountNumber(): string {
        return this.iban;
    }

    constructor(
        private holder: IBankClient,
        private currency: BankCurrency,
        private balance = 0
    ) {
        this.iban = 'UA12371283323'
    }

    public setCommand(transactionCommand: ICommand): void {
        this.transactionCommand = transactionCommand;
    }

    public executeTransactionCommand(transactionId: string): void {
        this.transactionCommand.execute(this, transactionId);
    }

    public holderName(): string {
        return `${this.holder.firstname} ${this.holder.lastname}`
    }

    public deposit(amount: number): void {
        const transaction = new Transaction('1', amount, 'deposit');
        this.transactionHistory.push(transaction);

        this.balance += amount;
    }

    public withdraw(amount: number): void {
        if (this.balance < amount) throw new Error(`${this.holderName()}, you have not enough money`);

        const transaction = new Transaction('2', amount, 'withdraw');
        this.transactionHistory.push(transaction);

        this.balance -= amount;
    }

    public getTransactionHistory(): Transaction[] {
        return this.transactionHistory;
    }

    public getTransactionById(transactionId: string): Transaction {
        const transaction =  this.transactionHistory.find(transaction => transaction.id === transactionId)
        if (!transaction) throw new Error('Transaction not found')

        return transaction;
    }
}

interface ITransaction {
    id: string,
    amount: number,
    transactionType: TransactionType,
    isReturned: boolean
}

class Transaction implements ITransaction {
    private _isReturned = false;
    public get id(): string {
        return this._id;
    }

    public get amount(): number {
        return this._amount;
    }

    public get transactionType(): TransactionType {
        return this._transactionType;
    }

    public get isReturned(): boolean {
        return this._isReturned;
    }

    public set isReturned(isReturned) {
        this._isReturned = isReturned;
    }

    constructor(
        private _id: string,
        private _amount: number,
        private _transactionType: TransactionType
    ) {
    }
}

class Bank {
    private readonly salaryProvider = new SalaryProvider();
    private readonly creditHistoryProvider= new CreditHistoryProvider();
    private readonly criminalRecordProvider= new CriminalRecordProvider();

    private readonly bankAccounts = new Map<BankAccount['accountNumber'], BankAccount>();
    private static bank: Bank;

    private constructor() {
    }

    public static getBank(): Bank {
        if (!this.bank) {
            Bank.bank = new Bank();
        }

        return this.bank;
    }

    public getAccount(id: BankAccount['accountNumber']): BankAccount {
        const account = this.bankAccounts.get(id);

        if (!account) throw new Error('Account not exist')

        return account;
    }

    public addAccount(account: BankAccount): void {
        this.bankAccounts.set(account.accountNumber,account);
    }

    public removeAccount(id: BankAccount['accountNumber']): BankAccount {
        const account = this.getAccount(id);

        this.bankAccounts.delete(id);

        return account;
    }

    public deposit(client: BankClient, amount: number): void {
        this.bankAccounts.get(client.accountNumber)?.deposit(amount);
    }

    public withdraw(client: BankClient, amount: number): void {
        try {
            this.bankAccounts.get(client.accountNumber)?.withdraw(amount);
        } catch (err) {
            console.log(err)
        }
    }

    public getCreditDecision(client: BankClient, amount: number, duration: number): boolean {
        const salary = this.salaryProvider.getAverageSalary(`${client.firstname} ${client.lastname}`, 12);
        const creditRating = this.creditHistoryProvider.getCreditRating(client.accountNumber);
        const criminalRecord = this.criminalRecordProvider.hasCriminalRecord(`${client.firstname} ${client.lastname}`);

        return true;
    }
}

class SalaryProvider {
    public getAverageSalary(clientFullName: string, monthCount: number): number {
        return 73;
    }
}

class CreditHistoryProvider {
    public getCreditRating(accountNumber: BankClient['accountNumber']): number {
        return 5;
    }
}

class CriminalRecordProvider {
    public hasCriminalRecord(clientFullName: string): boolean {
        return false;
    }
}

const bank = Bank.getBank();
const bankClient = new BankClient('Test', 'Doe', 1995, '1234567j8')
const bankAccount = new BankAccount(bankClient, 'UAH', 500);
bank.addAccount(bankAccount);

bankAccount.deposit(60);
bankAccount.withdraw(20);

console.log(bankAccount.info);

bankAccount.setCommand(new RetryCommand());
bankAccount.executeTransactionCommand('1');
console.log(bankAccount.info);

bankAccount.setCommand(new UndoCommand());
bankAccount.executeTransactionCommand('1');
console.log(bankAccount.getTransactionHistory());
console.log(bankAccount.info);