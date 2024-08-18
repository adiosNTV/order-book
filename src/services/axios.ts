import axios, { AxiosResponse } from 'axios'

const baseURL: string = String(process.env.NEXT_PUBLIC_INIT_API)
// process.env.INIT_API
const axiosClient = axios.create({
    baseURL: baseURL,
})

// Add a request interceptor
axiosClient.interceptors.request.use(
    async (config) => {
        // config if needed
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)

//Add a response interceptor
axiosClient.interceptors.response.use(
    async (response) => {
        return handleResponse(response)
    },
    async (error) => {
        if (error.response.status === 403 || error.response.status === 401) {
            localStorage.clear()
            window.location.href = '/'
        }
        throw error
    }
)

const handleResponse = (res: AxiosResponse<any>) => {
    //if need to change or something
    return res
}

export default axiosClient

