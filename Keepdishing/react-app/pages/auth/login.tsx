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
  Text,
  Switch,
  Container,
  Box,
  Center,
  VStack,
  Heading,
} from "@chakra-ui/react";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password cannot be empty"),
  rememberMe: z.boolean(),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <Container h="100vh">
      <Center w="full" h="full" flexDirection="column">
        <Heading mb={5}>Login</Heading>
        <Box w="full">
          <form onSubmit={handleSubmit((d) => console.log(d))}>
            <VStack>
              <FormControl isInvalid={errors.email}>
                <FormLabel>Email</FormLabel>
                <Input {...register("email")} />
                <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password}>
                <FormLabel>Password</FormLabel>
                <Input {...register("password")} />
                <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
              </FormControl>
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="rememberMe" mb="0">
                  Remember Me
                </FormLabel>
                <Switch {...register("rememberMe")} id="rememberMe" />
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
