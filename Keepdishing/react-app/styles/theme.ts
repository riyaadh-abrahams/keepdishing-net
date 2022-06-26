import { extendTheme } from "@chakra-ui/react";
import components from "./componentStyles";

const colors = {
  brand: {
    ocean: "#000e2e",
    fire: "#ff4a4a",
    paper: "#F5F2F7",
    link: "#007bff",
  },
  blue: {
    "50": "#E5EDFF",
    "100": "#B8CDFF",
    "200": "#8AADFF",
    "300": "#5C8DFF",
    "400": "#2E6EFF",
    "500": "#004EFF",
    "600": "#003ECC",
    "700": "#002F99",
    "800": "#001F66",
    "900": "#001033",
  },
  red: {
    "50": "#FFE5E5",
    "100": "#FFB8B8",
    "200": "#FF8A8A",
    "300": "#FF5C5C",
    "400": "#FF2E2E",
    "500": "#FF0000",
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
