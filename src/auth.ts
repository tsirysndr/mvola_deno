import { encode } from "https://deno.land/std@0.145.0/encoding/base64.ts";
import * as qs from "https://deno.land/std@0.145.0/node/querystring.ts";

import { Caller } from "./caller.ts";
import { AuthResponse } from "./types.ts";

export class AuthService extends Caller {
  async generateToken(consumerKey: string, consumerSecret: string): Promise<AuthResponse> {
    const params = qs.encode({
      grant_type: "client_credentials",
      scope: "EXT_INT_MVOLA_SCOPE",
    });
    const encoded = encode(`${consumerKey}:${consumerSecret}`);
    const response = await this.fetch("/token", {
      method: "POST",
      body: params,
      headers: {
        Authorization: `Basic ${encoded}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }) as AuthResponse;
    return response;
  }
}
