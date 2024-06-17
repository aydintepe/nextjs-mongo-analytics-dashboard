import { getLoadingStateSelectors } from "../shared/loadingStore";
import { RootState } from "../store";
import {
  getTotalCounterId,
  totalCounterAdapter,
  totalCounterSliceName,
} from "./totalCounter.slice";

const getTotalCounterState = (rootState: RootState) =>
  rootState[totalCounterSliceName];

const entitySelectors = totalCounterAdapter.getSelectors(getTotalCounterState);

const makeSelectTotalCounter =
  (startDate: string, endDate: string) => (state: RootState) =>
    entitySelectors.selectById(state, getTotalCounterId(startDate, endDate));

export const totalCounterSelectors = {
  makeSelectTotalCounter,
  ...entitySelectors,
  ...getLoadingStateSelectors(getTotalCounterState),
};
