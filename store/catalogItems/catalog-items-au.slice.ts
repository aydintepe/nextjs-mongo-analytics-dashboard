import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { LoadingStatus, getInitialLoadingState } from "../shared/loadingStore";
import { CatalogItemsResponse } from "@/pages/api/catalog-items-au";
import axios from "axios";
import { CatalogItem } from "@/api/services/catalog-items-au.service";

export const catalogItemsAUSliceName = "catalog-items";

export const catalogItemsAUAdapter = createEntityAdapter<CatalogItem>({
  selectId: ({ _id }) => _id,
});

export interface FetchCatalogItemsParams {
  startDate?: string;
  endDate?: string;
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: string;
  asin?:string
}
export const fetchCatalogItems = createAsyncThunk(
  "catalog-items-au/fetch",
  async (params: FetchCatalogItemsParams) => {
    const { data } = await axios.get<CatalogItemsResponse>("/api/catalog-items-au", { params });
    return data;
  }
);

const initialState = {
  ...catalogItemsAUAdapter.getInitialState(),
  ...getInitialLoadingState(),
};

export const catalogItemsAUSlice = createSlice({
  name: catalogItemsAUSliceName,
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
        return catalogItemsAUAdapter.setAll(state, payload.catalogItems);
      })
      .addCase(fetchCatalogItems.rejected, (state, { error }) => {
        state.loadingStatus = LoadingStatus.fail;
        state.loadingError = error;
      }),
});
