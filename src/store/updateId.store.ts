import { create } from 'zustand';

interface UpdateIdState {
    previousUpdateId: number;
    setPreviousUpdateId: (newId: number) => void;

    lastUpdatedId: number;
    setLastUpdatedId: (newId: number) => void;

}

const useUpdateIdStore = create<UpdateIdState>((set) => ({
    previousUpdateId: -1,
    setPreviousUpdateId: (newId: number) => set({ previousUpdateId: newId }),

    lastUpdatedId: -1,
    setLastUpdatedId: (newId: number) => set({ lastUpdatedId: newId }),

}));

export default useUpdateIdStore;