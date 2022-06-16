import { Client } from "./client";
import axios from "axios";

export const client = new Client(
  "http://localhost:5000",
  axios.create({
    transformResponse: (data) => data,
  })
);
