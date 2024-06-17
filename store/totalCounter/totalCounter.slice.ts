import { TotalCounter } from "@/api/services/counter.service";
import { TotalCounterResponse } from "@/pages/api/counter/[[...params]]";

import { createCounterStore } from "../shared/counterStore";

export const totalCounterSliceName = "totalCounter";

export const getTotalCounterId = (startDate: string, endDate: string) =>
  `${startDate}_${endDate}`;

export const {
  slice: totalCounterSlice,
  adapter: totalCounterAdapter,
  fetch: fetchTotalCounter,
} = createCounterStore<TotalCounter, TotalCounterResponse>({
  name: totalCounterSliceName,
  apiPath: "/api/counter/total",
  getEntities: (response) => response.totalCounter,
  selectId: (entity) =>
    getTotalCounterId(entity._params.startDate, entity._params.endDate),
});
