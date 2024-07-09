import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { LoadingStatus, getInitialLoadingState } from "../shared/loadingStore";
import { CatalogItemsResponse } from "@/pages/api/catalog-items-uk";
import axios from "axios";
import { CatalogItem } from "@/api/services/catalog-items-uk.service";

export const catalogItemsUKSliceName = "catalog-items-uk";

export const catalogItemsUKAdapter = createEntityAdapter<CatalogItem>({
  selectId: ({ _id }) => _id,
});

export interface FetchCatalogItemsParams {
  startDate: string;
  endDate: string;
  limit: number;
}
export const fetchCatalogItems = createAsyncThunk(
  "catalog-items-uk/fetch",
  async (params: FetchCatalogItemsParams) => {
    const { data } = await axios.get<CatalogItemsResponse>("/api/catalog-items-uk", { params });
    return data;
  }
);

const initialState = {
  ...catalogItemsUKAdapter.getInitialState(),
  ...getInitialLoadingState(),
};

export const catalogItemsUKSlice = createSlice({
  name: catalogItemsUKSliceName,
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
        return catalogItemsUKAdapter.setAll(state, payload.catalogItems);
      })
      .addCase(fetchCatalogItems.rejected, (state, { error }) => {
        state.loadingStatus = LoadingStatus.fail;
        state.loadingError = error;
      }),
});
