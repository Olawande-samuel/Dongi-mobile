import { UserType } from "@/types";
import { create } from "zustand";

interface OnboardingStoreData {
	selectedUserType: UserType | null;
	setSelectedUserType: (val: UserType | null) => void;
}

export const useOnboardingStore = create<OnboardingStoreData>()((set) => ({
	selectedUserType: null,
	setSelectedUserType: (val) => set({ selectedUserType: val }),
}));
