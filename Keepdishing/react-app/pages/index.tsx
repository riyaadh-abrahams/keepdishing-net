import { Box, Button, Center, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { getClient } from "../shared/services";
import api from "../store/api/api";
import { CurrentUser } from "../store/api/generatedApi";
import { wrapper } from "../store/store";

const Home = () => {
  return (
    <SimpleGrid p={8} width="full" height="100vh" columns={[1, 2]}>
      <Center h="full">
        <VStack>
          <Heading>Take your food business to the next level</Heading>
          <HStack>
            <Link href="/auth/login">
              <Button>Get Started</Button>
            </Link>
            <Link href="/test">
              <Button variant="outline">Find out More</Button>
            </Link>
          </HStack>
        </VStack>
      </Center>
      <Box rounded="xl" bg="gray"></Box>
    </SimpleGrid>
  );
};

export default Home;
