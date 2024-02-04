import {ICommand} from "./ICommand";
import {BankAccount} from "../index";

export class RetryCommand implements ICommand {

    public execute(bankAccount: BankAccount, transactionId: string): void {
        const transaction = bankAccount.getTransactionById(transactionId);

        bankAccount[transaction.transactionType](transaction.amount);
    }

}