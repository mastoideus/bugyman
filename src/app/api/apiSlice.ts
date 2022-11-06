import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://bugyman-api.onrender.com",
  credentials: "include",
  prepareHeaders: (headers, api: any) => {
    const token = api.getState().auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let result: any = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === "403") {
    console.log("sending refresh token");

    //send refresh token to get new access token
    const refreshResult: any = await baseQuery(
      "/auth/refresh",
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      //store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }));

      //retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === "403") {
        refreshResult.error.data.message = "Your login has expired";
      }
      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Note", "User"],
  endpoints: (builder) => ({}),
});
