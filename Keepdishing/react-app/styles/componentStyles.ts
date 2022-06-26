import { ComponentSingleStyleConfig } from "@chakra-ui/react";

//shadow="md" fontFamily="Poppins" px={12}
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
