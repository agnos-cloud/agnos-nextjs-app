import { useEffect, useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import {
  MergeType as VersionsIcon,
  FlashOn as FunctionsIcon,
  Notes as LogsIcon,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import LoginBackdrop from "../../components/LoginBackdrop";
import TabPanel from "../../components/TabPanel";
import FunctionVersions from "../../components/FunctionVersions";
import type { Function } from "../../models/Function";
import FunctionService from "../../services/FunctionService";
import Loading from "../../components/Loading";
import ErrorBox from "../../components/ErrorBox";

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
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="function tabs"
        >
          <Tab
            label="Versions"
            icon={<VersionsIcon fontSize="small" />}
            iconPosition="start"
            {...a11yProps(0)}
          />
          <Tab
            label="Invocations"
            icon={<FunctionsIcon fontSize="small" />}
            iconPosition="start"
            {...a11yProps(1)}
          />
          <Tab
            label="Console Logs"
            icon={<LogsIcon fontSize="small" />}
            iconPosition="start"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <FunctionVersions functionId={id as string} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        invocations
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        console logs
      </TabPanel>
    </Box>
  );
};

export default FunctionPage;

/**
 * move what is currently on this page to <FunctionVersions />
 *  when a row is clicked show multipurpose dialog to view version or allow editing of version (if it's not published)
 *
 * create <FunctionInvocations /> which will contain:
 *  a small label showing total successful invocations and total failed invocations (ever)
 *  filter to be able to filter by version, invocation result type (succeeded/failed), env (test/production), a time range to consider
 *  a card showing total successful invocations and/or total failed invocations for the filtered versions, invocation types and time range
 *  a card next to that showing a graph of invocations vs datetime, color-code according to type
 *      clicking on a datetime on the graph should take you to that date time on the table below
 *  a table below with columns: datetime | env | invocation type | version | summary of result or error
 *      the rows of the table will be color-coded according to the invocation type
 *      when a row is clicked show context/sandbox, result or error details
 *
 * create <FunctionConsole />
 *  filter by version, log type (info/warning/error), env (test/production), a time range to consider
 *  a card showing graph of logs vs datetime, color-coded according to type
 *      clicking on a datetime on the graph should take you to that date time on the table below
 *  a table below with columns: datetime | env | log type | version | summary of log data
 *      the rows of the table will be color-coded according to the log type
 *      when a row is clicked show log data details
 */
