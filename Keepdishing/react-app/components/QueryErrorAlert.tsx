import { Alert, AlertIcon, AlertTitle, AlertDescription, Box, ListItem, UnorderedList } from "@chakra-ui/react";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { z } from "zod";

const errorSchema = z.object({
  status: z.number(),
  data: z.object({
    message: z.string(),
  }),
});

const signupErrorSchema = z.object({
  status: z.number(),
  data: z.object({
    succeeded: z.boolean(),
    errors: z.array(z.object({ code: z.string(), description: z.string() })),
  }),
});

type RTKQueryError = FetchBaseQueryError | SerializedError | undefined;

type QueryErrorAlertProps = {
  error: RTKQueryError;
};
const QueryErrorAlert = ({ error }: QueryErrorAlertProps) => {
  return (
    <>
      <SingleErrorAlert error={error} />
      <SignupQueryErrorAlert error={error} />
    </>
  );
};
const SingleErrorAlert = ({ error }: QueryErrorAlertProps) => {
  const singleError = errorSchema.safeParse(error);

  return singleError.success ? (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>Oops!</AlertTitle>
      <AlertDescription>{singleError.data.data.message}</AlertDescription>
    </Alert>
  ) : null;
};

const SignupQueryErrorAlert = ({ error }: QueryErrorAlertProps) => {
  const signupError = signupErrorSchema.safeParse(error);

  return signupError.success ? (
    <Box my={3} bg="red.100" w="full" p={8}>
      <UnorderedList w="full">
        {signupError.data.data.errors.map((error) => (
          <ListItem key={error.code}>{error.description}</ListItem>
        ))}
      </UnorderedList>
    </Box>
  ) : null;
};

export default QueryErrorAlert;
