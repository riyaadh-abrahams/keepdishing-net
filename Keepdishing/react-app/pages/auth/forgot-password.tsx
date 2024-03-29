import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Image,
  Text,
  Button,
  Switch,
  Container,
  Box,
  Center,
  VStack,
  Link,
  Heading,
  Flex,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import api from "../../store/api/api";
import { useRouter } from "next/router";
import { PasswordField } from "../../components/PasswordField";
import QueryErrorAlert from "../../components/QueryErrorAlert";
import NextLink from "next/link";
import Head from "next/head";
import AuthLayout from "../../layouts/AuthLayout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const schema = z.object({
  email: z.string().email(),
});
type FormData = z.infer<typeof schema>;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return { props: { email: query?.["email"] ?? "" } };
};

const ResetPassword = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [forgotPassword, data] = api.usePostApiAuthForgotPasswordMutation();
  console.log({ props });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: props.email,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await forgotPassword({
      forgotPasswordInput: {
        email: data.email,
      },
    }).unwrap();
    //return await router.push("/app");
    console.log("Success");
  });

  return (
    <>
      <Head>
        <title>Keepdishing | Reset Password</title>
      </Head>
      <AuthLayout>
        <VStack spacing={8}>
          <Heading>Reset Password</Heading>
          <QueryErrorAlert error={data.error} />

          {data.isSuccess && (
            <Alert py={5} status="success" variant="left-accent">
              <AlertIcon />
              <Text>A password reset link has been sent to your email.</Text>
            </Alert>
          )}

          <Box w="full">
            <form onSubmit={onSubmit}>
              <VStack spacing={4}>
                <FormControl isInvalid={errors.email != null}>
                  <FormLabel>Email</FormLabel>
                  <Input {...register("email")} autoComplete="email" />
                  <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                </FormControl>
              </VStack>
              <Button isDisabled={!data.isUninitialized} my={10} w="full" isLoading={isSubmitting} type="submit">
                Reset Password
              </Button>
            </form>
            <Center>
              <NextLink href="/auth/login" passHref>
                <Link ml="1" textAlign="center" w="full">
                  Back to login
                </Link>
              </NextLink>
            </Center>
          </Box>
        </VStack>
      </AuthLayout>
    </>
  );
};

export default ResetPassword;
