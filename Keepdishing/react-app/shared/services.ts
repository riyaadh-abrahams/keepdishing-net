import { Client } from "./client";
import axios, { AxiosRequestConfig } from "axios";

// export const client = new Client(
//   "http://localhost:5000",
//   axios.create({
//     transformResponse: (data) => data,
//   })
// );

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
