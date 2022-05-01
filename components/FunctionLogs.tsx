import { useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import type { Log } from "../models/Log";
import { LogType } from "../constants/log";

const columns: GridColDef[] = [
  // { field: "id", headerName: "ID", width: 300 },
  {
    field: "createdAt",
    headerName: "Date",
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      new Date(params.value).toDateString(),
  },
  {
    field: "env",
    headerName: "Env",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 150,
  },
  {
    field: "meta",
    headerName: "Version",
    width: 150,
    valueGetter: (params: GridValueGetterParams) => params.value["versionName"],
  },
  {
    field: "data",
    headerName: "Data",
    width: 400,
    valueGetter: (params: GridValueGetterParams) => String(params.value),
  },
];

export interface FunctionLogsProps {
  functionId?: string;
}

function FunctionLogs(props: FunctionLogsProps) {
  const { functionId } = props;
  const [logs, setLogs] = useState<Log[]>([]);
  const pageSize = 10;
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          "& .grid-row--even": {
            bgcolor: "aliceblue",
          },
          "& .grid-row--error": {
            bgcolor: "red",
          },
        }}
      >
        <DataGrid
          rows={logs.map((v) => ({ ...v, id: v._id }))}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[pageSize]}
          getRowClassName={(params) =>
            `grid-row--${
              params.row["type"] === LogType.ERROR
                ? "error"
                : params.indexRelativeToCurrentPage % 2 === 0
                ? "even"
                : "odd"
            }`
          }
          // onRowClick={handleRowClick}
          autoHeight
          // checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
}

export default FunctionLogs;
