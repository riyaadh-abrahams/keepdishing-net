import { Box, Center, Heading } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { getClient } from "../shared/services";
import { CurrentUser } from "../store/api/generatedApi";

type HomeProps = {
  user: CurrentUser;
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({ req, res }) => {
  const client = getClient(req.headers.cookie);
  const user = await client.getCurrentUser();
  return {
    props: { user },
  };
};

const Home = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(user.email);
  return (
    <Box>
      {JSON.stringify(user)}
      <Center>
        <Heading>Home</Heading>
        <Link href="/test">
          <a>Go To Test</a>
        </Link>
      </Center>
    </Box>
  );
};

export default Home;
