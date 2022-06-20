import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Switch,
  Container,
  Box,
  Center,
  VStack,
  Heading,
} from "@chakra-ui/react";
import api from "../../store/api/api";
import { useRouter } from "next/router";
import { PasswordField } from "../../components/PasswordField";
import QueryErrorAlert from "../../components/QueryErrorAlert";

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

  const onSubmit = handleSubmit((data) => {
    login({
      loginInput: {
        username: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      },
    })
      .unwrap()
      .then(() => router.push("/"));
  });

  return (
    <Container h="100vh">
      <Center w="full" h="full" flexDirection="column">
        <Heading mb={5}>Login</Heading>
        <QueryErrorAlert error={error.error} />
        <Box w="full">
          <form onSubmit={onSubmit}>
            <VStack>
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
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="rememberMe" mb="0">
                  Remember Me
                </FormLabel>
                <Switch defaultChecked {...register("rememberMe")} id="rememberMe" />
              </FormControl>
            </VStack>
            <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Center>
    </Container>
  );
};

export default Login;
