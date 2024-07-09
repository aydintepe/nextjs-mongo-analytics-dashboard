import { getLoadingStateSelectors } from "../shared/loadingStore";
import { RootState } from "../store";

import { catalogItemsJPAdapter, catalogItemsJPSliceName } from "./catalog-items-jp.slice";

const selectCatalogItemsState = (rootState: RootState) => rootState[catalogItemsJPSliceName];

export const catalogItemsSelectors = {
  ...catalogItemsJPAdapter.getSelectors(selectCatalogItemsState),
  ...getLoadingStateSelectors(selectCatalogItemsState),
};
