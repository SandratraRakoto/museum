import { AppState } from "@/store/store";

export const selectMuseum = (state: AppState) => state.museum.museums;
