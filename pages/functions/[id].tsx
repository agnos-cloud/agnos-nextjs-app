import { useEffect, useState } from "react";
import { Box, Switch, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import Fab from "../../components/Fab";
import { useUser } from "@auth0/nextjs-auth0";
import Loading from "../../components/Loading";
import ErrorBox from "../../components/ErrorBox";
import LoginBackdrop from "../../components/LoginBackdrop";
import MultiPurposeDialog from "../../components/MultiPurposeDialog";
import { useFunctionVersionForm } from "../../hooks/functionVersion.hooks";
import type { Function, FunctionVersion } from "../../models/Function";
import FunctionService from "../../services/FunctionService";
import FunctionVersionService from "../../services/FunctionVersionService";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 300 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    // editable: true,
  },
  {
    field: "description",
    headerName: "Description",
    width: 400,
    // editable: true,
  },
  {
    field: "published",
    headerName: "Published",
    width: 150,
    // editable: true,
    renderCell: (params: GridValueGetterParams) => (
      <Switch checked={params.value} readOnly />
    ),
  },
  {
    field: "createdAt",
    headerName: "Date Created",
    // description: "This column has a value getter and is not sortable.",
    // sortable: false,
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      new Date(params.value).toDateString(),
  },
];

const FunctionPage = () => {
  const location = useRouter();
  const { user } = useUser();
  const [func, setFunc] = useState<Function | undefined>(undefined);
  const [functionVersions, setFunctionVersions] = useState<FunctionVersion[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const {
    name,
    code,
    description,
    published,
    setName,
    setCode,
    setDescription,
    setPublished,
    form,
    errors,
  } = useFunctionVersionForm();

  const { id } = location.query;

  useEffect(() => {
    if (user && id) {
      setIsLoading(true);
      new FunctionService(user)
        .get(id as string)
        .then((response) => {
          setFunc(response);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(new Error(error));
          setIsLoading(false);
        });
    }
  }, [user, id]);

  useEffect(() => {
    if (user && id) {
      setIsLoading(true);
      new FunctionVersionService(user)
        .getMany(id as string)
        .then((response) => {
          setFunctionVersions(response);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(new Error(error));
          setIsLoading(false);
        });
    }
  }, [user, id]);

  useEffect(() => {
    if (functionVersions && functionVersions.length) {
      const funcVer = functionVersions[0];
      setName(funcVer.name);
      setCode(funcVer.code);
      setDescription(funcVer.description);
      setPublished(funcVer.published);
    }
  }, [functionVersions]);

  const pageSize = 10;
  const rowHeight = 52;

  const handleNewVersionClick = () => {
    setOpenDialog(true);
  };

  const handleSubmitNewVersionClick = () => {
    setOpenDialog(false);
    if (user && id) {
      if (errors && errors.length) {
        // TODO: show errors
        alert(errors[0]);
        return;
      }
      if (!code) {
        // TODO: show error
        alert("Enter code to be executed");
        return;
      }
      setIsLoading(true);
      new FunctionVersionService(user)
        .create({
          name,
          description,
          code,
          published,
          function: id as string,
        })
        .then((functionVersion) => {
          setFunctionVersions((funcVersions) => [
            functionVersion,
            ...funcVersions,
          ]);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(new Error(error));
          setIsLoading(false);
        });
    } else {
      // TODO:
    }
  };

  if (isLoading || !func) {
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
        {func?.name}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {func.description}
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <div style={{ height: rowHeight * (pageSize + 3) }}>
          <DataGrid
            rows={functionVersions.map((v) => ({ ...v, id: v._id }))}
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

          <Fab onClick={handleNewVersionClick} location={["bottom", "left"]} />
        </div>
      </Box>
    </Box>
  );
};

export default FunctionPage;
