import { getLoadingStateSelectors } from "../shared/loadingStore";
import { RootState } from "../store";

import { competitiveSummariesAUAdapter, competitiveSummariesJPAdapter, competitiveSummariesUKAdapter, competitiveSummariesUSAdapter, competitiveSummarySliceName } from "./competitive-summary.slice";

const selectCompetitiveSummaryState = (rootState: RootState) => rootState[competitiveSummarySliceName];

export const competitiveSummarySelectors = {
  au:competitiveSummariesAUAdapter.getSelectors(selectCompetitiveSummaryState),
  jp:competitiveSummariesJPAdapter.getSelectors(selectCompetitiveSummaryState),
  uk:competitiveSummariesUKAdapter.getSelectors(selectCompetitiveSummaryState),
  us:competitiveSummariesUSAdapter.getSelectors(selectCompetitiveSummaryState),
  ...getLoadingStateSelectors(selectCompetitiveSummaryState),
};
