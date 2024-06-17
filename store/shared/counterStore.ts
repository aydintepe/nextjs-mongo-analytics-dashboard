import {
  EntityState,
  IdSelector,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

import {
  LoadingState,
  LoadingStatus,
  getInitialLoadingState,
} from "./loadingStore";
import {
  DayCounterResponse,
  Counter,
  TotalCounterResponse,
} from "@/api/shared/counter";

interface FetchCounterParams {
  startDate?: string;
  endDate?: string;
}

export type EntityWithParams<T> = T & { _params: FetchCounterParams };

export type DayCounterSliceState<T> = EntityState<T> & LoadingState;

export interface GetCounterStoreParams<T, R> {
  name: string;
  apiPath: string;
  getEntities: (response: R) => T[];
  selectId: IdSelector<EntityWithParams<T>>;
}

export function createCounterStore<
  T extends Counter,
  R extends DayCounterResponse<T> | TotalCounterResponse<T>
>({ name, apiPath, getEntities, selectId }: GetCounterStoreParams<T, R>) {
  const fetch = createAsyncThunk(
    `${name}/fetch`,
    async (params: FetchCounterParams) => {
      const { data } = await axios.get<R>(apiPath, {
        params: {
          startDate: params.startDate,
          endDate: params.endDate,
        },
      });
      return { data, params };
    }
  );

  const adapter = createEntityAdapter<EntityWithParams<T>>({ selectId });

  const initialState: DayCounterSliceState<EntityWithParams<T>> = {
    ...adapter.getInitialState(),
    ...getInitialLoadingState(),
  };

  const slice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetch.pending, (state) => {
          state.loadingStatus = LoadingStatus.pending;
          state.loadingError = null;
        })
        .addCase(fetch.fulfilled, (state, { payload: { data, params } }) => {
          state.loadingStatus = LoadingStatus.success;
          return adapter.setAll(
            state as DayCounterSliceState<EntityWithParams<T>>,
            getEntities(data).map((entity) => ({
              ...entity,
              _params: params,
            }))
          );
        })
        .addCase(fetch.rejected, (state, { error }) => {
          state.loadingStatus = LoadingStatus.fail;
          state.loadingError = error;
        });
    },
  });

  return {
    slice,
    adapter,
    fetch,
  };
}
