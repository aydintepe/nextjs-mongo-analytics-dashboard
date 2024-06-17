import { getLoadingStateSelectors } from "../shared/loadingStore";
import { RootState } from "../store";

import { catalogItemsAdapter, catalogItemsSliceName } from "./catalog-items.slice";

const selectCatalogItemsState = (rootState: RootState) => rootState[catalogItemsSliceName];

export const catalogItemsSelectors = {
  ...catalogItemsAdapter.getSelectors(selectCatalogItemsState),
  ...getLoadingStateSelectors(selectCatalogItemsState),
};
