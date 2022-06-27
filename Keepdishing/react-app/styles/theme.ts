import { extendTheme } from "@chakra-ui/react";
import components from "./componentStyles";

const colors = {
  brand: {
    ocean: "#000e2e",
    fire: "#ff4a4a",
    paper: "#F5F2F7",
    link: "#007bff",
  },
  oceanBlue: {
    "50": "#6692ff",
    "100": "#003ac6",
    "200": "#002fa0",
    "300": "#00247a",
    "400": "#001954",
    "500": "#000e2e",
    "600": "#001954",
    "700": "#00247a",
    "800": "#002fa0",
    "900": "#003ac6",
  },
  red: {
    "50": "#FFE5E5",
    "100": "#FFB8B8",
    "200": "#FFB8B8",
    "300": "#FF8A8A",
    "400": "#FF5C5C",
    "500": "#ff4a4a",
    "600": "#CC0000",
    "700": "#990000",
    "800": "#660000",
    "900": "#330000",
  },
};
const fonts = {
  body: "Poppins, sans-serif",
  heading: "Poppins, sans-serif",
};

const styles = {
  global: () => ({
    body: {
      bg: "brand.paper",
    },
  }),
};

const config = { colors, fonts, components, styles };
const theme = extendTheme(config);

export default theme;
