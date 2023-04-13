import { useEffect, useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { ForkRight as VersionsIcon, FlashOn as FunctionsIcon, Notes as LogsIcon } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import { ErrorBox, Loading, LoginBackdrop, TabPanel } from "@components/base";
import FunctionVersions from "../../components/FunctionVersions";
import type { Function } from "../../models/Function";
import FunctionService from "../../services/FunctionService";
import FunctionLogs from "../../components/FunctionLogs";
import FunctionInvocations from "../../components/FunctionInvocations";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const FunctionPage = () => {
  const location = useRouter();
  const { user } = useUser();
  const [func, setFunc] = useState<Function | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const { id } = location.query;

  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (user && id) {
      setIsLoading(true);
      new FunctionService(user)
        .get(id as string)
        .then((response) => {
          setFunc(response);
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

  if (isLoading || !func) {
    return <Loading />;
  }

  if (error) {
    return <ErrorBox error={error} />;
  }

  if (!user) {
    return <LoginBackdrop />;
  }

  // TODO: ensure user has permission to interact with this function

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="body1" color="text.secondary">
        {func?.name}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {func?.description}
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} onChange={handleChange} aria-label="function tabs">
          <Tab label="Versions" icon={<VersionsIcon fontSize="small" />} iconPosition="start" {...a11yProps(0)} />
          <Tab label="Invocations" icon={<FunctionsIcon fontSize="small" />} iconPosition="start" {...a11yProps(1)} />
          <Tab label="Console Logs" icon={<LogsIcon fontSize="small" />} iconPosition="start" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <FunctionVersions functionId={id as string} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <FunctionInvocations functionId={id as string} />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <FunctionLogs functionId={id as string} />
      </TabPanel>
    </Box>
  );
};

export default FunctionPage;
