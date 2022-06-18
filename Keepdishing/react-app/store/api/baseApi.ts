import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetServerSidePropsContext } from "next";
import { HYDRATE } from "next-redux-wrapper";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.HOST,
    fetchFn: fetch,
    prepareHeaders: (headers, query) => {
      const authCookie = (query.extra as GetServerSidePropsContext)?.req?.headers?.cookie;
      console.log(process.env.HOST);
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
