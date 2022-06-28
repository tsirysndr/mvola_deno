import {
  assert,
  assertObjectMatch,
} from "https://deno.land/std@0.145.0/testing/asserts.ts";
import {
  returnsNext,
  stub,
} from "https://deno.land/std@0.145.0/testing/mock.ts";
import { Client, SANDBOX_URL, TransactionRequest } from "../mod.ts";

Deno.test("Get Transaction Details", async () => {
  const mvola = new Client(SANDBOX_URL);
  const accessToken =
    "eyJ4NXQiOiJPRE5tWkRFMll6UTRNVEkxTVRZME1tSmhaR00yTUdWa1lUZGhOall5TWpnM01XTmpNalJqWWpnMll6bGpNRGRsWWpZd05ERmhZVGd6WkRoa1lUVm1OZyIsImtpZCI6Ik9ETm1aREUyWXpRNE1USTFNVFkwTW1KaFpHTTJNR1ZrWVRkaE5qWXlNamczTVdOak1qUmpZamcyWXpsak1EZGxZall3TkRGaFlUZ3paRGhrWVRWbU5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJ0c2lyeS5zbmRyQGdtYWlsLmNvbUBjYXJib24uc3VwZXIiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6IlNSSHNaaWpFaGJoTktvMkhHUXFjMVNHQnZZRWEiLCJuYmYiOjE2NTYzOTQwMjksImF6cCI6IlNSSHNaaWpFaGJoTktvMkhHUXFjMVNHQnZZRWEiLCJzY29wZSI6IkVYVF9JTlRfTVZPTEFfU0NPUEUiLCJpc3MiOiJodHRwczpcL1wvYXBpbS5wcmVwLnRlbG1hLm1nOjk0NDNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE2NTYzOTc2MjksImlhdCI6MTY1NjM5NDAyOSwianRpIjoiNzUzZmZmNTctMzc2ZS00ZjI4LTk1ZjQtM2NmMWU3Y2Q1ODg2In0.JmteCZclg1vTGpl6GML5YprOAt4ebbSihFnQ-7HOL-VWcLsir5D9qmPPvbT_wJPRHQ_ChcyCHgWeytNnWS4OBN0FPZEbgjBfcsGByag6n4ctVrwtbdWKLR-Az5QcBvU6tyI0YSNmtGecoF7hSQATzqFdJNS3EV9SNPWVbbWgSW7JF5awCcf4QUzsRe0SQBfGAA0QZcMQ0yOJjb91MbDGtm27lXorK59HGHTkNLpUp6j8Xb--PQEjT_ryQatBQ5cXc6a8gmmA_8tmaotPns-1Au-cglaCHnxThbmMRo_0UW_HLBeeBCMVwtqjZuUQGit9kPLNKwy7aQOt4W6zx_X06w";
  mvola.transaction.setAccessToken(accessToken);
  mvola.transaction.setOptions({
    version: "1.0",
    correlationId: "2ba1d66a-25cf-4c12-8a6f-4cb01255148",
    userAccountIdentifier: "msisdn;0343500003",
  });

  const fetchStub = stub(
    mvola.transaction,
    "fetch",
    returnsNext([
      Promise.resolve({
        amount: "10000.00",
        currency: "Ar",
        requestDate: "2022-06-28T05:49:02.864Z",
        debitParty: [{ key: "msisdn", value: "0343500003" }],
        creditParty: [{ key: "msisdn", value: "0343500004" }],
        fees: [{ feeAmount: "150" }],
        metadata: [
          { key: "originalTransactionResult", value: "0" },
          { key: "originalTransactionResultDesc", value: "0" },
        ],
        transactionStatus: "completed",
        creationDate: "2022-05-03T18:09:10.391Z",
        transactionReference: "636445349",
      }),
    ])
  );

  const expected = {
    amount: "10000.00",
    currency: "Ar",
    requestDate: "2022-06-28T05:49:02.864Z",
    debitParty: [{ key: "msisdn", value: "0343500003" }],
    creditParty: [{ key: "msisdn", value: "0343500004" }],
    fees: [{ feeAmount: "150" }],
    metadata: [
      { key: "originalTransactionResult", value: "0" },
      { key: "originalTransactionResultDesc", value: "0" },
    ],
    transactionStatus: "completed",
    creationDate: "2022-05-03T18:09:10.391Z",
    transactionReference: "636445349",
  };

  const response = await mvola.transaction.get("636042511");
  assertObjectMatch(response, expected);
});

