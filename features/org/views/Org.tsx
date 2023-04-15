import React, { useState } from "react";
import { useRouter } from "next/router";
import { Box, Tab, Tabs, Typography, useTheme } from "@mui/material";
import {
  FlashOn as FunctionsIcon,
  GridViewRounded as ComponentsIcon,
  Group as TeamsIcon,
  Groups as MembersIcon,
  Lan as ProjectsIcon,
  LanOutlined as TemplatesIcon,
  Power as PluginsIcon,
} from "@mui/icons-material";
import { useUser } from "@auth0/nextjs-auth0";
import { ErrorBox, Loading, LoginBackdrop, TabPanel } from "@components/base";
import { ProjectsGridView } from "@components/project";
import { useOrg } from "@hooks/org";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const OrgView = () => {
  const location = useRouter();
  const { user } = useUser();
  const theme = useTheme();
  const { id } = location.query;
  const { data: org, isLoading, error } = useOrg(user, id as string | undefined);

  const [tabValue, setTabValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorBox error={error} />;
  }

  if (!org) {
    return <ErrorBox error={new Error("Could not load organization")} />;
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
          <Tab
            label="Projects"
            icon={<ProjectsIcon fontSize="small" />}
            iconPosition="start"
            sx={{ fontSize: theme.typography.caption.fontSize }}
            {...a11yProps(0)}
          />
          <Tab
            label="Plugins"
            icon={<PluginsIcon fontSize="small" />}
            iconPosition="start"
            sx={{ fontSize: theme.typography.caption.fontSize }}
            {...a11yProps(1)}
          />
          <Tab
            label="Functions"
            icon={<FunctionsIcon fontSize="small" />}
            iconPosition="start"
            sx={{ fontSize: theme.typography.caption.fontSize }}
            {...a11yProps(1)}
          />
          <Tab
            label="Components"
            icon={<ComponentsIcon fontSize="small" />}
            iconPosition="start"
            sx={{ fontSize: theme.typography.caption.fontSize }}
            {...a11yProps(1)}
          />
          <Tab
            label="Templates"
            icon={<TemplatesIcon fontSize="small" />}
            iconPosition="start"
            sx={{ fontSize: theme.typography.caption.fontSize }}
            {...a11yProps(1)}
          />
          <Tab
            label="Members"
            icon={<MembersIcon fontSize="small" />}
            iconPosition="start"
            sx={{ fontSize: theme.typography.caption.fontSize }}
            {...a11yProps(1)}
          />
          <Tab
            label="Teams"
            icon={<TeamsIcon fontSize="small" />}
            iconPosition="start"
            sx={{ fontSize: theme.typography.caption.fontSize }}
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <ProjectsGridView org={org._id} />
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
