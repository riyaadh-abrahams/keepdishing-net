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

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password cannot be empty"),
  rememberMe: z.boolean(),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const router = useRouter();
  const [login, error] = api.usePostApiAuthLogInMutation();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    await login({
      loginInput: {
        username: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      },
    }).unwrap();
    return await router.push("/app");
  });

  return (
    <>
      <Head>
        <title>Keepdishing | Login</title>
      </Head>
      <AuthLayout>
        <VStack spacing={8}>
          <Heading>Login</Heading>
          <QueryErrorAlert error={error.error} />
          <Box w="full">
            <form onSubmit={onSubmit}>
              <VStack spacing={4}>
                <FormControl isInvalid={errors.email != null}>
                  <FormLabel>Email</FormLabel>
                  <Input {...register("email")} autoComplete="email" />
                  <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.password != null}>
                  <FormLabel>Password</FormLabel>
                  <PasswordField {...register("password")} autoComplete="password" />
                  <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                </FormControl>
                <Flex w="full" justifyContent="space-between">
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="rememberMe" mb="0">
                      Remember Me
                    </FormLabel>
                    <Switch colorScheme="red" defaultChecked {...register("rememberMe")} id="rememberMe" />
                  </FormControl>
                  <Link
                    onClick={() => {
                      router.push({
                        pathname: "/auth/forgot-password",
                        query: { email: getValues("email") },
                      });
                    }}
                    textAlign="end"
                    w="full"
                  >
                    Forgot Password
                  </Link>
                </Flex>
              </VStack>
              <Button my={10} w="full" isLoading={isSubmitting} type="submit">
                Log in
              </Button>
            </form>
            <Center>
              <Text>
                Need an Account?
                <NextLink href="/auth/signup" passHref>
                  <Link ml="1" textAlign="end" w="full">
                    Sign Up
                  </Link>
                </NextLink>
              </Text>
            </Center>
          </Box>
        </VStack>
      </AuthLayout>
    </>
  );
};

export default Login;
