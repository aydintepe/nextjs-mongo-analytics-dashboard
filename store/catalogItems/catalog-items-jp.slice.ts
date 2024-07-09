import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { LoadingStatus, getInitialLoadingState } from "../shared/loadingStore";
import { CatalogItemsResponse } from "@/pages/api/catalog-items-jp";
import axios from "axios";
import { CatalogItem } from "@/api/services/catalog-items-jp.service";

export const catalogItemsJPSliceName = "catalog-items-jp";

export const catalogItemsJPAdapter = createEntityAdapter<CatalogItem>({
  selectId: ({ _id }) => _id,
});

export interface FetchCatalogItemsParams {
  startDate: string;
  endDate: string;
  limit: number;
}
export const fetchCatalogItems = createAsyncThunk(
  "catalog-items-jp/fetch",
  async (params: FetchCatalogItemsParams) => {
    const { data } = await axios.get<CatalogItemsResponse>("/api/catalog-items-jp", { params });
    return data;
  }
);

const initialState = {
  ...catalogItemsJPAdapter.getInitialState(),
  ...getInitialLoadingState(),
};

export const catalogItemsJPSlice = createSlice({
  name: catalogItemsJPSliceName,
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
        return catalogItemsJPAdapter.setAll(state, payload.catalogItems);
      })
      .addCase(fetchCatalogItems.rejected, (state, { error }) => {
        state.loadingStatus = LoadingStatus.fail;
        state.loadingError = error;
      }),
});
