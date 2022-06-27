import {
  Container,
  Center,
  Heading,
  Text,
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Switch,
  Button,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  UnorderedList,
  ListItem,
  HStack,
  SimpleGrid,
  Flex,
  Link,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PasswordField } from "../../components/PasswordField";
import QueryErrorAlert from "../../components/QueryErrorAlert";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../../store/api/api";
import { useRouter } from "next/router";
import { useMemo } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import NextLink from "next/link";
import Head from "next/head";

const Signup = () => {
  const router = useRouter();
  const [signup, error] = api.usePostApiAuthSignUpMutation();

  const schema = z
    .object({
      firstName: z.string().min(1, "First Name cannot be empty"),
      surname: z.string().min(1, "Surname cannot be empty"),
      email: z.string().email(),
      password: z.string().min(1, "Password cannot be empty"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"], // path of error
    });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    await signup({
      signupUpInput: {
        firstName: data.firstName,
        surname: data.surname,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      },
    }).unwrap();
    return await router.push("/app");
  });

  return (
    <>
      <Head>
        <title>Keepdishing | Register</title>
      </Head>
      <AuthLayout>
        <VStack spacing={8}>
          <Heading>Signup</Heading>
          <QueryErrorAlert error={error.error} />
          <Box w="full">
            <form onSubmit={onSubmit}>
              <VStack spacing={4}>
                <SimpleGrid gap={3} columns={[1, 2]} w="full">
                  <FormControl isInvalid={errors.firstName != null}>
                    <FormLabel>Name</FormLabel>
                    <Input {...register("firstName")} />
                    <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors.surname != null}>
                    <FormLabel>Surname</FormLabel>
                    <Input {...register("surname")} />
                    <FormErrorMessage>{errors.surname && errors.surname.message}</FormErrorMessage>
                  </FormControl>
                </SimpleGrid>
                <FormControl isInvalid={errors.email != null}>
                  <FormLabel>Email</FormLabel>
                  <Input {...register("email")} />
                  <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.password != null}>
                  <FormLabel>Password</FormLabel>
                  <PasswordField {...register("password")} />
                  <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.confirmPassword != null}>
                  <FormLabel>Confirm Password</FormLabel>
                  <PasswordField {...register("confirmPassword")} />
                  <FormErrorMessage>{errors.confirmPassword && errors.confirmPassword.message}</FormErrorMessage>
                </FormControl>
              </VStack>
              <Flex mt={8} justifyContent="flex-end">
                <Button w="full" isLoading={isSubmitting} type="submit">
                  Sign Up
                </Button>
              </Flex>
            </form>
          </Box>
          <Center>
            <Text>
              Already have an account?{" "}
              <NextLink href="/auth/login" passHref>
                <Link ml="1" textAlign="end" w="full">
                  Log In
                </Link>
              </NextLink>
            </Text>
          </Center>
        </VStack>
      </AuthLayout>
    </>
  );
};

export default Signup;
