import "../styles/globals.css";
import {store} from "../app/store"
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
