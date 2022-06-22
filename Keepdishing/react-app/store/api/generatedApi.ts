import { baseApi as api } from "./baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postApiAuthLogIn: build.mutation<PostApiAuthLogInApiResponse, PostApiAuthLogInApiArg>({
      query: (queryArg) => ({ url: `/api/Auth/LogIn`, method: "POST", body: queryArg.loginInput }),
    }),
    postApiAuthSignUp: build.mutation<PostApiAuthSignUpApiResponse, PostApiAuthSignUpApiArg>({
      query: (queryArg) => ({ url: `/api/Auth/SignUp`, method: "POST", body: queryArg.signupUpInput }),
    }),
    getApiAuthGetCurrentUser: build.query<GetApiAuthGetCurrentUserApiResponse, GetApiAuthGetCurrentUserApiArg>({
      query: () => ({ url: `/api/Auth/GetCurrentUser` }),
    }),
    postApiAuthLogout: build.mutation<PostApiAuthLogoutApiResponse, PostApiAuthLogoutApiArg>({
      query: () => ({ url: `/api/Auth/Logout`, method: "POST" }),
    }),
    getWeatherForecast: build.query<GetWeatherForecastApiResponse, GetWeatherForecastApiArg>({
      query: () => ({ url: `/api/WeatherForecast` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as generatedApi };
export type PostApiAuthLogInApiResponse = unknown;
export type PostApiAuthLogInApiArg = {
  loginInput: LoginInput;
};
export type PostApiAuthSignUpApiResponse = unknown;
export type PostApiAuthSignUpApiArg = {
  signupUpInput: SignupUpInput;
};
export type GetApiAuthGetCurrentUserApiResponse = /** status 200 Success */ CurrentUser;
export type GetApiAuthGetCurrentUserApiArg = void;
export type PostApiAuthLogoutApiResponse = unknown;
export type PostApiAuthLogoutApiArg = void;
export type GetWeatherForecastApiResponse = /** status 200 Success */ WeatherForecast[];
export type GetWeatherForecastApiArg = void;
export type LoginInput = {
  username: string;
  password: string;
  rememberMe?: boolean;
};
export type SignupUpInput = {
  firstName: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export type CurrentUser = {
  firstname: string;
  surname: string;
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
  usePostApiAuthLogInMutation,
  usePostApiAuthSignUpMutation,
  useGetApiAuthGetCurrentUserQuery,
  usePostApiAuthLogoutMutation,
  useGetWeatherForecastQuery,
} = injectedRtkApi;
