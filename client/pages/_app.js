import buildClient from "../api/build-client";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import store from "../store/store";

import "../styles/global.css";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  const pathname = usePathname();

  return (
    <Provider store={store}>
      <Component currentUser={currentUser} {...pageProps} />
    </Provider>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/admin/currentuser");

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
