import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import type { Function } from "../models/Function";
import { useCreateFunctionForm } from "../hooks/function.hooks";
import FunctionService from "../services/FunctionService";
import router from "next/router";
import { ErrorBox, Fab, Loading, MultiPurposeDialog } from "@components";
import { Grid } from "@mui/material";
import FunctionCard from "./FunctionCard";

export interface FunctionsProps {
  teamId?: string;
}

function Functions(props: FunctionsProps) {
  const { teamId } = props;
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [openDialog, setOpenDialog] = useState(false);
  const [functions, setFunctions] = useState<Function[]>([]);
  const { name, description, private: isPrivate, form } = useCreateFunctionForm();

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      new FunctionService(user)
        .getMyFunctions(teamId)
        .then((response) => {
          setFunctions(response);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(new Error(error));
          setIsLoading(false);
        });
    }
  }, [user]);

  const handleNewFunctionClick = () => {
    setOpenDialog(true);
  };

  const handleSubmitNewFunctionClick = () => {
    setOpenDialog(false);
    if (user) {
      setIsLoading(true);
      new FunctionService(user)
        .create({
          name,
          description,
          private: isPrivate,
          team: teamId,
        })
        .then((func) => {
          setIsLoading(false);
          router.push(`/functions/${func._id}`);
        })
        .catch((error) => {
          setError(new Error(error));
          setIsLoading(false);
        });
    } else {
      // TODO:
    }
  };

  if (error) {
    return <ErrorBox error={error} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Grid container spacing={1}>
      {functions.map((func) => (
        <Grid key={func._id} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FunctionCard function={func} />
        </Grid>
      ))}

      <MultiPurposeDialog
        open={openDialog}
        title="Create New Function"
        onClose={() => setOpenDialog(false)}
        actions={[
          {
            text: "Cancel",
            onClick: () => setOpenDialog(false),
          },
          {
            text: "Submit",
            onClick: handleSubmitNewFunctionClick,
          },
        ]}
      >
        {form}
      </MultiPurposeDialog>

      <Fab onClick={handleNewFunctionClick} />
    </Grid>
  );
}

export default Functions;
