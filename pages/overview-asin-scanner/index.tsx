import classNames from "classnames";
import useResizeObserver from "use-resize-observer";

import TotalCounterBar from "@/components/TotalCounterBar/TotalCounterBar";
import BreakdownCounterChart from "@/components/BreakdownCounterChart/BreakdownCounterChart";
import TopPlatformsList from "@/components/TopPlatformsList/TopPlatformsList";
import { TopLocationsChart } from "@/components/TopLocationsChart/TopLocationsChart";
import { OrdersTable } from "@/components/OrdersTable/OrdersTable";

import styles from "./index.module.scss";
import AmazonMarketList from "@/components/AmazonMarketList/AmazonMarketList";
import { AsinCollectionsTable } from "@/components/AsinCollectionsTable/AsinCollectionsTable";

export default function Overview() {
  const { ref, width = 0 } = useResizeObserver<HTMLDivElement>();
  let layoutClass;
  if (width >= 820) {
    layoutClass = styles.layoutMedium;
  }
  if (width >= 1200) {
    layoutClass = styles.layoutWide;
  }

  return (
    <div ref={ref} className={classNames(styles.container, layoutClass)}>
      <header className={classNames(styles.pageHeader)}>
        <h1 className={styles.pageTitle}>Overview</h1>
      </header>
      <section className={styles.pageContent}>
        <div className={styles.grid}>
          <div className={styles.main}>
            <TotalCounterBar className={styles.shrinkable} />
            <BreakdownCounterChart
              className={classNames(styles.shrinkable, styles.autoHeight)}
            />
          </div>
          <div className={styles.cards}>
            <AmazonMarketList />
            <TopLocationsChart />
          </div>
          <AsinCollectionsTable
            className={classNames(styles.table, styles.shrinkable)}
          />
        </div>
      </section>
    </div>
  );
}
