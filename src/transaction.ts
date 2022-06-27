import { Caller } from "./caller.ts";
import {
  TransactionDetails,
  TransactionRequest,
  TransactionResponse,
  TransactionStatus,
} from "./types.ts";

export class TransactionService extends Caller {
  async get(transactionId: string): Promise<TransactionDetails> {
    const response = (await this.fetch(
      `/mvola/mm/transactions/type/merchantpay/1.0.0/${transactionId}`,
      {
        method: "GET",
      }
    )) as TransactionDetails;
    return response;
  }

  async getStatus(serverCorrelationId: string): Promise<TransactionStatus> {
    const response = (await this.fetch(
      `/mvola/mm/transactions/type/merchantpay/1.0.0/status/${serverCorrelationId}`,
      {
        method: "GET",
      }
    )) as TransactionStatus;
    return response;
  }

  async sendPayment(params: TransactionRequest): Promise<TransactionResponse> {
    const response = (await this.fetch(
      "/mvola/mm/transactions/type/merchantpay/1.0.0/",
      {
        method: "POST",
        body: JSON.stringify({ ...params, amount: params.amount.toString() }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )) as TransactionResponse;
    return response;
  }
}
