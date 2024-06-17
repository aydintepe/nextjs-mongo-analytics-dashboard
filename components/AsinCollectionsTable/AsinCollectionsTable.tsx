import classNames from "classnames";
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { filtersSelectors } from "@/store/filters/filters.selectors";
import { useEffect } from "react";
import { fetchAsinCollections } from "@/store/asinCollection/asin-collection.slice";
import { asinCollectionsSelectors } from "@/store/asinCollection/asin-collection.selectors";


import styles from "./AsinCollectionsTable.module.scss";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";

export interface AsinCollectionTableProps {
  className?: string;
}

export function AsinCollectionsTable({ className }: AsinCollectionTableProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { startDate, endDate } = useSelector(filtersSelectors.getDateRange);

  const isLoadingSuccess = useSelector(asinCollectionsSelectors.getIsLoadingSuccess);

  useEffect(() => {
    dispatch(fetchAsinCollections({ startDate, endDate, limit: 5 }));
  }, [startDate, endDate, dispatch]);

  const asinCollections = useSelector(asinCollectionsSelectors.selectAll);


  return (
    <LoadingOverlay
      className={classNames(styles.container, className)}
      isLoadingSuccess={isLoadingSuccess}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>Latest Asin Collections</h2>
      </div>
      <div className={styles.tableContainer} data-testid="AsinCollectionTable_table">
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.columnHeader} scope="col">
                Asin
              </th>
              <th className={styles.columnHeader} scope="col">
                Category Items Last Control
              </th>
              <th className={styles.columnHeader} scope="col">
                Competitive Summary Last Control
              </th>
              <th className={styles.columnHeader} scope="col">
                Product Offers Last Control
              </th>
              <th className={styles.columnHeader} scope="col">
                Created At
              </th>
              <th className={styles.columnHeader} scope="col">
                Updated At
              </th>
            </tr>
          </thead>
          <tbody>
            {asinCollections.map((asinCollection) => {
              return (
                <tr
                  className={styles.row}
                  data-testid="AsinCollectionsTable_row"
                  key={asinCollection._id}
                >
                    <td
                    className={classNames(
                      styles.cell,
                      styles.extraPaddingRight
                    )}
                    data-testid="AsinCollectionsTable_cell_lead"
                  >
                    {asinCollection?.asin}
                  </td>
                  <td
                    className={styles.cell}
                    data-testid="AsinCollectionsTable_cell_customer"
                  >
                    {moment(asinCollection?.lastControl_catalog_item).format("DD/MM /YYYY hh:mm:ss")}
                  </td>
                  <td
                    className={styles.cell}
                    data-testid="AsinCollectionsTable_cell_items"
                  >
                     {moment(asinCollection?.lastControl_competitive_summary).format("DD/MM/YYYY hh:mm:ss")}
                  </td>
                  <td
                    className={styles.cell}
                    data-testid="AsinCollectionsTable_cell_location"
                  >
                        {moment(asinCollection?.lastControl_product_offers).format("DD/MM/YYYY hh:mm:ss")}
                  </td>
                  <td
                    className={styles.cell}
                    data-testid="AsinCollectionsTable_cell_location"
                  >
                        {moment(asinCollection?.createdAt).format("DD/MM/YYYY hh:mm:ss")}
                  </td>
                  <td
                    className={styles.cell}
                    data-testid="AsinCollectionsTable_cell_location"
                  >
                        {moment(asinCollection?.updatedAt).format("DD/MM/YYYY hh:mm:ss")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </LoadingOverlay>
  );
}
