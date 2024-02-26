import { GraphQLFormattedError } from "graphql";
import { json } from "stream/consumers";

const customFetch = async (url: string, options: RequestInit) => {
  const accessToken = localStorage.getItem("access_token");

  const headers = options.headers as Record<string, string>;

  return await fetch(url, {
    ...options,
    headers: {
      ...headers,
      Authorization: headers?.Authorization || `Bearer ${accessToken}`,
      "content-type": "application/json",
      "Apollo-Require-PreFlight": "true",
    },
  });
};

const getGraphQLErrors = (
  body: Record<"errors", GraphQLFormattedError[] | undefined>
): Error | null => {
  if (!body) {
    return {
      message: "unknown error",
      statusCode: "INTERNAL_SERVER_ERROR",
    };
  }

  if ("error" in body) {
    const errors = body?.errors;

    const messages = errors?.map((error) => error?.message)?.join("");
    const code = errors?.[0]?.extensions?.code

    return {
        message:messages | json.stringify(errors),
        statusCode: code || 500
    }
  }
};