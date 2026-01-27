import { baseApi } from "../../base/baseAPI";

const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFAQ: builder.query({
      query: () => "/faq",
      transformResponse: (res: { data: any }) => res?.data,
    }),
    addFAQ: builder.mutation({
      query: (data) => ({
        url: "/faq",
        method: "POST",
        body: data,
      }),
    }),
    updateFAQ: builder.mutation({
      query: ({ id, data }) => ({
        url: `/faq/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteFAQ: builder.mutation({
      query: (id)=> {
        return {
          url: `/faq/${id}`,
          method: "DELETE",          
        }
      }
    }),

    getTermsCondition: builder.query({
      query: () => "/disclaimer/terms-and-condition",
      transformResponse: (res: { data: any }) => res?.data,
    }),

    getAbout: builder.query({
      query: () => "/disclaimer/about",
      transformResponse: (res: { data: any }) => res?.data,
    }),
    getPrivacyPolicy: builder.query({
      query: () => "/disclaimer/privacy-policy",
      transformResponse: (res: { data: any }) => res?.data,
    }),
    addDisclaimer: builder.mutation({
      query: (data) => {
        console.log("addDisclaimer", data);

        return {
          url: "/disclaimer",
          method: "POST",
          body: data,
        };
      },
    }),

    addSupport: builder.mutation({
      query: (data) => {
        return {
          url: "/contact-info",
          method: "POST",
          body: data,
        };
      },
    }),
    getSupport: builder.query({
      query: () => "/contact-info",
      transformResponse: (res: { data: any }) => res?.data,
    }),

    getNotification: builder.query({
      query: () => "/reports",
      transformResponse: (res: { data: any }) => res?.data,
    }),


    // ---------------- Commission and Shipping Charge APIs can be added here in future ----------------
    getCommissionShipping: builder.query({
      query: () => "/settings",
      transformResponse: (res: { data: any }) => res?.data,
      providesTags: ["settings"],
    }), 

    updateCommissionShipping: builder.mutation({
     query: (data) => {
        return {
          url: "/settings/update",
          method: "POST",
          body: data,
        };
      },
       invalidatesTags: ['settings'],    
    }), 
  }),
});

export const {
useGetCommissionShippingQuery,
useUpdateCommissionShippingMutation,

  useGetFAQQuery,
  useGetAboutQuery,
  useGetPrivacyPolicyQuery,

  useGetSupportQuery,
  useAddSupportMutation,

  useAddFAQMutation,
  useUpdateFAQMutation,
  useDeleteFAQMutation,

  useGetTermsConditionQuery,
  useAddDisclaimerMutation,
} = settingApi;
