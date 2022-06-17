import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetServerSidePropsContext } from "next";
import { HYDRATE } from "next-redux-wrapper";
import "./fetch";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5216",
    fetchFn: fetch,
    prepareHeaders: (headers, query) => {
      const authCookie = (query.extra as GetServerSidePropsContext)?.req?.headers?.cookie;
      if (authCookie) {
        headers.set("Cookie", authCookie);
      }

      return headers;
    },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: () => ({}),
});
