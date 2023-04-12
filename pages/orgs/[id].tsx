import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import {
  Description as DesignsIcon,
  FlashOn as FunctionsIcon,
  Group as MembersIcon,
  Power as PluginsIcon,
} from "@mui/icons-material";
import TabPanel from "../../components/TabPanel";
import Designs from "../../components/Designs";
import { useUser } from "@auth0/nextjs-auth0";
import LoginBackdrop from "../../components/LoginBackdrop";
import Plugins from "../../components/Plugins";
import Functions from "../../components/Functions";
import type { Team } from "../../models/Team";
import Loading from "../../components/Loading";
import ErrorBox from "../../components/ErrorBox";
import TeamService from "../../services/TeamService";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Team = () => {
  const location = useRouter();
  const { user } = useUser();
  const [team, setTeam] = useState<Team | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const { id } = location.query;

  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (user && id) {
      setIsLoading(true);
      new TeamService(user)
        .get(id as string)
        .then((response) => {
          setTeam(response);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(new Error(error));
          setIsLoading(false);
        });
    }
  }, [user, id]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (isLoading || !team) {
    return <Loading />;
  }

  if (error) {
    return <ErrorBox error={error} />;
  }

  if (!user) {
    return <LoginBackdrop />;
  }

  // TODO: ensure user has permission to interact with this team

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="body1" color="text.secondary">
        {team?.name}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {team?.description}
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} onChange={handleChange} aria-label="team tabs">
          <Tab label="Designs" icon={<DesignsIcon fontSize="small" />} iconPosition="start" {...a11yProps(0)} />
          <Tab label="Plugins" icon={<PluginsIcon fontSize="small" />} iconPosition="start" {...a11yProps(1)} />
          <Tab label="Functions" icon={<FunctionsIcon fontSize="small" />} iconPosition="start" {...a11yProps(1)} />
          <Tab label="Members" icon={<MembersIcon fontSize="small" />} iconPosition="start" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <Designs teamId={id as string} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Plugins teamId={id as string} />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <Functions teamId={id as string} />
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        members
      </TabPanel>
    </Box>
  );
};

export default Team;
