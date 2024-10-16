
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const  URL = "/leader-board";

export const leaderBoardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    leaderBoards: build.query({
      query: () => {
        return {
          url: URL,
          method: "GET",      
        };
      },
      providesTags: [tagTypes.leaderBoard],
    }),

  

    addLeaderBoard: build.mutation({
        query: (data ) => ({
          url : `${URL}`,
          method: "POST",
          data
        }),
        invalidatesTags:[tagTypes.leaderBoard]
      }),

 

  }),
});

export const { useLeaderBoardsQuery,useAddLeaderBoardMutation } = leaderBoardApi;
