import { ComponentMultiStyleConfig, ComponentSingleStyleConfig } from "@chakra-ui/react";

export const Button: ComponentSingleStyleConfig = {
  baseStyle: {
    fontWeight: "semibold",
    borderRadius: "md",
  },
  variants: {
    solid: {
      px: 12,
      py: 6,
      shadow: "md",
      color: "white",
    },
  },
  defaultProps: {
    colorScheme: "oceanBlue",
  },
};

export const Link: ComponentSingleStyleConfig = {
  baseStyle: {
    fontWeight: "semibold",
    color: "brand.link",
  },
};

export const Input: ComponentMultiStyleConfig = {
  parts: ["field", "element", "addon"],
  baseStyle: {
    field: {
      py: 6,
    },
    element: {
      py: 6,
    },
    addon: {
      py: 6,
    },
  },
  defaultProps: {
    focusBorderColor: "brand.ocean",
  },
};

const components = {
  Button,
  Link,
  Input,
};

export default components;
