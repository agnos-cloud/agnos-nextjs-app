import { useEffect, useState } from "react";
import { Box, Switch, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import PluginService from "../../services/PluginService";
import type { Plugin, PluginVersion } from "../../models/Plugin";
import { ErrorBox, Fab, Loading, LoginBackdrop, MultiPurposeDialog } from "@components";
import { usePluginVersionForm } from "../../hooks/pluginVersion.hooks";
import PluginVersionService from "../../services/PluginVersionService";

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

const Plugin = () => {
  const location = useRouter();
  const { user } = useUser();
  const [plugin, setPlugin] = useState<Plugin | undefined>(undefined);
  const [pluginVersions, setPluginVersions] = useState<PluginVersion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const { name, config, description, published, setName, setConfig, setDescription, form, errors } =
    usePluginVersionForm();
  const {
    id: idUpdate,
    name: nameUpdate,
    config: configUpdate,
    description: descriptionUpdate,
    published: publishedUpdate,
    setId: setIdUpdate,
    setName: setNameUpdate,
    setConfig: setConfigUpdate,
    setDescription: setDescriptionUpdate,
    setMenus: setMenusUpdate,
    setPublished: setPublishedUpdate,
    form: formUpdate,
    errors: errorsUpdate,
  } = usePluginVersionForm();

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

  useEffect(() => {
    if (user && plugin) {
      setIsLoading(true);
      new PluginVersionService(user)
        .getMany(plugin._id)
        .then((response) => {
          setPluginVersions(response);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(new Error(error));
          setIsLoading(false);
        });
    }
  }, [user, plugin]);

  useEffect(() => {
    if (pluginVersions && pluginVersions.length) {
      const pluginVer = pluginVersions[0];
      setName(pluginVer.name);
      setConfig(pluginVer.config);
      setDescription(pluginVer.description);
    }
  }, [pluginVersions]);

  const pageSize = 10;

  const handleNewVersionClick = () => {
    setOpenDialog(true);
  };

  const handleSubmitNewVersionClick = () => {
    setOpenDialog(false);
    if (user && plugin) {
      if (errors && errors.length) {
        // TODO: show errors
        alert(errors[0]);
        return;
      }
      if (!config) {
        // TODO: show error
        alert("Enter plugin version config");
        return;
      }
      setIsLoading(true);
      new PluginVersionService(user)
        .create({
          name,
          description,
          config,
          published,
          plugin: plugin._id,
        })
        .then((pluginVersion) => {
          setPluginVersions((plugVersions) => [pluginVersion, ...plugVersions]);
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
    setConfigUpdate(param.row.config);
    setDescriptionUpdate(param.row.description);
    setMenusUpdate(param.row.menus);
    setPublishedUpdate(param.row.published);
  };

  const handleSubmitUpdateVersionClick = () => {
    setOpenUpdateDialog(false);
    if (user && idUpdate) {
      if (errorsUpdate && errorsUpdate.length) {
        // TODO: show errorsUpdate
        alert(errorsUpdate[0]);
        return;
      }
      if (!configUpdate) {
        // TODO: show error
        alert("Enter plugin version config");
        return;
      }
      setIsLoading(true);
      new PluginVersionService(user)
        .update(idUpdate, {
          name: nameUpdate,
          description: descriptionUpdate,
          config: configUpdate,
          published: publishedUpdate,
        })
        .then((pluginVersion) => {
          setPluginVersions((plugVersions) =>
            plugVersions.map((plugVer) => {
              if (plugVer._id === pluginVersion._id) {
                return pluginVersion;
              }
              return plugVer;
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
          rows={pluginVersions.map((v) => ({ ...v, id: v._id }))}
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
};

export default Plugin;
