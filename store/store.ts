import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { dayStatsSlice, dayStatsSliceName } from "./dayStats/dayStats.slice";
import {
  totalCounterSlice,
  totalCounterSliceName,
} from "./totalCounter/totalCounter.slice";
import {
  totalStatsSlice,
  totalStatsSliceName,
} from "./totalStats/totalStats.slice";
import {
  dayPlatformStatsSlice,
  dayPlatformStatsSliceName,
} from "./dayPlatformStats/dayPlatformStats.slice";
import {
  dayGeoBucketStatsSlice,
  dayGeoBucketStatsSliceName,
} from "./dayGeoBucketStats/dayGeoBucketStats.slice";
import {
  totalPlatformStatsSlice,
  totalPlatformStatsSliceName,
} from "./totalPlatformStats/totalPlatformStats.slice";
import { filtersSlice } from "./filters/filters.slice";
import {
  totalGeoBucketStatsSlice,
  totalGeoBucketStatsSliceName,
} from "./totalGeoBucketStats/totalGeoBucketStats.slice";
import { ordersSlice } from "./orders/orders.slice";
import { asinCollectionsSlice, asinCollectionsSliceName } from "./asinCollection/asin-collection.slice";
import { catalogItemsSlice, catalogItemsSliceName } from "./catalogItems/catalog-items.slice";

export const rootReducer = combineReducers({
  filters: filtersSlice.reducer,
  orders: ordersSlice.reducer,
  [asinCollectionsSliceName]: asinCollectionsSlice.reducer,
  [catalogItemsSliceName]: catalogItemsSlice.reducer,

  [totalCounterSliceName]: totalCounterSlice.reducer,
  [totalStatsSliceName]: totalStatsSlice.reducer,
  [totalPlatformStatsSliceName]: totalPlatformStatsSlice.reducer,
  [totalGeoBucketStatsSliceName]: totalGeoBucketStatsSlice.reducer,

  [dayStatsSliceName]: dayStatsSlice.reducer,
  [dayPlatformStatsSliceName]: dayPlatformStatsSlice.reducer,
  [dayGeoBucketStatsSliceName]: dayGeoBucketStatsSlice.reducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof setupStore>;
export type AppDispatch = AppState["dispatch"];
