import { Asin } from "@/api/services/asin-collections.service";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { LoadingStatus, getInitialLoadingState } from "../shared/loadingStore";
import { AsinCollectionsResponse } from "@/pages/api/asin-collections";
import axios from "axios";

export const asinCollectionsSliceName = "asin-collections";

export const asinCollectionAdapter = createEntityAdapter<Asin>({
  selectId: ({ _id }) => _id,
});

export interface FetchAsinCollectionsParams {
  startDate: string;
  endDate: string;
  limit: number;
}
export const fetchAsinCollections = createAsyncThunk(
  "asin-collections/fetch",
  async (params: FetchAsinCollectionsParams) => {
    const { data } = await axios.get<AsinCollectionsResponse>("/api/asin-collections", { params });
    return data;
  }
);

const initialState = {
  ...asinCollectionAdapter.getInitialState(),
  ...getInitialLoadingState(),
};

export const asinCollectionsSlice = createSlice({
  name: asinCollectionsSliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchAsinCollections.pending, (state) => {
        state.loadingStatus = LoadingStatus.pending;
        state.loadingError = null;
      })
      .addCase(fetchAsinCollections.fulfilled, (state, { payload }) => {
        state.loadingStatus = LoadingStatus.success;
        return asinCollectionAdapter.setAll(state, payload.asinCollections);
      })
      .addCase(fetchAsinCollections.rejected, (state, { error }) => {
        state.loadingStatus = LoadingStatus.fail;
        state.loadingError = error;
      }),
});
