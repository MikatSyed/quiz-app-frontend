import { tagTypes } from '../tag-types';
import { baseApi } from './baseApi'

const AUTH_URL = '/auth'
const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signin: build.mutation({
      query: (data) => ({
        url : `${AUTH_URL}/signin`,
        method: "POST",
        data
      }),
      invalidatesTags:[tagTypes.user]
    }),
    signup: build.mutation({
      query: (data) => ({
        url : `${AUTH_URL}/signup`,
        method: "POST",
        data
      }),
      invalidatesTags:[tagTypes.user]
    }),
  }),
  overrideExisting: false,
})

export const { useSigninMutation,useSignupMutation } = authApi;