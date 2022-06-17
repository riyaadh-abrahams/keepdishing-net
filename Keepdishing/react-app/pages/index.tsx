import { Box, Center, Heading } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { getClient } from "../shared/services";
import api from "../store/api/api";
import { CurrentUser } from "../store/api/generatedApi";
import { wrapper } from "../store/store";

type HomeProps = {
  user: CurrentUser;
};

// export const getServerSideProps: GetServerSideProps<HomeProps> = async ({ req, res }) => {
//   const client = getClient(req.headers.cookie);
//   const user = await client.getCurrentUser();
//   return {
//     props: { user },
//   };
// };

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
  const client = getClient(req.headers.cookie);
  const user = await client.getCurrentUser();

  store.dispatch(api.endpoints.getApiAuthGetCurrentUser.initiate());
  await Promise.all(api.util.getRunningOperationPromises());
  console.log(store.getState().api.queries);

  return {
    props: {},
  };
});

const Home = () => {
  return (
    <Box>
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
