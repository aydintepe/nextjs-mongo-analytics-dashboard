import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { filtersSelectors } from "@/store/filters/filters.selectors";
import { useEffect } from "react";
import { fetchCatalogItems } from "@/store/catalogItems/catalog-items.slice";
import { catalogItemsSelectors } from "@/store/catalogItems/catalog-items.selectors";


import styles from "./CatalogItemsTable.module.scss";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";
import moment from "moment";

export interface CatalogItemsTableProps {
  className?: string;
}

export function CatalogItemsTable({ className }: CatalogItemsTableProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { startDate, endDate } = useSelector(filtersSelectors.getDateRange);

  const isLoadingSuccess = useSelector(catalogItemsSelectors.getIsLoadingSuccess);

  useEffect(() => {
    dispatch(fetchCatalogItems({ startDate, endDate, limit: 5 }));
  }, [startDate, endDate, dispatch]);

  const catalogItems = useSelector(catalogItemsSelectors.selectAll);


  console.log("Catalog Items => ", catalogItems)

  return (
    <LoadingOverlay
      className={classNames(styles.container, className)}
      isLoadingSuccess={isLoadingSuccess}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>Latest Asin Collections</h2>
      </div>
      <div className={styles.tableContainer} data-testid="CatalogItemsTable_table">
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.columnHeader} scope="col">
                Market Place Id
              </th>
              <th className={styles.columnHeader} scope="col">
                Asin
              </th>
              <th className={styles.columnHeader} scope="col">
                Images
              </th>
              <th className={styles.columnHeader} scope="col">
                Item Name
              </th>
              <th className={styles.columnHeader} scope="col">
                List Price
              </th>
              <th className={styles.columnHeader} scope="col">
                Size
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
            {catalogItems.map((catalogItem) => {
              return (
                <tr
                  className={styles.row}
                  data-testid="CatalogItemsTable_row"
                  key={catalogItem._id}
                >
                  <td
                    className={classNames(
                      styles.cell,
                      styles.extraPaddingRight
                    )}
                    data-testid="CatalogItemsTable_cell_lead"
                  >
                    {catalogItem?.dimensions?.at(0)?.marketplaceId}
                  </td>
                  <td
                    className={classNames(
                      styles.cell,
                      styles.extraPaddingRight
                    )}
                    data-testid="CatalogItemsTable_cell_lead"
                  >
                    {catalogItem?.asin}
                  </td>
                  <td
                    className={styles.cell}
                    data-testid="CatalogItemsTable_cell_customer"
                  >
                    <ul>
                      {
                        catalogItem?.images?.at(0)?.images?.slice(0,2)?.map((img) => (<li><a href={img.link} target="_black">{img?.variant}</a></li>))
                      }
                    </ul>
                  </td>
                  <td
                    className={styles.cell}
                    data-testid="CatalogItemsTable_cell_items"
                  >
                    {
                      catalogItem?.attributes?.item_name?.at(0)?.value
                    }
                  </td>
                  <td
                    className={styles.cell}
                    data-testid="CatalogItemsTable_cell_location"
                  >
                    {catalogItem?.attributes?.list_price?.at(0)?.value + " " + catalogItem?.attributes?.list_price?.at(0)?.currency }
                  </td>
                  <td
                    className={styles.cell}
                    data-testid="CatalogItemsTable_cell_location"
                  >
                    {catalogItem?.summaries?.at(0)?.size }
                  </td>
                  <td
                    className={styles.cell}
                    data-testid="CatalogItemsTable_cell_location"
                  >
                    {moment(catalogItem?.createdAt).format("DD/MM/YYYY hh:mm:ss")}
                  </td>
                  <td
                    className={styles.cell}
                    data-testid="CatalogItemsTable_cell_location"
                  >
                    {moment(catalogItem?.createdAt).format("DD/MM/YYYY hh:mm:ss")}
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
