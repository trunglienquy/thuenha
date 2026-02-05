import { createNewUserInDatabase } from "@/lib/utils";
import { Manager, Tenant } from "@/types/prismaTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

let isRedirecting = false;

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  prepareHeaders: async (headers) => {
    const session = await fetchAuthSession();
    const { idToken } = session.tokens ?? {};
    if (idToken) {
      headers.set("Authorization", `Bearer ${idToken}`);
    }
    return headers;
  },
});

const baseQueryWithRedirect: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (
    result.error &&
    (result.error.status === 500 ||
      result.error.status === 502 ||
      result.error.status === 503 ||
      result.error.status === "FETCH_ERROR")
  ) {
    if (!isRedirecting && typeof window !== "undefined") {
      isRedirecting = true;
      window.location.href = "/maintenance";
    }
  }

  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithRedirect,
  reducerPath: "api",
  tagTypes: ["Managers", "Tenants"],
  endpoints: (build) => ({
    getAuthUser: build.query<User, void>({
      queryFn: async (_, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const session = await fetchAuthSession()
          const { idToken } = session.tokens ?? {}
          const user = await getCurrentUser()
          const userRole = idToken?.payload["custom:role"] as string

          const endpoint = userRole === "manager" ? `/managers/${user.userId}` : `/tenants/${user.userId}`
          let userDetailsResponse = await fetchWithBQ(endpoint)

          //if user exists, create new user
          if (userDetailsResponse.error && userDetailsResponse.error?.status === 404) {
            userDetailsResponse = await createNewUserInDatabase(
              user,
              idToken,
              userRole,
              fetchWithBQ
            )
          }
          return {
            data: {
              cognitoInfo: {...user},
              userInfo: userDetailsResponse.data as Tenant | Manager,
              userRole
            }
          }
        } catch (error: any) {
          return { 
            error: {
              status: 'FETCH_ERROR',
              data: error?.message || "Không thể lấy thông tin người dùng",
            } as FetchBaseQueryError
          }
        }
      }
    }),

    updateTenantSettings: build.mutation<Tenant, {cognitoId: string} & Partial<Tenant>>({
      query: ({  cognitoId, ...updatedTenant }) => ({
        url: `/tenants/${cognitoId}`,
        method: "PUT",
        body: updatedTenant
      }),
      invalidatesTags: (result) => [{ type: "Tenants", id: result?.id }]
    }),

    updateManagerSettings: build.mutation<Manager, {cognitoId: string} & Partial<Manager>>({
      query: ({  cognitoId, ...updatedManager }) => ({
        url: `/managers/${cognitoId}`,
        method: "PUT",
        body: updatedManager
      }),
      invalidatesTags: (result) => [{ type: "Managers", id: result?.id }]
    })
  }),
  
});

export const {
  useGetAuthUserQuery, useUpdateTenantSettingsMutation, useUpdateManagerSettingsMutation
} = api;
