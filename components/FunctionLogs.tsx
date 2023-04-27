import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import type { Log } from "../models/Log";
import { DataType, LogType } from "../constants/log";
import { useUser } from "@auth0/nextjs-auth0";
import { ErrorBox, Loading } from "@components";
import LogService from "../services/LogService";
import socket from "../utils/socket";
import Toast from "./Toast";

const columns: GridColDef[] = [
  // { field: "id", headerName: "ID", width: 300 },
  {
    field: "createdAt",
    headerName: "Date",
    width: 150,
    valueGetter: (params: GridValueGetterParams) => new Date(params.value).toDateString(),
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
    valueGetter: (params: GridValueGetterParams) => params.value["versionName"] ?? params.value["version"],
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
  const { user } = useUser();
  const [logs, setLogs] = useState<Log[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<LogType>(LogType.info);
  const pageSize = 10;

  useEffect(() => {
    socket.on(`log:${functionId}`, (log) => {
      setLogs((logs) => [log, ...logs]);
    });
  }, []);

  useEffect(() => {
    if (user && functionId) {
      setIsLoading(true);
      new LogService(user)
        .getMany(functionId as string)
        .then((response) => {
          setLogs(response);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(new Error(error));
          setIsLoading(false);
        });
    }
  }, [user, functionId]);

  const handleRowClick = (param: any, _event: any) => {
    const type = param.row["dataType"];
    let data = param.row["data"];
    if (type === DataType.object) data = JSON.stringify(data);
    setOpenToast(true);
    setToastMessage(data);
    setToastType(param.row.type);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorBox error={error} />;
  }

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
            color: "red",
          },
          "& .grid-row--success": {
            color: "green",
          },
          "& .grid-row--warning": {
            color: "orange",
          },
        }}
      >
        <DataGrid
          rows={logs.map((v) => ({ ...v, id: v._id }))}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[pageSize]}
          getRowClassName={(params) =>
            `grid-row--${params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"}` +
            ` grid-row--${
              params.row["type"] === LogType.error
                ? "error"
                : params.row["type"] === LogType.success
                ? "success"
                : params.row["type"] === LogType.warning
                ? "warning"
                : "info"
            }`
          }
          onRowClick={handleRowClick}
          autoHeight
          disableSelectionOnClick
        />

        <Toast message={toastMessage} open={openToast} type={toastType} onClose={() => setOpenToast(false)} />
      </Box>
    </Box>
  );
}

export default FunctionLogs;
