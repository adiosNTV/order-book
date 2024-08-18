import { create } from 'zustand';

interface SellOrderState {
    sellOrder: NumberOrder[];
    setSellOrder: (newAsks: Array<[string, string]>) => void;
}

const useSellOrderStore = create<SellOrderState>((set) => ({
    sellOrder: [],

    setSellOrder: (newAsks) => set((state) => {
        const updatedSellOrder = [...state.sellOrder];

        newAsks.forEach(([price, quantity]) => {
            const index = updatedSellOrder.findIndex(([p]) => parseFloat(price) === p);

            const quan = parseFloat(quantity);
            const pric = parseFloat(price)
            if (quan === 0) {
                if (index !== -1) {
                    updatedSellOrder.splice(index, 1);
                }
            } else {
                if (index !== -1) {
                    updatedSellOrder[index][1] = quan;
                } else {
                    updatedSellOrder.push([pric, quan]);
                }
            }
        });

        updatedSellOrder.sort((a, b) => (a[0]) - (b[0]));

        return { sellOrder: updatedSellOrder };
    })
}));

export default useSellOrderStore;