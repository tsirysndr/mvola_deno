import { Client, SANDBOX_URL } from "https://deno.land/x/mvola@0.0.3/mod.ts";

async function main() {
  const mvola = new Client(SANDBOX_URL);
  const consumerKey = Deno.env.get("CONSUMER_KEY");
  const consumerSecret = Deno.env.get("CONSUMER_SECRET");
  const res = await mvola.auth.generateToken(consumerKey!, consumerSecret!);
  console.log(res);
}

main();