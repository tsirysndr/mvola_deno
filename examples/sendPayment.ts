import { Client, SANDBOX_URL, TransactionRequest } from "../mod.ts";

async function main() {
  const mvola = new Client(SANDBOX_URL);
  const consumerKey = Deno.env.get("CONSUMER_KEY");
  const consumerSecret = Deno.env.get("CONSUMER_SECRET");
  const data = await mvola.auth.generateToken(consumerKey!, consumerSecret!);

  mvola.transaction.setAccessToken(data.access_token);
  mvola.transaction.setOptions({
    version: "1.0",
    correlationId: crypto.randomUUID(),
    userLanguage: "FR",
    userAccountIdentifier: "msisdn;0343500003",
    partnerName: "TestMVola",
  });

  const transactionRef = crypto.randomUUID();

  const tx: TransactionRequest = {
    amount: 1000,
    currency: "Ar",
    descriptionText: "test",
    requestDate: new Date().toISOString(),
    debitParty: [
      {
        key: "msisdn",
        value: "0343500003",
      },
    ],
    creditParty: [
      {
        key: "msisdn",
        value: "0343500004",
      },
    ],
    metadata: [
      {
        key: "partnerName",
        value: "TestMVola",
      },
      {
        key: "fc",
        value: "USD",
      },
      {
        key: "amountFc",
        value: "1",
      },
    ],
    requestingOrganisationTransactionReference: transactionRef,
    originalTransactionReference: transactionRef,
  };
  const response = await mvola.transaction.sendPayment(tx);
  console.log(response);
}

main();
