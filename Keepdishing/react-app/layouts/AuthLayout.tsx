import { Center, Box, Container, Image, VStack } from "@chakra-ui/react";
import NextLink from "next/link";

type AuthLayoutProps = {
  children: React.ReactNode;
};
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <>
      <Box bg={["white", "inherit"]} py={16}>
        <VStack spacing={[2, 6]} flexDirection="column">
          <NextLink href="/">
            <Image cursor="pointer" w={"15em"} src="/logo.svg" alt="logo" />
          </NextLink>
          <Box w={["full", "xl"]} bg="white" p={[6, 12]} borderRadius="lg" boxShadow={["none", "xl"]}>
            {children}
          </Box>
        </VStack>
      </Box>
    </>
  );
};

export default AuthLayout;
