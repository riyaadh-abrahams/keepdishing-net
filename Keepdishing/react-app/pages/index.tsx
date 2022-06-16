import { Box, Center, Heading } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";

const Home = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Box>
      {user}
      <Center>
        <Heading>Home</Heading>
        <Link href="/test">
          <a>Go To Test</a>
        </Link>
      </Center>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  var user = context.req.headers["username"];
  return {
    props: { user: user },
  };
};

export default Home;
