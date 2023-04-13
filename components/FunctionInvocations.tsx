import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import type { Invocation } from "../models/Invocation";
import { InvocationType } from "../constants/invocation";
import socket from "../utils/socket";
import { ErrorBox, Loading } from "@components/base";
import { Box } from "@mui/material";
import Toast from "./Toast";
import InvocationService from "../services/InvocationService";

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
    valueGetter: (params: GridValueGetterParams) => params.value["versionName"],
  },
  {
    field: "output",
    headerName: "Output",
    width: 400,
    valueGetter: (params: GridValueGetterParams) =>
      String(params.row.output || params.row.error?.message || params.row.error || ""),
  },
];

export interface FunctionInvocationsProps {
  functionId?: string;
}

function FunctionInvocations(props: FunctionInvocationsProps) {
  const { functionId } = props;
  const { user } = useUser();
  const [invocations, setInvocations] = useState<Invocation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<string[]>([]);
  const [toastType, setToastType] = useState<InvocationType>(InvocationType.SUCCESS);
  const pageSize = 10;

  useEffect(() => {
    socket.on(`invocation:${functionId}`, (invocation) => {
      setInvocations((invocations) => [invocation, ...invocations]);
    });
  }, []);

  useEffect(() => {
    if (user && functionId) {
      setIsLoading(true);
      new InvocationService(user)
        .getMany(functionId as string)
        .then((response) => {
          setInvocations(response);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(new Error(error));
          setIsLoading(false);
        });
    }
  }, [user, functionId]);

  const handleRowClick = (param: any, _event: any) => {
    let context = param.row["input"];
    let output = param.row["output"];
    let error = param.row["error"];
    let messageParts = [];
    if (context) {
      context = JSON.stringify(context);
      messageParts.push("Context:");
      messageParts.push(context);
    }

    if (output) {
      output = JSON.stringify(output);
      if (messageParts.length) {
        messageParts.push("------------------");
      }
      messageParts.push("Output:");
      messageParts.push(output);
    } else if (error) {
      error = JSON.stringify(error);
      if (messageParts.length) {
        messageParts.push("------------------");
      }
      messageParts.push("Error:");
      messageParts.push(error);
    }

    if (messageParts) {
      setOpenToast(true);
      setToastMessage(messageParts);
      setToastType(param.row.type);
    }
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
          rows={invocations.map((v) => ({ ...v, id: v._id }))}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[pageSize]}
          getRowClassName={(params) =>
            `grid-row--${params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"}` +
            ` grid-row--${
              params.row["type"] === InvocationType.ERROR
                ? "error"
                : params.row["type"] === InvocationType.SUCCESS
                ? "success"
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

export default FunctionInvocations;
