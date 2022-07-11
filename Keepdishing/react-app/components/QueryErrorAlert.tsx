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

const validationErrorSchema = z.object({
  status: z.number(),
  data: z.object({
    type: z.string(),
    title: z.string(),
    status: z.number(),
    traceId: z.string(),
    errors: z.object({}).catchall(z.array(z.string())),
  }),
});

const problemDetailsErrorSchema = z.object({
  status: z.number(),
  data: z.object({
    type: z.string(),
    title: z.string(),
    status: z.number(),
    traceId: z.string(),
  }),
});

type RTKQueryError = FetchBaseQueryError | SerializedError | undefined;

type QueryErrorAlertProps = {
  error: RTKQueryError;
};
const QueryErrorAlert = ({ error }: QueryErrorAlertProps) => {
  const problemDetailsError = problemDetailsErrorSchema.safeParse(error);
  return (
    <Box>
      <SingleErrorAlert error={error} />
      <SignupQueryErrorAlert error={error} />
      <ProblemDetailsErrorAlert error={error} />
      <ValidationQueryErrorAlert error={error} />
    </Box>
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

const ProblemDetailsErrorAlert = ({ error }: QueryErrorAlertProps) => {
  const problemDetailsError = problemDetailsErrorSchema.safeParse(error);

  return problemDetailsError.success ? (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>Oops!</AlertTitle>
      <AlertDescription>{problemDetailsError.data.data.title}</AlertDescription>
    </Alert>
  ) : null;
};

const SignupQueryErrorAlert = ({ error }: QueryErrorAlertProps) => {
  const signupError = signupErrorSchema.safeParse(error);

  return signupError.success ? (
    <Box my={3} bg="red.100" w="full" p={5}>
      <UnorderedList w="full">
        {signupError.data.data.errors.map((error) => (
          <ListItem key={error.code}>{error.description}</ListItem>
        ))}
      </UnorderedList>
    </Box>
  ) : null;
};

const ValidationQueryErrorAlert = ({ error }: QueryErrorAlertProps) => {
  const validationError = validationErrorSchema.safeParse(error);

  return validationError.success ? (
    <Box my={3} bg="blue.100" w="full" p={5}>
      <UnorderedList w="full">
        {Object.values(validationError.data.data.errors)
          .flat()
          .map((error, i) => (
            <ListItem key={i}>{error}</ListItem>
          ))}
      </UnorderedList>
    </Box>
  ) : null;
};

export default QueryErrorAlert;
