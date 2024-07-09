import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { filtersSelectors } from "@/store/filters/filters.selectors";
import { useEffect,useState } from "react";

import { useRouter } from 'next/router';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid


import styles from "./CompetitiveSummaryGrid.module.scss";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";
import moment from "moment";

export interface CompetitiveSummaryGridProps {
  className?: string;
  competitiveSummarySelectors:any;
  fetchCompetitiveSummaries:any;
  title:string;
  marketPlace:string;
  currency:string;
}

const SalesRank = ({ data }) => {
  console.log("Test => ",data)
  return (
    <div className="h-full w-full overflow-auto">
      {
        data?.Product?.SalesRankings?.map(s => (<div>
          <div>{s?.ProductCategoryId} {s?.Rank}</div>  
        </div>))
      }
    </div>
  );
};

export function CompetitiveSummary({ className, competitiveSummarySelectors, fetchCompetitiveSummaries, title,currency, marketPlace }: CompetitiveSummaryGridProps) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [searchAsin, setSearchAsin] = useState('');
  const { startDate, endDate } = useSelector(filtersSelectors.getDateRange);
  const isLoadingSuccess = useSelector(competitiveSummarySelectors.getIsLoadingSuccess);
  const [paginationPageSize, setPaginationPageSize] = useState(100); // Default page size
  const competitiveSummaries = useSelector(competitiveSummarySelectors[marketPlace].selectAll);

  const [colDefs, setColDefs] = useState([
    { headerName: "ASIN", field: "ASIN", editable: true},
    { headerName: "Landed Price" + " " + currency, valueGetter: ({ data }) => data?.Product?.CompetitivePricing?.CompetitivePrices?.at(0)?.Price?.LandedPrice?.Amount },
    { headerName: "Listing Price" + " " + currency, valueGetter: ({ data }) => data?.Product?.CompetitivePricing?.CompetitivePrices?.at(0)?.Price?.ListingPrice?.Amount },
    { headerName: "Shipping" + " " + currency, valueGetter: ({ data }) => data?.Product?.CompetitivePricing?.CompetitivePrices?.at(0)?.Price?.Shipping?.Amount },
    { headerName: "New Listing", valueGetter: ({ data }) => data?.Product?.CompetitivePricing?.NumberOfOfferListings?.find(nl => nl.condition == "New")?.Count },
    { headerName: "Any Listing", valueGetter: ({ data }) => data?.Product?.CompetitivePricing?.NumberOfOfferListings?.find(nl => nl.condition == "Any")?.Count },
    { headerName: "Sales Rank", cellRenderer: SalesRank, editable: true },
    { headerName: "Created At", field: "createdAt", valueGetter: (p) => moment(p?.createdAt).format("DD/MM/YYYY hh:mm:ss") },
    { headerName: "Updated At", field: "updatedAt", valueGetter: (p) => moment(p?.updatedAt).format("DD/MM/YYYY hh:mm:ss") }
  ]);


  useEffect(() => {
    const { asin } = router.query;
    if (asin) {
      const { asin } = router.query;
      dispatch(fetchCompetitiveSummaries({ asin: asin }));
    } else {
      const { sortBy = "asin", sortOrder = 'asc', page = 1 } = router.query;
      dispatch(fetchCompetitiveSummaries({ startDate, endDate, limit: paginationPageSize, page: page, sortBy: sortBy, sortOrder: sortOrder }));
    }
  }, [router.query]);


  const onSortChanged = (params) => {
    const sortedColumns = params.columnApi.getColumns()
      .filter(column => column.getSort())
      .map(column => ({
        colId: column.getColId(),
        sort: column.getSort()
      }));

    if (sortedColumns.length > 0) {
      const { colId, sort } = sortedColumns[0];
      router.push(`/competitive-summary/?sortBy=${colId}&sortOrder=${sort}`, undefined, { shallow: true });
    }
  };


  const onPaginationPageSizeChanged = (newPageSize: number) => {
    setPaginationPageSize(newPageSize);
  };

  const onPageChanged = (pageNumber: number) => {
    const { sortBy = 'asin', sortOrder = 'asc', page = 1 } = router.query;
    if (page != pageNumber)
      router.push(`/competitive-summary/?sortBy=${sortBy}&sortOrder=${sortOrder}&page=${pageNumber}`, undefined, { shallow: true });
  };


  const onSearchAsinChanged = (event) => {
    const { value } = event.target;
    setSearchAsin(value);
    router.push(`/competitive-summary/?asin=${encodeURIComponent(value)}`, undefined, { shallow: true });
  };


  return (
    <LoadingOverlay
      className="h-full w-full p-5"
      isLoadingSuccess={isLoadingSuccess}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={"w-full h-full ag-theme-quartz"} data-testid="CatalogItemsTable_table">
        <input
          type="text"
          placeholder="Search ASIN"
          value={searchAsin}
          onChange={onSearchAsinChanged}
          style={{ marginBottom: '10px', width: '100%', padding: '8px' }}
        />
        <AgGridReact
          className="w-full"
          rowData={isLoadingSuccess? competitiveSummaries:[]}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={100}
          onSortChanged={onSortChanged}
          onPaginationChanged={(event) => onPageChanged(event.api.paginationGetCurrentPage() + 1)}
          paginationNumberFormatter={(params) => {
            return `${params.value} / ${Math.ceil(54000 / 100)}`;
          }}
        >
          <div style={{ marginTop: '10px' }}>
            Page Size:
            {' '}
            <select onChange={(e) => onPaginationPageSizeChanged(parseInt(e.target.value))} value={paginationPageSize}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </AgGridReact>
      </div>
    </LoadingOverlay>
  );
}
