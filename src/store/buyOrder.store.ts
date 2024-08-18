import { create } from 'zustand';

interface OrderBookState {
    buyOrder: NumberOrder[];
    setBuyOrder: (newBids: Array<[string, string]>) => void;
}

const useBuyOrderStore = create<OrderBookState>((set) => ({
    buyOrder: [],
    setBuyOrder: (newBids) => set((state) => {
        const updatedBuyOrder = [...state.buyOrder];

        newBids.forEach(([price, quantity]) => {
            const index = updatedBuyOrder.findIndex(([p]) => p === parseFloat(price));

            const quan = parseFloat(quantity);
            const pric = parseFloat(price);
            if (quan === 0) {
                if (index !== -1) {
                    updatedBuyOrder.splice(index, 1);
                }
            } else {
                if (index !== -1) {
                    updatedBuyOrder[index][1] = quan;
                } else {
                    updatedBuyOrder.push([pric, quan]);
                }
            }
        });

        updatedBuyOrder.sort((a, b) => (b[0]) - (a[0]));

        return { buyOrder: updatedBuyOrder };
    })
}));

export default useBuyOrderStore;