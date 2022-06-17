import "../styles/globals.css";
import type { AppProps } from "next/app";

import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import { wrapper } from "../store/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default wrapper.withRedux(MyApp);
