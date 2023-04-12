import React, { useState } from "react";
import { useRouter } from "next/router";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import {
  FlashOn as FunctionsIcon,
  GridViewRounded as ComponentsIcon,
  Group as TeamsIcon,
  Groups as MembersIcon,
  Lan as ProjectsIcon,
  LanOutlined as TemplatesIcon,
  Power as PluginsIcon,
} from "@mui/icons-material";
import TabPanel from "../../../components/TabPanel";
import { useUser } from "@auth0/nextjs-auth0";
import LoginBackdrop from "../../../components/LoginBackdrop";
import type { Team as Org } from "../../../models/Team";
import Loading from "../../../components/Loading";
import ErrorBox from "../../../components/ErrorBox";
import { ProjectsGridView } from "@components/project";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const OrgView = () => {
  const location = useRouter();
  const { user } = useUser();
  const [org, setOrg] = useState<Org | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const { id } = location.query;

  const [tabValue, setTabValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (isLoading || org) {
    return <Loading />;
  }

  if (error) {
    return <ErrorBox error={error} />;
  }

  if (!user) {
    return <LoginBackdrop />;
  }

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      {id && (
        <>
          <Typography variant="body1" color="text.secondary">
            {org?.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {org?.description}
          </Typography>
        </>
      )}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} onChange={handleChange} aria-label="team tabs">
          <Tab label="Projects" icon={<ProjectsIcon fontSize="small" />} iconPosition="start" {...a11yProps(0)} />
          <Tab label="Plugins" icon={<PluginsIcon fontSize="small" />} iconPosition="start" {...a11yProps(1)} />
          <Tab label="Functions" icon={<FunctionsIcon fontSize="small" />} iconPosition="start" {...a11yProps(1)} />
          <Tab label="Components" icon={<ComponentsIcon fontSize="small" />} iconPosition="start" {...a11yProps(1)} />
          <Tab label="Templates" icon={<TemplatesIcon fontSize="small" />} iconPosition="start" {...a11yProps(1)} />
          <Tab label="Members" icon={<MembersIcon fontSize="small" />} iconPosition="start" {...a11yProps(1)} />
          <Tab label="Teams" icon={<TeamsIcon fontSize="small" />} iconPosition="start" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <ProjectsGridView />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        plugins
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        functions
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        components
      </TabPanel>
      <TabPanel value={tabValue} index={4}>
        project templates
      </TabPanel>
      <TabPanel value={tabValue} index={5}>
        members
      </TabPanel>
      <TabPanel value={tabValue} index={6}>
        teams
      </TabPanel>
    </Box>
  );
};

export default OrgView;
