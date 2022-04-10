import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import router from "next/router";
import { ReactFlowProvider } from "react-flow-renderer";
import { LOGIN_PATH } from "../../constants/paths";
import Loading from "../../components/Loading";
import ErrorBox from "../../components/ErrorBox";

const Designer = () => {
  const location = useRouter();
  const { user, error, isLoading } = useUser();

  const { id } = location.query;

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorBox error={error} />;
  }

  // if (!user) {
  //   router.push(LOGIN_PATH);
  // }

  return (
    <ReactFlowProvider>
      <p>Design: {id}</p>
    </ReactFlowProvider>
  );
};

export default Designer;
