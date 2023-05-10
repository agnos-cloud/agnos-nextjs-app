import { useUser } from "@auth0/nextjs-auth0";
import { ErrorBox, Loading, LoginBackdrop } from "@components";
import { ComponentsGridView } from "@views/component";
import { useApi } from "@hooks/base";
import { Org, OrgInput, OrgUpdate } from "@models/org";
import OrgService from "@services/org";
import { useEffect } from "react";

export default function List() {
  const { user } = useUser();
  const {
    item: org,
    fetchItem: fetchOrg,
    fetchingItem: fetchingOrg,
    fetchingItemError: fetchingOrgError,
  } = useApi<OrgService, Org, OrgInput, OrgUpdate>(OrgService, user);

  useEffect(() => {
    fetchOrg();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (fetchingOrg) {
    return <Loading />;
  }

  if (fetchingOrgError) {
    return <ErrorBox error={fetchingOrgError} />;
  }

  if (!org) {
    return <ErrorBox error={new Error("Could not load components")} />;
  }

  if (!user) {
    return <LoginBackdrop />;
  }

  return <ComponentsGridView org={org._id} />;
}
