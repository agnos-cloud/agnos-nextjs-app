import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { ReactFlowProvider } from "react-flow-renderer";
import Loading from "../../components/Loading";
import ErrorBox from "../../components/ErrorBox";
import LoginBackdrop from "../../components/LoginBackdrop";
import Canvas from "../../components/Canvas";
import type { Design } from "../../models/Design";
import DesignService from "../../services/DesignService";

const Designer = () => {
  const location = useRouter();
  const { user } = useUser();
  const [design, setDesign] = useState<Design | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const { id } = location.query;

  useEffect(() => {
    if (user && id) {
      setIsLoading(true);
      new DesignService(user)
        .get(id as string)
        .then((response) => {
          setDesign(response);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(new Error(error));
          setIsLoading(false);
        });
    }
  }, [user, id]);

  if (isLoading || !design) {
    return <Loading />;
  }

  if (error) {
    return <ErrorBox error={error} />;
  }

  if (!user) {
    return <LoginBackdrop />;
  }

  return (
    <ReactFlowProvider>
      <Canvas design={design} user={user} />
    </ReactFlowProvider>
  );
};

export default Designer;
