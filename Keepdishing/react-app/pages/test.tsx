import { Button } from "@chakra-ui/react";
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { CurrentUser } from "../shared/client";
import { getClient } from "../shared/services";
import api from "../store/api/api";
import { wrapper } from "../store/store";
import styles from "../styles/Home.module.css";

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
  const { data: user, isError, error } = api.useGetApiAuthGetCurrentUserQuery();
  const { data, isFetching, refetch } = api.useGetWeatherForecastQuery();

  const [logout] = api.usePostApiAuthLogoutMutation();
  const [login] = api.usePostApiAuthLogInMutation();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div> {isError ? JSON.stringify(error) : <h1 className={styles.title}>Welcome to .Net</h1>}</div>

        {user ? (
          <div>
            <p>Logged in: {user.email} </p>

            <Button onClick={() => logout()}>Logout</Button>
          </div>
        ) : (
          <p className={styles.description}>
            No Logged in :{" "}
            <Button
              onClick={() =>
                login({
                  loginInput: {
                    username: "riyaadh.abr@gmail.com",
                    password: "Cat.00000",
                    rememberMe: true,
                  },
                })
              }
            >
              Login
            </Button>
          </p>
        )}
        <Button disabled={!user} onClick={refetch}>
          Refetch
        </Button>
        <p style={{ textAlign: "center" }}>{JSON.stringify(data)}</p>
      </main>
    </div>
  );
};

export default Home;
