import { useUser } from "@auth0/nextjs-auth0";
import React, { useState } from "react";
import { useRouter } from "next/router";
import router from "next/router";
import { ReactFlowProvider } from "react-flow-renderer";
import { LOGIN_PATH } from "../../constants/paths";
import Loading from "../../components/Loading";
import ErrorBox from "../../components/ErrorBox";
import { Box, Tab, Tabs } from "@mui/material";
import TabPanel from "../../components/TabPanel";
import Designs from "../../components/Designs";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Team = () => {
  const location = useRouter();
  // const { user, error, isLoading } = useUser();

  const { id } = location.query;

  const [tabValue, setTabValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // TODO: ensure user has permission to interact with this team

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Designs" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <Designs teamId={id as string} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
};

export default Team;
