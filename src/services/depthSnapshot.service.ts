import axiosClient from './axios'

export const snapShotService = {
    getSnapShot: async () => {
        return await axiosClient.get<OrderBook>('')
    }
}