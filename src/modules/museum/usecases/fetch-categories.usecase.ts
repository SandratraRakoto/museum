import { Dependencies } from "@/store/dependencies";
import { AppDispatch, AppGetState } from "@/store/store";
import { museumSlice } from "../store/museum.slice";
import { extractErrorMessage } from "@/shared/errors.utils";

export const fetchCategories = async (
  dispatch: AppDispatch,
  _: AppGetState,
  dependencies: Dependencies
) => {
  dispatch(museumSlice.actions.handleCategoriesLoading());

  try {
    const categories = await dependencies.museumGateway.getCategories();
    dispatch(museumSlice.actions.storeCategories(categories));
  } catch (e) {
    dispatch(museumSlice.actions.handleCategoriesError(extractErrorMessage(e)));
  }
};
