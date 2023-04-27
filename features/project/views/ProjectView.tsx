import React, { useEffect, useMemo, useState } from "react";
import { Box, Stack, Tab, Tabs, Typography, useTheme } from "@mui/material";
import {
  Architecture as DesignsIcon,
  DataObject as ModelsIcon,
  Groups as CollaboratorsIcon,
  Settings as SettingsIcon,
  Storage as DataIcon,
} from "@mui/icons-material";
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import { ErrorBox, Loading, LoginBackdrop, TabPanel } from "@components";
import { useApi } from "@hooks/base";
import ProjectService from "@services/project";
import { Project, ProjectInput, ProjectUpdate } from "@models/project";
import ProjectModelsView from "./ProjectModelsView";

export interface ProjectViewProps {
  id: string;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProjectView = (props: ProjectViewProps) => {
  const { user } = useUser();
  const theme = useTheme();
  const { id } = props;
  const query = useMemo(
    () => ({
      "@include": [{ path: "canvas", select: "nodes" }],
    }),
    []
  );
  const {
    item: project,
    fetchItem: fetchProject,
    fetchingItem: fetchingProject,
    fetchingItemError: fetchingProjectError,
  } = useApi<ProjectService, Project, ProjectInput, ProjectUpdate>(ProjectService, user);

  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    fetchProject(id as string, query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (!user) {
    return <LoginBackdrop />;
  }

  if (fetchingProject) {
    return <Loading />;
  }

  if (fetchingProjectError) {
    return <ErrorBox error={fetchingProjectError} />;
  }

  if (!project) {
    return <ErrorBox error={new Error("Could not load project")} />;
  }

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <Stack direction="row" spacing={theme.spacing(2)}>
        <Box sx={{ pt: theme.spacing(1) }}>
          {project.picture && (
            <Image src={project.picture} alt={project.name} width={32} height={32} style={{ borderRadius: "50%" }} />
          )}
        </Box>
        <Stack>
          <Typography variant="body1" color="text.secondary">
            {project.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {project.description}
          </Typography>
        </Stack>
      </Stack>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} onChange={handleChange} aria-label="team tabs">
          <Tab
            label="Models"
            icon={<ModelsIcon fontSize="small" />}
            iconPosition="start"
            sx={{ fontSize: theme.typography.caption.fontSize }}
            {...a11yProps(0)}
          />
          <Tab
            label="Data"
            icon={<DataIcon fontSize="small" />}
            iconPosition="start"
            sx={{ fontSize: theme.typography.caption.fontSize }}
            {...a11yProps(1)}
          />
          <Tab
            label="Designs"
            icon={<DesignsIcon fontSize="small" />}
            iconPosition="start"
            sx={{ fontSize: theme.typography.caption.fontSize }}
            {...a11yProps(2)}
          />
          <Tab
            label="Collaborators"
            icon={<CollaboratorsIcon fontSize="small" />}
            iconPosition="start"
            sx={{ fontSize: theme.typography.caption.fontSize }}
            {...a11yProps(3)}
          />
          <Tab
            label="Settings"
            icon={<SettingsIcon fontSize="small" />}
            iconPosition="start"
            sx={{ fontSize: theme.typography.caption.fontSize }}
            {...a11yProps(4)}
          />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <ProjectModelsView project={project} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        data
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        designs
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        collaborators
      </TabPanel>
      <TabPanel value={tabValue} index={4}>
        settings
      </TabPanel>
    </Box>
  );
};

export default ProjectView;
