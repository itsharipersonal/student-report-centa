import { useEffect } from "react";
import useRequest from "../../../hooks/use-request";
import Router from "next/router";

export default () => {
  const { doRequest } = useRequest({
    url: "/api/admin/signout",
    method: "post",
    body: {},
    onSuccess: () => Router.push("/admin"),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div>Signing you out</div>;
};

