import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';



export default function Analytics() {
  const [rowData, setRowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" }
  ]);

  return <div className="content">
    <div className="flex flex-row mt-2 ml-4">
      <div>
        <Grid container spacing={2}>
          <Grid item xl={3}>
            <Button variant="contained">Amazon AU <br />(A39IBJ37TRP1C6)</Button>
          </Grid>
          <Grid item xl={3}>
            <Button variant="contained">Amazon JP <br />(A1VC38T7YXB528)</Button>
          </Grid>
          <Grid item xl={3}>
            <Button variant="contained">Amazon UK <br />(A1F83G8C2ARO7P)</Button>
          </Grid>
          <Grid item xl={3}>
            <Button variant="contained">Amazon US <br />(ATVPDKIKX0DER)</Button>
          </Grid>
        </Grid>
      </div>
    </div>
    <div className="flex flex-row">
      <div className="flex-grow p-4 w-full">

        <div
          className="ag-theme-quartz" // applying the grid theme
          style={{ height: 500 }} // the grid will fill the size of the parent container
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
          />
        </div>

      </div>
    </div>
  </div >
}
