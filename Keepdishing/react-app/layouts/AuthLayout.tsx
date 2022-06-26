import { Center, Box, Container, Image } from "@chakra-ui/react";
import NextLink from "next/link";

type AuthLayoutProps = {
  children: React.ReactNode;
};
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Container pt={10}>
      <Center w="full" h="full" flexDirection="column">
        <NextLink href="/">
          <Image cursor="pointer" w={"15em"} mb={8} src="/logo.svg" alt="logo" />
        </NextLink>
        <Box bg="white" p={12} borderRadius="lg" boxShadow="xl">
          {children}
        </Box>
      </Center>
    </Container>
  );
};

export default AuthLayout;
