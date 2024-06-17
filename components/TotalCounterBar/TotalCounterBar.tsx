import { useDispatch, useSelector } from "react-redux";
import { useMemo, useEffect } from "react";
import classNames from "classnames";

import { fetchTotalCounter } from "@/store/TotalCounter/totalCounter.slice";
import { fetchDayStats } from "@/store/dayStats/dayStats.slice";
import { AppDispatch } from "@/store/store";
import { totalCounterSelectors } from "@/store/totalCounter/totalCounter.selectors";
import { filtersSelectors } from "@/store/filters/filters.selectors";

import TotalCounter from "../TotalCounter/TotalCounter";
import styles from "./TotalCounterBar.module.scss";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";

export interface TotalCounterBarProps {
  className?: string;
}

export default function TotalCounterBar({ className }: TotalCounterBarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const isLoadingSuccess = useSelector(totalCounterSelectors.getIsLoadingSuccess);

  // TODO: Add date-bucketing option selection (day, week, month, year) for timelines.
  const { startDate, endDate } = useSelector(filtersSelectors.getDateRange);

  const selectTotalCounter = useMemo(
    () => totalCounterSelectors.makeSelectTotalCounter(startDate, endDate),
    [startDate, endDate]
  );
  const totalCounter = useSelector(selectTotalCounter);



  useEffect(() => {
    dispatch(fetchTotalCounter({ startDate, endDate }));
    // dispatch(fetchDayStats({ startDate, endDate }));
  }, [startDate, endDate, dispatch]);

  return (
    <LoadingOverlay className={classNames(className, styles.card)} isLoadingSuccess={isLoadingSuccess}>
      <TotalCounter
        name="Asin Collection"
        totalValue={totalCounter?.asin}
      />
       <TotalCounter
        name="Catalog Items"
        totalValue={totalCounter?.catalogItem}
      />
      <TotalCounter
        name="Competitive Summary"
        totalValue={totalCounter?.competitiveSummary}
      />
      <TotalCounter
        name="Product Offers"
        totalValue={totalCounter?.productOffers}
      />
    </LoadingOverlay>
  );
}
