import { Client, SANDBOX_URL } from "https://deno.land/x/mvola@0.0.3/mod.ts";

async function main() {
  const mvola = new Client(SANDBOX_URL);
  const consumerKey = Deno.env.get("CONSUMER_KEY");
  const consumerSecret = Deno.env.get("CONSUMER_SECRET");
  const data = await mvola.auth.generateToken(consumerKey!, consumerSecret!);

  mvola.transaction.setAccessToken(data.access_token);
  mvola.transaction.setOptions({
    version: "1.0",
    correlationId: crypto.randomUUID(),
    userAccountIdentifier: "msisdn;0343500003",
  });

  const response = await mvola.transaction.get("636042511");
  console.log(response);
}

main();
