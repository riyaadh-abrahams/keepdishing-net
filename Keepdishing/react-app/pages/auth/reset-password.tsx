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
} from "@chakra-ui/react";
import api from "../../store/api/api";
import { useRouter } from "next/router";
import { PasswordField } from "../../components/PasswordField";
import QueryErrorAlert from "../../components/QueryErrorAlert";
import NextLink from "next/link";
import Head from "next/head";
import AuthLayout from "../../layouts/AuthLayout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const schema = z
  .object({
    password: z.string().min(1, "Password cannot be empty"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });

type FormData = z.infer<typeof schema>;

const ResetPassword = () => {
  const router = useRouter();
  const [resetPassword, error] = api.usePostApiAuthResetPasswordMutation();
  const token = (router.query.token || "").toString();
  const email = (router.query.email || "").toString();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    await resetPassword({
      resetPasswordInput: {
        token,
        email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      },
    }).unwrap();
    console.log(error);
    console.log("success");
    //return await router.push("/app");
  });

  return (
    <>
      <Head>
        <title>Keepdishing | Reset Password</title>
      </Head>
      <AuthLayout>
        <VStack spacing={8}>
          <Heading>Reset Password</Heading>
          <QueryErrorAlert error={error.error} />
          <Box w="full">
            <form onSubmit={onSubmit}>
              <VStack spacing={4}>
                <FormControl isInvalid={errors.password != null}>
                  <FormLabel>New Password</FormLabel>
                  <PasswordField {...register("password")} />
                  <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.confirmPassword != null}>
                  <FormLabel>Confirm Password</FormLabel>
                  <PasswordField {...register("confirmPassword")} />
                  <FormErrorMessage>{errors.confirmPassword && errors.confirmPassword.message}</FormErrorMessage>
                </FormControl>
              </VStack>
              <Button my={10} w="full" isLoading={isSubmitting} type="submit">
                Reset Password
              </Button>
            </form>
          </Box>
        </VStack>
      </AuthLayout>
    </>
  );
};

export default ResetPassword;
