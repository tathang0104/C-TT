import axios from 'axios'
const axiosClient = axios.create()

axiosClient.interceptors.response.use(
    async (response) => {
        return response.data
    },
    function (error) {
      const status = error?.response?.status
      if(status === 401) {
        window.alert(error)
      }
        return Promise.reject(error)
    },
)

const HttpService = {
    configure,
    axiosClient,
}

export default HttpService
