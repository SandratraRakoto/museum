import { Dependencies } from "@/store/dependencies";
import { AppDispatch, AppGetState } from "@/store/store";
import { museumSlice } from "../store/museum.slice";
import { extractErrorMessage } from "@/shared/errors.utils";

export const fetchMuseums =
  (query?: string, category?: string) =>
  async (dispatch: AppDispatch, _: AppGetState, dependencies: Dependencies) => {
    dispatch(museumSlice.actions.handleMuseumsLoading());

    try {
      const museums = await dependencies.museumGateway.getMuseums(
        query,
        category
      );
      dispatch(museumSlice.actions.storeMuseums(museums));
    } catch (e) {
      dispatch(museumSlice.actions.handleMuseumsError(extractErrorMessage(e)));
    }
  };
