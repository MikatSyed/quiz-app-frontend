
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const  URL = "/quiz";

export const quizApi :any = baseApi.injectEndpoints({
  endpoints: (build) => ({

    quizCategory: build.query({
      query: (id:string) => {
        return {
          url: `${URL}/category?categoryId=${id}`,
          method: "GET",      
        };
      },
      providesTags: [tagTypes.quiz,tagTypes.category],
    }),

 
    quizes: build.query({
      query: () => {
        return {
          url: URL,
          method: "GET",      
        };
      },
      providesTags: [tagTypes.quiz],
    }),

    quiz: build.query({
      query: (id:string) => {
        return {
          url:`${URL}/${id}`,
          method: "GET",      
        };
      },
      providesTags: [tagTypes.quiz],
    }),

    addQuiz: build.mutation({
      query: (data : any) => ({
        url : `${URL}/create`,
        method: "POST",
        data
      }),
      invalidatesTags:[tagTypes.quiz]
    }),

    updateQuiz: build.mutation({
      query: (data : any) => ({
        url : `${URL}/${data.id}`,
        method: "PATCH",
        data:data.body
      }),
      invalidatesTags:[tagTypes.quiz]
    }),


    deleteQuiz: build.mutation({
      query: (id : string) => ({
        url : `${URL}/${id}`,
        method: "DELETE"
       
      }),
      invalidatesTags:[tagTypes.quiz]
    }),


  }),
});

export const { useQuizesQuery,useQuizQuery,useUpdateCategoryMutation,useQuizCategoryQuery,useAddQuizMutation,useDeleteQuizMutation ,useUpdateQuizMutation} = quizApi;
