import { Dependencies } from "@/store/dependencies";
import { AppDispatch, AppGetState } from "@/store/store";
import { museumSlice } from "../store/museum.slice";
import { extractErrorMessage } from "@/shared/errors.utils";

export const fetchMuseums = async (
  dispatch: AppDispatch,
  _: AppGetState,
  dependencies: Dependencies
) => {
  dispatch(museumSlice.actions.handleMuseumsLoading());

  try {
    const museums = await dependencies.museumGateway.getMuseums();
    dispatch(museumSlice.actions.storeMuseums(museums));
  } catch (e) {
    dispatch(museumSlice.actions.handleMuseumsError(extractErrorMessage(e)));
  }
};
