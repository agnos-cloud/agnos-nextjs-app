import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import router from "next/router";
import { ReactFlowProvider } from "react-flow-renderer";
import { Box, CircularProgress } from "@mui/material";
import { LOGIN_PATH } from "../../constants/paths";

const Designer = () => {
  const location = useRouter();
  const { user, error, isLoading } = useUser();

  const { id } = location.query;

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!user) {
    router.push(LOGIN_PATH);
  }

  return (<ReactFlowProvider><p>Design: {id}</p></ReactFlowProvider>);
};

export default Designer;
