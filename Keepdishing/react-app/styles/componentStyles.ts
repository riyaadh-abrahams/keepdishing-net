import { ComponentSingleStyleConfig } from "@chakra-ui/react";

export const Button: ComponentSingleStyleConfig = {
  baseStyle: {
    fontWeight: "semibold",
    textTransform: "uppercase",
    borderRadius: "md",
  },
  variants: {
    solid: {
      backgroundColor: "brand.ocean",
      color: "white",
      _hover: {
        backgroundColor: "blue.800",
      },
      _focus: {
        backgroundColor: "blue.800",
      },
    },
  },
};

const components = {
  Button,
};

export default components;
