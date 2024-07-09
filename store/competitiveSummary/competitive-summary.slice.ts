import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { LoadingStatus, getInitialLoadingState } from "../shared/loadingStore";
import { CompetitiveSummaryResponse } from "@/pages/api/competitive-summary/[...marketPlace]";
import axios from "axios";
import { CompetitiveSummary } from "@/api/services/competitive-summary.service";

export const competitiveSummarySliceName = "competitive-summary";

export const competitiveSummariesAUAdapter = createEntityAdapter<CompetitiveSummary>({
  selectId: ({ _id }) => _id,
});

export const competitiveSummariesJPAdapter = createEntityAdapter<CompetitiveSummary>({
  selectId: ({ _id }) => _id,
});

export const competitiveSummariesUKAdapter = createEntityAdapter<CompetitiveSummary>({
  selectId: ({ _id }) => _id,
});

export const competitiveSummariesUSAdapter = createEntityAdapter<CompetitiveSummary>({
  selectId: ({ _id }) => _id,
});

export interface FetchCompetitiveSummaryParams {
  startDate?: string;
  endDate?: string;
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: string;
  asin?: string
}
export const fetchCompetitiveSummariesAU = createAsyncThunk(
  "competitive-summaries-au/fetch",
  async (params: FetchCompetitiveSummaryParams) => {
    const { data } = await axios.get<CompetitiveSummaryResponse>("/api/competitive-summary/au/", { params });
    return data;
  }
);

export const fetchCompetitiveSummariesJP = createAsyncThunk(
  "competitive-summaries-jp/fetch",
  async (params: FetchCompetitiveSummaryParams) => {
    const { data } = await axios.get<CompetitiveSummaryResponse>("/api/competitive-summary/jp/", { params });
    return data;
  }
);

export const fetchCompetitiveSummariesUK = createAsyncThunk(
  "competitive-summaries-uk/fetch",
  async (params: FetchCompetitiveSummaryParams) => {
    const { data } = await axios.get<CompetitiveSummaryResponse>("/api/competitive-summary/uk/", { params });
    return data;
  }
);

export const fetchCompetitiveSummariesUS = createAsyncThunk(
  "competitive-summaries-us/fetch",
  async (params: FetchCompetitiveSummaryParams) => {
    const { data } = await axios.get<CompetitiveSummaryResponse>("/api/competitive-summary/us/", { params });
    return data;
  }
);

const initialState = {
  ...competitiveSummariesAUAdapter.getInitialState(),
  ...competitiveSummariesJPAdapter.getInitialState(),
  ...competitiveSummariesUKAdapter.getInitialState(),
  ...competitiveSummariesUSAdapter.getInitialState(),
  ...getInitialLoadingState(),
};

export const competitiveSummariesSlice = createSlice({
  name: competitiveSummarySliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchCompetitiveSummariesAU.pending, (state) => {
        state.loadingStatus = LoadingStatus.pending;
        state.loadingError = null;
      })
      .addCase(fetchCompetitiveSummariesAU.fulfilled, (state, { payload }) => {
        state.loadingStatus = LoadingStatus.success;
        return competitiveSummariesAUAdapter.setAll(state, payload.competitiveSummaries);
      })
      .addCase(fetchCompetitiveSummariesAU.rejected, (state, { error }) => {
        state.loadingStatus = LoadingStatus.fail;
        state.loadingError = error;
      })
      .addCase(fetchCompetitiveSummariesJP.pending, (state) => {
        state.loadingStatus = LoadingStatus.pending;
        state.loadingError = null;
      })
      .addCase(fetchCompetitiveSummariesJP.fulfilled, (state, { payload }) => {
        state.loadingStatus = LoadingStatus.success;
        return competitiveSummariesAUAdapter.setAll(state, payload.competitiveSummaries);
      })
      .addCase(fetchCompetitiveSummariesJP.rejected, (state, { error }) => {
        state.loadingStatus = LoadingStatus.fail;
        state.loadingError = error;
      })
      .addCase(fetchCompetitiveSummariesUK.pending, (state) => {
        state.loadingStatus = LoadingStatus.pending;
        state.loadingError = null;
      })
      .addCase(fetchCompetitiveSummariesUK.fulfilled, (state, { payload }) => {
        state.loadingStatus = LoadingStatus.success;
        return competitiveSummariesAUAdapter.setAll(state, payload.competitiveSummaries);
      })
      .addCase(fetchCompetitiveSummariesUK.rejected, (state, { error }) => {
        state.loadingStatus = LoadingStatus.fail;
        state.loadingError = error;
      })
      .addCase(fetchCompetitiveSummariesUS.pending, (state) => {
        state.loadingStatus = LoadingStatus.pending;
        state.loadingError = null;
      })
      .addCase(fetchCompetitiveSummariesUS.fulfilled, (state, { payload }) => {
        state.loadingStatus = LoadingStatus.success;
        return competitiveSummariesAUAdapter.setAll(state, payload.competitiveSummaries);
      })
      .addCase(fetchCompetitiveSummariesUS.rejected, (state, { error }) => {
        state.loadingStatus = LoadingStatus.fail;
        state.loadingError = error;
      })
});
