import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Stack, Tab, Tabs, Typography, useTheme } from "@mui/material";
import {
  // FlashOn as FunctionsIcon,
  GridViewRounded as ComponentsIcon,
  Group as TeamsIcon,
  Groups as MembersIcon,
  Lan as ProjectsIcon,
  LanOutlined as TemplatesIcon,
  // Power as PluginsIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import { ErrorBox, Loading, LoginBackdrop, TabPanel } from "@components";
import { ComponentsGridView } from "@views/component";
import { ProjectsGridView } from "@views/project";
import { useApi } from "@hooks/base";
import OrgService from "@services/org";
import { Org, OrgInput, OrgUpdate } from "@models/org";

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
  const {
    item: org,
    fetchItem: fetchOrg,
    fetchingItem: fetchingOrg,
    fetchingItemError: fetchingOrgError,
  } = useApi<OrgService, Org, OrgInput, OrgUpdate>(OrgService, user);

  const [tabValue, setTabValue] = useState(0);

  // this hook fetches the org when the id param changes
  useEffect(() => {
    fetchOrg(id as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, id]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (!user) {
    return <LoginBackdrop />;
  }

  if (fetchingOrg) {
    return <Loading />;
  }

  if (fetchingOrgError) {
    return <ErrorBox error={fetchingOrgError} />;
  }

  if (!org) {
    return <ErrorBox error={new Error("Could not load organization")} />;
  }

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <Stack direction="row" spacing={theme.spacing(2)}>
        <Box sx={{ pt: theme.spacing(1) }}>
          {org.picture && (
            <Image src={org.picture} alt={org.name} width={32} height={32} style={{ borderRadius: "50%" }} />
          )}
        </Box>
        <Stack>
          <Typography variant="body1" color="text.secondary">
            {org.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {org.description}
          </Typography>
        </Stack>
      </Stack>
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
            {...a11yProps(2)}
          />
          <Tab
            label="Members"
            icon={<MembersIcon fontSize="small" />}
            iconPosition="start"
            sx={{ fontSize: theme.typography.caption.fontSize }}
            {...a11yProps(3)}
          />
          <Tab
            label="Teams"
            icon={<TeamsIcon fontSize="small" />}
            iconPosition="start"
            sx={{ fontSize: theme.typography.caption.fontSize }}
            {...a11yProps(4)}
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
        <ProjectsGridView org={org._id} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <ComponentsGridView org={org._id} />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        project templates
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        members
      </TabPanel>
      <TabPanel value={tabValue} index={4}>
        teams
      </TabPanel>
      <TabPanel value={tabValue} index={5}>
        settings
      </TabPanel>
    </Box>
  );
};

export default OrgView;
