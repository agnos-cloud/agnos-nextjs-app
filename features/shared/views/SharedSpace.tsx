import React, { useState } from "react";
import { Box, Tab, Tabs, Typography, useTheme } from "@mui/material";
import {
  FlashOn as FunctionsIcon,
  GridViewRounded as ComponentsIcon,
  Lan as ProjectsIcon,
  LanOutlined as TemplatesIcon,
  Power as PluginsIcon,
} from "@mui/icons-material";
import { useUser } from "@auth0/nextjs-auth0";
import { LoginBackdrop, TabPanel } from "@components";
import { ProjectsGridView } from "@views/project";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SharedSpace = () => {
  const { user } = useUser();
  const theme = useTheme();

  const [tabValue, setTabValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (!user) {
    return <LoginBackdrop />;
  }

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <Typography variant="body1" color="text.secondary">
        Shared Space
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Find everything that has been shared with you here
      </Typography>
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
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <ProjectsGridView readonly shared />
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
    </Box>
  );
};

export default SharedSpace;