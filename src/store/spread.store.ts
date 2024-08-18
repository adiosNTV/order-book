import { create } from 'zustand';

interface SpreadState {
    spread: number;
    setSpread: (maxBid: number, minAsk: number) => void

}

const useSpreadStore = create<SpreadState>((set, get) => ({
    spread: 0,
    setSpread: (maxBid: number, minAsk: number) => {
        set({ spread: maxBid - minAsk })
    },

}));

export default useSpreadStore;