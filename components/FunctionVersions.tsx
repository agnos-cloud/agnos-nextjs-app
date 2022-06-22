import { MouseEventHandler, useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { Box, Switch } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import type { FunctionVersion } from "../models/Function";
import { useFunctionVersionForm } from "../hooks/functionVersion.hooks";
import FunctionVersionService from "../services/FunctionVersionService";
import Loading from "./Loading";
import ErrorBox from "./ErrorBox";
import MultiPurposeDialog from "./MultiPurposeDialog";
import Fab from "./Fab";

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
    renderCell: (params: GridValueGetterParams) => <Switch checked={params.value} readOnly />,
  },
  {
    field: "createdAt",
    headerName: "Date Created",
    // description: "This column has a value getter and is not sortable.",
    // sortable: false,
    width: 150,
    valueGetter: (params: GridValueGetterParams) => new Date(params.value).toDateString(),
  },
];

export interface FunctionVersionsProps {
  functionId?: string;
}

function FunctionVersions(props: FunctionVersionsProps) {
  const { functionId } = props;
  const { user } = useUser();
  const [functionVersions, setFunctionVersions] = useState<FunctionVersion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const {
    name,
    code,
    description,
    published,
    scopes,
    testData,
    setName,
    setCode,
    setDescription,
    setScopes,
    setTestData,
    form,
    errors,
  } = useFunctionVersionForm();
  const {
    id: idUpdate,
    name: nameUpdate,
    code: codeUpdate,
    description: descriptionUpdate,
    published: publishedUpdate,
    scopes: scopesUpdate,
    testData: testDataUpdate,
    setId: setIdUpdate,
    setName: setNameUpdate,
    setCode: setCodeUpdate,
    setDescription: setDescriptionUpdate,
    setPublished: setPublishedUpdate,
    setScopes: setScopesUpdate,
    setTestData: setTestDataUpdate,
    form: formUpdate,
    errors: errorsUpdate,
  } = useFunctionVersionForm();

  useEffect(() => {
    if (user && functionId) {
      setIsLoading(true);
      new FunctionVersionService(user)
        .getMany(functionId as string)
        .then((response) => {
          setFunctionVersions(response);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(new Error(error));
          setIsLoading(false);
        });
    }
  }, [user, functionId]);

  useEffect(() => {
    if (functionVersions && functionVersions.length) {
      const funcVer = functionVersions[0];
      setName(funcVer.name);
      setCode(funcVer.code);
      setDescription(funcVer.description);
      setScopes(funcVer.scopes || []);
      setTestData(funcVer.testData || "");
    }
  }, [functionVersions]);

  const pageSize = 10;

  const handleNewVersionClick = () => {
    setOpenDialog(true);
  };

  const handleSubmitNewVersionClick = () => {
    setOpenDialog(false);
    if (user && functionId) {
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
          scopes,
          testData,
          function: functionId as string,
        })
        .then((functionVersion) => {
          setFunctionVersions((funcVersions) => [functionVersion, ...funcVersions]);
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

  const handleRowClick = (param: any, _event: any) => {
    setOpenUpdateDialog(true);
    setIdUpdate(param.row._id);
    setNameUpdate(param.row.name);
    setCodeUpdate(param.row.code);
    setDescriptionUpdate(param.row.description);
    setPublishedUpdate(param.row.published);
    setScopesUpdate(param.row.scopes || []);
    setTestDataUpdate(param.row.testData || "");
  };

  const handleSubmitUpdateVersionClick = () => {
    setOpenUpdateDialog(false);
    if (user && idUpdate) {
      if (errorsUpdate && errorsUpdate.length) {
        // TODO: show errorsUpdate
        alert(errorsUpdate[0]);
        return;
      }
      if (!codeUpdate) {
        // TODO: show error
        alert("Enter code to be executed");
        return;
      }
      setIsLoading(true);
      new FunctionVersionService(user)
        .update(idUpdate, {
          name: nameUpdate,
          description: descriptionUpdate,
          code: codeUpdate,
          published: publishedUpdate,
          scopes: scopesUpdate,
          testData: testDataUpdate,
        })
        .then((functionVersion) => {
          setFunctionVersions((funcVersions) =>
            funcVersions.map((funcVer) => {
              if (funcVer._id === functionVersion._id) {
                return functionVersion;
              }
              return funcVer;
            })
          );
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

  const handleTestUpdateVersionClick: MouseEventHandler<HTMLButtonElement> | undefined = (e) => {
    e.preventDefault();
    if (user && idUpdate) {
      if (errorsUpdate && errorsUpdate.length) {
        // TODO: show errorsUpdate
        alert(errorsUpdate[0]);
        return;
      }
      if (!codeUpdate) {
        // TODO: show error
        alert("Enter code to be executed");
        return;
      }
      setIsLoading(true);
      new FunctionVersionService(user)
        .run(
          idUpdate,
          {
            form: testDataUpdate ? JSON.parse(testDataUpdate)["form"] : undefined,
          },
          { test: true }
        )
        .then(() => {
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
        }}
      >
        <DataGrid
          rows={functionVersions.map((v) => ({ ...v, id: v._id }))}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[pageSize]}
          getRowClassName={(params) => `grid-row--${params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"}`}
          onRowClick={handleRowClick}
          autoHeight
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

        <MultiPurposeDialog
          open={openUpdateDialog}
          title="Update Version"
          onClose={() => setOpenUpdateDialog(false)}
          actions={[
            {
              text: "Cancel",
              onClick: () => setOpenUpdateDialog(false),
            },
            {
              text: "Test",
              onClick: handleTestUpdateVersionClick,
            },
            {
              text: "Submit",
              onClick: handleSubmitUpdateVersionClick,
            },
          ]}
        >
          {formUpdate}
        </MultiPurposeDialog>

        <Fab onClick={handleNewVersionClick} position={["bottom", "left"]} />
      </Box>
    </Box>
  );
}

export default FunctionVersions;
