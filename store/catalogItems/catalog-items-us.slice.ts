import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { LoadingStatus, getInitialLoadingState } from "../shared/loadingStore";
import { CatalogItemsResponse } from "@/pages/api/catalog-items-us";
import axios from "axios";
import { CatalogItem } from "@/api/services/catalog-items-us.service";

export const catalogItemsUSSliceName = "catalog-items-us";

export const catalogItemsUSAdapter = createEntityAdapter<CatalogItem>({
  selectId: ({ _id }) => _id,
});

export interface FetchCatalogItemsParams {
  startDate: string;
  endDate: string;
  limit: number;
}
export const fetchCatalogItems = createAsyncThunk(
  "catalog-items-us/fetch",
  async (params: FetchCatalogItemsParams) => {
    const { data } = await axios.get<CatalogItemsResponse>("/api/catalog-items-us", { params });
    return data;
  }
);

const initialState = {
  ...catalogItemsUSAdapter.getInitialState(),
  ...getInitialLoadingState(),
};

export const catalogItemsUSSlice = createSlice({
  name: catalogItemsUSSliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchCatalogItems.pending, (state) => {
        state.loadingStatus = LoadingStatus.pending;
        state.loadingError = null;
      })
      .addCase(fetchCatalogItems.fulfilled, (state, { payload }) => {
        state.loadingStatus = LoadingStatus.success;
        return catalogItemsUSAdapter.setAll(state, payload.catalogItems);
      })
      .addCase(fetchCatalogItems.rejected, (state, { error }) => {
        state.loadingStatus = LoadingStatus.fail;
        state.loadingError = error;
      }),
});
