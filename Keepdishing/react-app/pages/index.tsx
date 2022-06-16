import { Box, Center, Heading } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { client } from "../shared/services";
import axios from "axios";
import { CurrentUser } from "../store/api/generatedApi";

const Home = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log({ user });
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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  //const user = await client.getCurrentUser();
  //var user = req.headers["username"];
  const user = await axios.get<CurrentUser>(
    "http://localhost:5216/api/Auth/GetCurrentUser",
    {
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie ?? "",
      },
    }
  );
  return {
    props: { user: user.data },
  };
};

export default Home;
