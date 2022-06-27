import { Options } from "./types.ts";

export type RequestOptions = {
  method: "GET" | "POST";
  body?: string;
  headers?: { [key: string]: string };
};

export class Caller {
  private baseUrl: string;
  private accessToken?: string;
  private headers: { [key: string]: string } = {};

  constructor(url: string) {
    this.baseUrl = url;
  }

  protected async fetch(path: string, options: RequestOptions) {
    const url = `${this.baseUrl}${path}`;
    const headers = { ...this.headers, ...options.headers };
    if (this.accessToken) {
      headers["Authorization"] = `Bearer ${this.accessToken}`;
    }
    const response = await fetch(url, {
      method: options.method ?? "GET",
      body: options.body,
      headers,
    });
    if (response.status == 500) {
      throw new Error(await response.text());
    }
    return response.json();
  }

  setAccessToken(accessToken: string): void {
    this.accessToken = accessToken;
  }

  setOptions(options: Options): void {
    this.headers["Version"] = options.version;
    this.headers["X-CorrelationID"] = options.correlationId;
    if (options.userLanguage) {
      this.headers["UserLanguage"] = options.userLanguage;
    }
    this.headers["UserAccountIdentifier"] = options.userAccountIdentifier;
    if (options.partnerName) {
      this.headers["PartnerName"] = options.partnerName;
    }
    if (options.callbackUrl) {
      this.headers["X-Callback-URL"] = options.callbackUrl;
    }
    this.headers["Cache-Control"] = "no-cache";
  }
}
