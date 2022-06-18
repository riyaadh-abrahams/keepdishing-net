import { Client } from "./client";
import axios, { AxiosRequestConfig } from "axios";
import { createLogger, format, transports } from "winston";

export const getClient = (cookie: string | undefined) => {
  return new Client(
    "http://localhost:5216",
    axios.create({
      transformResponse: (data) => data,
      headers: {
        Cookie: cookie ?? "",
      },
    })
  );
};

export const logger = createLogger({
  level: "info",
  transports: [
    new transports.Console({
      format: format.combine(format.colorize()),
    }),
  ],
});
