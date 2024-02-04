import {ICommand} from "./ICommand";
import {BankAccount} from "../index";

export class UndoCommand implements ICommand {
    execute(bankAccount: BankAccount, transactionId: string): void {
        const transaction = bankAccount.getTransactionById(transactionId);

        if (!transaction.isReturned) {
            if (transaction.transactionType === 'withdraw') {
                bankAccount.deposit(transaction.amount);
            } else if (transaction.transactionType === 'deposit') {
                bankAccount.withdraw(transaction.amount);
            }

            transaction.isReturned = true;
        }
    }

}