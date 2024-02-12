import axios, { AxiosError } from "axios";

export const axiosInterceptor = (callback = () => { }) => {
   axios.interceptors.request.use((request) => {

      return request
   })

   axios.interceptors.response.use((response) => {

         callback(response)
 
      return response
   },
      (error) => {

         return error
      }
   )

   return axios
};