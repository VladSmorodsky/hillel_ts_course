import {BankAccount} from "../index";

export type TransactionType = 'withdraw' | 'deposit'

export interface ICommand {
    execute(bankAccount: BankAccount, transactionId: string): void
}