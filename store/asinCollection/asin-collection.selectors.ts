import { getLoadingStateSelectors } from "../shared/loadingStore";
import { RootState } from "../store";

import { asinCollectionAdapter, asinCollectionsSliceName } from "./asin-collection.slice";

const selectAsinCollectionsState = (rootState: RootState) => rootState[asinCollectionsSliceName];

export const asinCollectionsSelectors = {
  ...asinCollectionAdapter.getSelectors(selectAsinCollectionsState),
  ...getLoadingStateSelectors(selectAsinCollectionsState),
};
