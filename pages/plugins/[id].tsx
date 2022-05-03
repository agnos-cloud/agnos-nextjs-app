import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import Fab from "../../components/Fab";
import { useUser } from "@auth0/nextjs-auth0";
import PluginService from "../../services/PluginService";
import type { Plugin } from "../../models/Plugin";
import Loading from "../../components/Loading";
import ErrorBox from "../../components/ErrorBox";
import LoginBackdrop from "../../components/LoginBackdrop";
import { usePluginVersionForm } from "../../hooks/pluginVersion.hooks";
import MultiPurposeDialog from "../../components/MultiPurposeDialog";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const Plugin = () => {
  const location = useRouter();
  const { user } = useUser();
  const [plugin, setPlugin] = useState<Plugin | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const { name, config, description, published, form } = usePluginVersionForm();

  const { id } = location.query;

  useEffect(() => {
    if (user && id) {
      setIsLoading(true);
      new PluginService(user)
        .get(id as string)
        .then((response) => {
          setPlugin(response);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(new Error(error));
          setIsLoading(false);
        });
    }
  }, [user, id]);

  const pageSize = 10;
  const rowHeight = 52;
  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  const handleNewVersionClick = () => {
    setOpenDialog(true);
  };

  const handleSubmitNewVersionClick = () => {};

  if (isLoading || !plugin) {
    return <Loading />;
  }

  if (error) {
    return <ErrorBox error={error} />;
  }

  if (!user) {
    return <LoginBackdrop />;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="body1" color="text.secondary">
        {plugin?.name}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {plugin.description}
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <div style={{ height: rowHeight * (pageSize + 3) }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[5]}
            // checkboxSelection
            disableSelectionOnClick
          />

          <MultiPurposeDialog
            open={openDialog}
            title="Create New Version"
            onClose={() => setOpenDialog(false)}
            actions={[
              {
                text: "Cancel",
                onClick: () => setOpenDialog(false),
              },
              {
                text: "Submit",
                onClick: handleSubmitNewVersionClick,
              },
            ]}
          >
            {form}
          </MultiPurposeDialog>

          <Fab onClick={handleNewVersionClick} position={["bottom", "left"]} />
        </div>
      </Box>
    </Box>
  );
};

export default Plugin;
