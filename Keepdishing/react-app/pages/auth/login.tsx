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
    <Container pt={10}>
      <Center w="full" h="full" flexDirection="column">
        <Image w={["80%", "sm"]} mb={8} src="/logo.svg" alt="logo" />
        <Box bg="white" p={12} borderRadius="md" boxShadow="xl">
          <Heading mb={5}>Login</Heading>
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
                    <Switch colorScheme="blue" defaultChecked {...register("rememberMe")} id="rememberMe" />
                  </FormControl>
                  <NextLink href="/auth/signup" passHref>
                    <Link fontWeight="bold" color="brand.link">
                      Register
                    </Link>
                  </NextLink>
                </Flex>
              </VStack>

              <Button mt={16} isLoading={isSubmitting} type="submit">
                Submit
              </Button>
            </form>
          </Box>
        </Box>
      </Center>
    </Container>
  );
};

export default Login;
