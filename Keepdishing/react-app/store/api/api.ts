import { generatedApi } from "./generatedApi";

const api = generatedApi.enhanceEndpoints({
  addTagTypes: ["User"],
  endpoints: {
    getApiAuthGetCurrentUser: {
      providesTags: ["User"],
    },
    postApiAuthLogout: {
      invalidatesTags: ["User"],
    },
  },
});

export default api;
