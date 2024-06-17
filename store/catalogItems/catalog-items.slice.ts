import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { LoadingStatus, getInitialLoadingState } from "../shared/loadingStore";
import { CatalogItemsResponse } from "@/pages/api/catalog-items";
import axios from "axios";
import { CatalogItem } from "@/api/services/catalog-items.service";

export const catalogItemsSliceName = "catalog-items";

export const catalogItemsAdapter = createEntityAdapter<CatalogItem>({
  selectId: ({ _id }) => _id,
});

export interface FetchCatalogItemsParams {
  startDate: string;
  endDate: string;
  limit: number;
}
export const fetchCatalogItems = createAsyncThunk(
  "catalog-items/fetch",
  async (params: FetchCatalogItemsParams) => {
    const { data } = await axios.get<CatalogItemsResponse>("/api/catalog-items", { params });
    return data;
  }
);

const initialState = {
  ...catalogItemsAdapter.getInitialState(),
  ...getInitialLoadingState(),
};

export const catalogItemsSlice = createSlice({
  name: catalogItemsSliceName,
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
        return catalogItemsAdapter.setAll(state, payload.catalogItems);
      })
      .addCase(fetchCatalogItems.rejected, (state, { error }) => {
        state.loadingStatus = LoadingStatus.fail;
        state.loadingError = error;
      }),
});
