import axios from "axios";

export const axiosInterceptor = () => {
   axios.interceptors.request.use((request) => {

      return request
   })

   // axios.interceptors.response.use((response) => {

   //    return response
   // },
   //    (error) => {
   
   //       return error
   //    }
   // )
};