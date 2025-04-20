import { create } from "zustand";

interface StoreData {
	userType: "service" | "client" | null;
	setUserType: (val: StoreData["userType"]) => void;
}

export const useTempStore = create<StoreData>()((set) => ({
	userType: null,
	setUserType: (val) => set({ userType: val }),
}));