Deno.test("Get Transaction Status", async () => {
  const mvola = new Client(SANDBOX_URL);
  const accessToken =
    "eyJ4NXQiOiJPRE5tWkRFMll6UTRNVEkxTVRZME1tSmhaR00yTUdWa1lUZGhOall5TWpnM01XTmpNalJqWWpnMll6bGpNRGRsWWpZd05ERmhZVGd6WkRoa1lUVm1OZyIsImtpZCI6Ik9ETm1aREUyWXpRNE1USTFNVFkwTW1KaFpHTTJNR1ZrWVRkaE5qWXlNamczTVdOak1qUmpZamcyWXpsak1EZGxZall3TkRGaFlUZ3paRGhrWVRWbU5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJ0c2lyeS5zbmRyQGdtYWlsLmNvbUBjYXJib24uc3VwZXIiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6IlNSSHNaaWpFaGJoTktvMkhHUXFjMVNHQnZZRWEiLCJuYmYiOjE2NTYzOTQwMjksImF6cCI6IlNSSHNaaWpFaGJoTktvMkhHUXFjMVNHQnZZRWEiLCJzY29wZSI6IkVYVF9JTlRfTVZPTEFfU0NPUEUiLCJpc3MiOiJodHRwczpcL1wvYXBpbS5wcmVwLnRlbG1hLm1nOjk0NDNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE2NTYzOTc2MjksImlhdCI6MTY1NjM5NDAyOSwianRpIjoiNzUzZmZmNTctMzc2ZS00ZjI4LTk1ZjQtM2NmMWU3Y2Q1ODg2In0.JmteCZclg1vTGpl6GML5YprOAt4ebbSihFnQ-7HOL-VWcLsir5D9qmPPvbT_wJPRHQ_ChcyCHgWeytNnWS4OBN0FPZEbgjBfcsGByag6n4ctVrwtbdWKLR-Az5QcBvU6tyI0YSNmtGecoF7hSQATzqFdJNS3EV9SNPWVbbWgSW7JF5awCcf4QUzsRe0SQBfGAA0QZcMQ0yOJjb91MbDGtm27lXorK59HGHTkNLpUp6j8Xb--PQEjT_ryQatBQ5cXc6a8gmmA_8tmaotPns-1Au-cglaCHnxThbmMRo_0UW_HLBeeBCMVwtqjZuUQGit9kPLNKwy7aQOt4W6zx_X06w";
  mvola.transaction.setAccessToken(accessToken);
  mvola.transaction.setOptions({
    version: "1.0",
    correlationId: "2ba1d66a-25cf-4c12-8a6f-4cb01255148",
    userLanguage: "FR",
    userAccountIdentifier: "msisdn;0343500003",
    partnerName: "TestMVola",
  });

  const fetchStub = stub(
    mvola.transaction,
    "fetch",
    returnsNext([
      Promise.resolve({
        status: "completed",
        serverCorrelationId: "2ba1d66a-25cf-4c12-8a6f-4cb01255148e",
        notificationMethod: "polling",
        objectReference: "636042511",
      }),
    ])
  );

  const expected = {
    status: "completed",
    serverCorrelationId: "2ba1d66a-25cf-4c12-8a6f-4cb01255148e",
    notificationMethod: "polling",
    objectReference: "636042511",
  };

  const response = await mvola.transaction.getStatus(
    "2ba1d66a-25cf-4c12-8a6f-4cb01255148e"
  );
  assertObjectMatch(response, expected);
});

Deno.test("Initiate Transaction", async () => {
  const mvola = new Client(SANDBOX_URL);
  const accessToken =
    "eyJ4NXQiOiJPRE5tWkRFMll6UTRNVEkxTVRZME1tSmhaR00yTUdWa1lUZGhOall5TWpnM01XTmpNalJqWWpnMll6bGpNRGRsWWpZd05ERmhZVGd6WkRoa1lUVm1OZyIsImtpZCI6Ik9ETm1aREUyWXpRNE1USTFNVFkwTW1KaFpHTTJNR1ZrWVRkaE5qWXlNamczTVdOak1qUmpZamcyWXpsak1EZGxZall3TkRGaFlUZ3paRGhrWVRWbU5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJ0c2lyeS5zbmRyQGdtYWlsLmNvbUBjYXJib24uc3VwZXIiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6IlNSSHNaaWpFaGJoTktvMkhHUXFjMVNHQnZZRWEiLCJuYmYiOjE2NTYzOTQwMjksImF6cCI6IlNSSHNaaWpFaGJoTktvMkhHUXFjMVNHQnZZRWEiLCJzY29wZSI6IkVYVF9JTlRfTVZPTEFfU0NPUEUiLCJpc3MiOiJodHRwczpcL1wvYXBpbS5wcmVwLnRlbG1hLm1nOjk0NDNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE2NTYzOTc2MjksImlhdCI6MTY1NjM5NDAyOSwianRpIjoiNzUzZmZmNTctMzc2ZS00ZjI4LTk1ZjQtM2NmMWU3Y2Q1ODg2In0.JmteCZclg1vTGpl6GML5YprOAt4ebbSihFnQ-7HOL-VWcLsir5D9qmPPvbT_wJPRHQ_ChcyCHgWeytNnWS4OBN0FPZEbgjBfcsGByag6n4ctVrwtbdWKLR-Az5QcBvU6tyI0YSNmtGecoF7hSQATzqFdJNS3EV9SNPWVbbWgSW7JF5awCcf4QUzsRe0SQBfGAA0QZcMQ0yOJjb91MbDGtm27lXorK59HGHTkNLpUp6j8Xb--PQEjT_ryQatBQ5cXc6a8gmmA_8tmaotPns-1Au-cglaCHnxThbmMRo_0UW_HLBeeBCMVwtqjZuUQGit9kPLNKwy7aQOt4W6zx_X06w";
  mvola.transaction.setAccessToken(accessToken);
  mvola.transaction.setOptions({
    version: "1.0",
    correlationId: "2ba1d66a-25cf-4c12-8a6f-4cb01255148",
    userLanguage: "FR",
    userAccountIdentifier: "msisdn;0343500003",
    partnerName: "TestMVola",
  });

  const transactionRef = "7d03f3cb-1a21-4b27-9a04-4da3c2bd89e6";

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

  const fetchStub = stub(
    mvola.transaction,
    "fetch",
    returnsNext([
      Promise.resolve({
        status: "pending",
        serverCorrelationId: "6b174f3f-6c6b-44d6-b5fc-df531c0bd4f7",
        notificationMethod: "polling",
      }),
    ])
  );

  const expected = {
    status: "pending",
    serverCorrelationId: "6b174f3f-6c6b-44d6-b5fc-df531c0bd4f7",
    notificationMethod: "polling",
  };
  const response = await mvola.transaction.sendPayment(tx);
  assertObjectMatch(response, expected);
});
