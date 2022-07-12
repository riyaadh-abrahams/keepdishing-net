import { baseApi as api } from "./baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getApiAuthGetCurrentUser: build.query<GetApiAuthGetCurrentUserApiResponse, GetApiAuthGetCurrentUserApiArg>({
      query: () => ({ url: `/api/Auth/GetCurrentUser` }),
    }),
    postApiAuthLogIn: build.mutation<PostApiAuthLogInApiResponse, PostApiAuthLogInApiArg>({
      query: (queryArg) => ({ url: `/api/Auth/LogIn`, method: "POST", body: queryArg.loginInput }),
    }),
    postApiAuthLogout: build.mutation<PostApiAuthLogoutApiResponse, PostApiAuthLogoutApiArg>({
      query: () => ({ url: `/api/Auth/Logout`, method: "POST" }),
    }),
    postApiAuthSignUp: build.mutation<PostApiAuthSignUpApiResponse, PostApiAuthSignUpApiArg>({
      query: (queryArg) => ({ url: `/api/Auth/SignUp`, method: "POST", body: queryArg.signupUpInput }),
    }),
    getApiAuthConfirmEmail: build.query<GetApiAuthConfirmEmailApiResponse, GetApiAuthConfirmEmailApiArg>({
      query: (queryArg) => ({ url: `/api/Auth/ConfirmEmail`, params: { token: queryArg.token, email: queryArg.email } }),
    }),
    postApiAuthForgotPassword: build.mutation<PostApiAuthForgotPasswordApiResponse, PostApiAuthForgotPasswordApiArg>({
      query: (queryArg) => ({ url: `/api/Auth/ForgotPassword`, method: "POST", body: queryArg.forgotPasswordInput }),
    }),
    postApiAuthResetPassword: build.mutation<PostApiAuthResetPasswordApiResponse, PostApiAuthResetPasswordApiArg>({
      query: (queryArg) => ({ url: `/api/Auth/ResetPassword`, method: "POST", body: queryArg.resetPasswordInput }),
    }),
    getApiTestTestEmail: build.query<GetApiTestTestEmailApiResponse, GetApiTestTestEmailApiArg>({
      query: () => ({ url: `/api/Test/TestEmail` }),
    }),
    getWeatherForecast: build.query<GetWeatherForecastApiResponse, GetWeatherForecastApiArg>({
      query: () => ({ url: `/api/WeatherForecast` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as generatedApi };
export type GetApiAuthGetCurrentUserApiResponse = /** status 200 Success */ CurrentUser;
export type GetApiAuthGetCurrentUserApiArg = void;
export type PostApiAuthLogInApiResponse = unknown;
export type PostApiAuthLogInApiArg = {
  loginInput: LoginInput;
};
export type PostApiAuthLogoutApiResponse = unknown;
export type PostApiAuthLogoutApiArg = void;
export type PostApiAuthSignUpApiResponse = unknown;
export type PostApiAuthSignUpApiArg = {
  signupUpInput: SignupUpInput;
};
export type GetApiAuthConfirmEmailApiResponse = unknown;
export type GetApiAuthConfirmEmailApiArg = {
  token?: string;
  email?: string;
};
export type PostApiAuthForgotPasswordApiResponse = unknown;
export type PostApiAuthForgotPasswordApiArg = {
  forgotPasswordInput: ForgotPasswordInput;
};
export type PostApiAuthResetPasswordApiResponse = unknown;
export type PostApiAuthResetPasswordApiArg = {
  resetPasswordInput: ResetPasswordInput;
};
export type GetApiTestTestEmailApiResponse = unknown;
export type GetApiTestTestEmailApiArg = void;
export type GetWeatherForecastApiResponse = /** status 200 Success */ WeatherForecast[];
export type GetWeatherForecastApiArg = void;
export type CurrentUser = {
  firstname: string;
  surname: string;
  userName: string;
  email: string;
  emailConfirmed: boolean;
};
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
export type ForgotPasswordInput = {
  email: string;
};
export type ResetPasswordInput = {
  token: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export type WeatherForecast = {
  date?: string;
  temperatureC?: number;
  temperatureF?: number;
  summary?: string | null;
};
export const {
  useGetApiAuthGetCurrentUserQuery,
  usePostApiAuthLogInMutation,
  usePostApiAuthLogoutMutation,
  usePostApiAuthSignUpMutation,
  useGetApiAuthConfirmEmailQuery,
  usePostApiAuthForgotPasswordMutation,
  usePostApiAuthResetPasswordMutation,
  useGetApiTestTestEmailQuery,
  useGetWeatherForecastQuery,
} = injectedRtkApi;
