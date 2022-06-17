import { fetch, Headers, Request, Response } from "cross-fetch";

Object.assign(globalThis, {
  fetch: fetch,
  Headers: Headers,
  Request: Request,
  Response: Response,
  AbortController: AbortController,
});
