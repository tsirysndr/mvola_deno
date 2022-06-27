import { AuthService } from "./auth.ts";
import { TransactionService } from "./transaction.ts";

export class Client {
  auth: AuthService;
  transaction: TransactionService;

  constructor(url: string) {
    this.auth = new AuthService(url);
    this.transaction = new TransactionService(url);
  }
}
