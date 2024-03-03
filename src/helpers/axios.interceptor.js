import axios from "axios";

export const axiosInterceptor = () => {
   axios.interceptors.request.use((request) => {

      console.debug(request.url,request.method)
      return request
   })

   // axios.interceptors.response.use((response) => {


   //    return response
   // },
   //    (error) => {

   //       return error
   //    }
   // )

   // return axios
};