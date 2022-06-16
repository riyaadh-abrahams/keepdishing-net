import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import api from "../store/api/api";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { data, isFetching, refetch } = api.useGetWeatherForecastQuery();
  const { data: user } = api.useGetApiAuthGetCurrentUserQuery();
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
        <h1 className={styles.title}>Welcome to .Net</h1>

        {user ? (
          <div>
            <p>Logged in: {user.email} </p>

            <button onClick={() => logout()}>Logout</button>
          </div>
        ) : (
          <p className={styles.description}>
            No Logged in :{" "}
            <button
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
            </button>
          </p>
        )}
        <button disabled={!user} onClick={refetch}>
          Refetch
        </button>
        <p style={{ textAlign: "center" }}>{JSON.stringify(data)}</p>
      </main>
    </div>
  );
};

export default Home;
