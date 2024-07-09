import { getLoadingStateSelectors } from "../shared/loadingStore";
import { RootState } from "../store";

import { catalogItemsUKAdapter, catalogItemsUKSliceName } from "./catalog-items-uk.slice";

const selectCatalogItemsState = (rootState: RootState) => rootState[catalogItemsUKSliceName];

export const catalogItemsSelectors = {
  ...catalogItemsUKAdapter.getSelectors(selectCatalogItemsState),
  ...getLoadingStateSelectors(selectCatalogItemsState),
};
