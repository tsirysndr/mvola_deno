import { assertObjectMatch } from "https://deno.land/std@0.145.0/testing/asserts.ts";
import {
  stub,
  assertSpyCall,
  returnsNext,
} from "https://deno.land/std@0.145.0/testing/mock.ts";
import { SANDBOX_URL } from "./constants.ts";
import { Client } from "./client.ts";
import { encode } from "https://deno.land/std@0.145.0/encoding/base64.ts";
import * as qs from "https://deno.land/std@0.145.0/node/querystring.ts";

Deno.test("Generate Access Token", async () => {
  const mvola = new Client(SANDBOX_URL);
  const consumerKey = "CONSUMER_KEY";
  const consumerSecret = "CONSUMER_SECRET";
  const encoded = encode(`${consumerKey}:${consumerSecret}`);
  const expected = {
    access_token:
      "eyJ4NXQiOiJPRE5tWkRFMll6UTRNVEkxTVRZME1tSmhaR00yTUdWa1lUZGhOall5TWpnM01XTmpNalJqWWpnMll6bGpNRGRsWWpZd05ERmhZVGd6WkRoa1lUVm1OZyIsImtpZCI6Ik9ETm1aREUyWXpRNE1USTFNVFkwTW1KaFpHTTJNR1ZrWVRkaE5qWXlNamczTVdOak1qUmpZamcyWXpsak1EZGxZall3TkRGaFlUZ3paRGhrWVRWbU5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJ0c2lyeS5zbmRyQGdtYWlsLmNvbUBjYXJib24uc3VwZXIiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6IlNSSHNaaWpFaGJoTktvMkhHUXFjMVNHQnZZRWEiLCJuYmYiOjE2NTYzOTQwMjksImF6cCI6IlNSSHNaaWpFaGJoTktvMkhHUXFjMVNHQnZZRWEiLCJzY29wZSI6IkVYVF9JTlRfTVZPTEFfU0NPUEUiLCJpc3MiOiJodHRwczpcL1wvYXBpbS5wcmVwLnRlbG1hLm1nOjk0NDNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE2NTYzOTc2MjksImlhdCI6MTY1NjM5NDAyOSwianRpIjoiNzUzZmZmNTctMzc2ZS00ZjI4LTk1ZjQtM2NmMWU3Y2Q1ODg2In0.JmteCZclg1vTGpl6GML5YprOAt4ebbSihFnQ-7HOL-VWcLsir5D9qmPPvbT_wJPRHQ_ChcyCHgWeytNnWS4OBN0FPZEbgjBfcsGByag6n4ctVrwtbdWKLR-Az5QcBvU6tyI0YSNmtGecoF7hSQATzqFdJNS3EV9SNPWVbbWgSW7JF5awCcf4QUzsRe0SQBfGAA0QZcMQ0yOJjb91MbDGtm27lXorK59HGHTkNLpUp6j8Xb--PQEjT_ryQatBQ5cXc6a8gmmA_8tmaotPns-1Au-cglaCHnxThbmMRo_0UW_HLBeeBCMVwtqjZuUQGit9kPLNKwy7aQOt4W6zx_X06w",
    expires_in: 3600,
    scope: "EXT_INT_MVOLA_SCOPE",
    token_type: "Bearer",
  };
  const fetchStub = stub(
    mvola.auth,
    "fetch",
    returnsNext([
      Promise.resolve({
        access_token:
          "eyJ4NXQiOiJPRE5tWkRFMll6UTRNVEkxTVRZME1tSmhaR00yTUdWa1lUZGhOall5TWpnM01XTmpNalJqWWpnMll6bGpNRGRsWWpZd05ERmhZVGd6WkRoa1lUVm1OZyIsImtpZCI6Ik9ETm1aREUyWXpRNE1USTFNVFkwTW1KaFpHTTJNR1ZrWVRkaE5qWXlNamczTVdOak1qUmpZamcyWXpsak1EZGxZall3TkRGaFlUZ3paRGhrWVRWbU5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJ0c2lyeS5zbmRyQGdtYWlsLmNvbUBjYXJib24uc3VwZXIiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6IlNSSHNaaWpFaGJoTktvMkhHUXFjMVNHQnZZRWEiLCJuYmYiOjE2NTYzOTQwMjksImF6cCI6IlNSSHNaaWpFaGJoTktvMkhHUXFjMVNHQnZZRWEiLCJzY29wZSI6IkVYVF9JTlRfTVZPTEFfU0NPUEUiLCJpc3MiOiJodHRwczpcL1wvYXBpbS5wcmVwLnRlbG1hLm1nOjk0NDNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE2NTYzOTc2MjksImlhdCI6MTY1NjM5NDAyOSwianRpIjoiNzUzZmZmNTctMzc2ZS00ZjI4LTk1ZjQtM2NmMWU3Y2Q1ODg2In0.JmteCZclg1vTGpl6GML5YprOAt4ebbSihFnQ-7HOL-VWcLsir5D9qmPPvbT_wJPRHQ_ChcyCHgWeytNnWS4OBN0FPZEbgjBfcsGByag6n4ctVrwtbdWKLR-Az5QcBvU6tyI0YSNmtGecoF7hSQATzqFdJNS3EV9SNPWVbbWgSW7JF5awCcf4QUzsRe0SQBfGAA0QZcMQ0yOJjb91MbDGtm27lXorK59HGHTkNLpUp6j8Xb--PQEjT_ryQatBQ5cXc6a8gmmA_8tmaotPns-1Au-cglaCHnxThbmMRo_0UW_HLBeeBCMVwtqjZuUQGit9kPLNKwy7aQOt4W6zx_X06w",
        expires_in: 3600,
        scope: "EXT_INT_MVOLA_SCOPE",
        token_type: "Bearer",
      }),
    ])
  );
  const response = await mvola.auth.generateToken(
    consumerKey!,
    consumerSecret!
  );
  assertObjectMatch(response, expected);
  assertSpyCall(fetchStub, 0, {
    args: [
      "/token",
      {
        method: "POST",
        body: qs.encode({
          grant_type: "client_credentials",
          scope: "EXT_INT_MVOLA_SCOPE",
        }),
        headers: {
          Authorization: `Basic ${encoded}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    ],
    returned: Promise.resolve(expected),
  });
});
