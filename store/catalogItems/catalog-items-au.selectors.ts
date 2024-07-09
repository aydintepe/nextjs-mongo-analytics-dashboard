import { getLoadingStateSelectors } from "../shared/loadingStore";
import { RootState } from "../store";

import { catalogItemsAUAdapter, catalogItemsAUSliceName } from "./catalog-items-au.slice";

const selectCatalogItemsState = (rootState: RootState) => rootState[catalogItemsAUSliceName];

export const catalogItemsSelectors = {
  ...catalogItemsAUAdapter.getSelectors(selectCatalogItemsState),
  ...getLoadingStateSelectors(selectCatalogItemsState),
};
