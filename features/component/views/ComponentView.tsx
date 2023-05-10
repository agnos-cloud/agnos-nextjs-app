import React, { useEffect, useState } from "react";
import { Box, Stack, Tab, Tabs, Typography, useTheme } from "@mui/material";
import {
  Architecture as DesignsIcon,
  DataObject as ModelsIcon,
  Groups as CollaboratorsIcon,
  Lock as PrivateIcon,
  Settings as SettingsIcon,
  Storage as DataIcon,
} from "@mui/icons-material";
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import { ErrorBox, Loading, LoginBackdrop, TabPanel } from "@components";
import { useApi } from "@hooks/base";
import ComponentService from "@services/component";
import { Component, ComponentInput, ComponentUpdate } from "@models/component";

export interface ComponentViewProps {
  id: string;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ComponentView = (props: ComponentViewProps) => {
  const { user } = useUser();
  const theme = useTheme();
  const { id } = props;
  const {
    item: component,
    fetchItem: fetchComponent,
    fetchingItem: fetchingComponent,
    fetchingItemError: fetchingComponentError,
  } = useApi<ComponentService, Component, ComponentInput, ComponentUpdate>(ComponentService, user);

  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    fetchComponent(id as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, id]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (!user) {
    return <LoginBackdrop />;
  }

  if (fetchingComponent) {
    return <Loading />;
  }

  if (fetchingComponentError) {
    return <ErrorBox error={fetchingComponentError} />;
  }

  if (!component) {
    return <ErrorBox error={new Error("Could not load component")} />;
  }

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <Stack direction="row" spacing={theme.spacing(2)}>
        <Box sx={{ pt: theme.spacing(1) }}>
          {component.picture && (
            <Image
              src={component.picture}
              alt={component.name}
              width={32}
              height={32}
              style={{ borderRadius: "50%" }}
            />
          )}
        </Box>
        <Stack>
          <Typography variant="body1" color="text.secondary">
            {component.name} <sup>{component.private && <PrivateIcon fontSize="small" sx={{ fontSize: 8 }} />}</sup>
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {component.description}
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
        models
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

export default ComponentView;
