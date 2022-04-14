import React, { useState } from "react";
import { useRouter } from "next/router";
import { Box, Tab, Tabs } from "@mui/material";
import {
  Description as DesignsIcon,
  Power as PluginsIcon,
} from "@mui/icons-material";
import TabPanel from "../../components/TabPanel";
import Designs from "../../components/Designs";
import { useUser } from "@auth0/nextjs-auth0";
import LoginBackdrop from "../../components/LoginBackdrop";
import Plugins from "../../components/Plugins";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Team = () => {
  const location = useRouter();
  const { user } = useUser();

  const { id } = location.query;

  const [tabValue, setTabValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (!user) {
    return <LoginBackdrop />;
  }

  // TODO: ensure user has permission to interact with this team

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="Designs"
            icon={<DesignsIcon fontSize="small" />}
            iconPosition="start"
            {...a11yProps(0)}
          />
          <Tab
            label="Plugins"
            icon={<PluginsIcon fontSize="small" />}
            iconPosition="start"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <Designs teamId={id as string} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Plugins teamId={id as string} />
      </TabPanel>
    </Box>
  );
};

export default Team;
