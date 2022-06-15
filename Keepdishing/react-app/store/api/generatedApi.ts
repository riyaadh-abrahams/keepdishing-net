import { baseApi as api } from "./baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getApiAuthGetCurrentUser: build.query<
      GetApiAuthGetCurrentUserApiResponse,
      GetApiAuthGetCurrentUserApiArg
    >({
      query: () => ({ url: `/api/Auth/GetCurrentUser` }),
    }),
    postApiAuthLogout: build.mutation<
      PostApiAuthLogoutApiResponse,
      PostApiAuthLogoutApiArg
    >({
      query: () => ({ url: `/api/Auth/Logout`, method: "POST" }),
    }),
    getWeatherForecast: build.query<
      GetWeatherForecastApiResponse,
      GetWeatherForecastApiArg
    >({
      query: () => ({ url: `/api/WeatherForecast` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as generatedApi };
export type GetApiAuthGetCurrentUserApiResponse =
  /** status 200 Success */ CurrentUser;
export type GetApiAuthGetCurrentUserApiArg = void;
export type PostApiAuthLogoutApiResponse = unknown;
export type PostApiAuthLogoutApiArg = void;
export type GetWeatherForecastApiResponse =
  /** status 200 Success */ WeatherForecast[];
export type GetWeatherForecastApiArg = void;
export type CurrentUser = {
  userName: string;
  email: string;
  emailConfirmed: boolean;
};
export type WeatherForecast = {
  date?: string;
  temperatureC?: number;
  temperatureF?: number;
  summary?: string | null;
};
export const {
  useGetApiAuthGetCurrentUserQuery,
  usePostApiAuthLogoutMutation,
  useGetWeatherForecastQuery,
} = injectedRtkApi;
