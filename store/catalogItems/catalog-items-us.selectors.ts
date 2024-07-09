import { getLoadingStateSelectors } from "../shared/loadingStore";
import { RootState } from "../store";

import { catalogItemsUSAdapter, catalogItemsUSSliceName } from "./catalog-items-us.slice";

const selectCatalogItemsState = (rootState: RootState) => rootState[catalogItemsUSSliceName];

export const catalogItemsSelectors = {
  ...catalogItemsUSAdapter.getSelectors(selectCatalogItemsState),
  ...getLoadingStateSelectors(selectCatalogItemsState),
};
