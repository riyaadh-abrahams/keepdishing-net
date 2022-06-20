import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { z } from "zod";

const errorSchema = z.object({
  status: z.number(),
  data: z.object({
    message: z.string(),
  }),
});

type RTKQueryError = FetchBaseQueryError | SerializedError | undefined;

type QueryErrorAlertProps = {
  error: RTKQueryError;
};
const QueryErrorAlert = ({ error }: QueryErrorAlertProps) => {
  const loginError = errorSchema.safeParse(error);

  return loginError.success ? (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>Oops!</AlertTitle>
      <AlertDescription>{loginError.data.data.message}</AlertDescription>
    </Alert>
  ) : null;
};

export default QueryErrorAlert;
