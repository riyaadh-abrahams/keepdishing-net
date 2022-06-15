import { baseApi as api } from "./baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getWeatherForecast: build.query<
      GetWeatherForecastApiResponse,
      GetWeatherForecastApiArg
    >({
      query: () => ({ url: `/api/WeatherForecast` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as api };
export type GetWeatherForecastApiResponse =
  /** status 200 Success */ WeatherForecast[];
export type GetWeatherForecastApiArg = void;
export type WeatherForecast = {
  date?: string;
  temperatureC?: number;
  temperatureF?: number;
  summary?: string | null;
};
export const { useGetWeatherForecastQuery } = injectedRtkApi;
