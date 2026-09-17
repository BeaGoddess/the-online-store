const apiURL = (url: string) => `https://dummyjson.com${url}`;

interface ApiFetchOptions {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: Record<string, unknown>;
}

interface ApiFetchResponse<T> {
  data: T;
  headers: Headers;
}

export const apiFetch = async <T>({
  path,
  method = "GET",
  body,
}: ApiFetchOptions): Promise<ApiFetchResponse<T>> => {
  const response = await fetch(apiURL(path), {
    method,
    headers: {
      ...(body && { "Content-Type": "application/json" }),
    },
    ...(body && { body: JSON.stringify(body) }),
  });
  return await handleResponse(response);
};

const handleResponse = async <T>(
  response: Response,
): Promise<ApiFetchResponse<T>> => {
  if (!response.ok) {
    const errorMessage = await getErrorMessage(response);
    throw new Error(errorMessage);
  }
  return parseResponseData<T>(response);
};

const parseResponseData = async <T>(
  response: Response,
): Promise<ApiFetchResponse<T>> => {
  const contentType = response.headers.get("Content-Type") || "";
  const isJson = contentType.includes("application/json");
  const data = (isJson ? await response.json() : await response.text()) as T;
  return { data, headers: response.headers };
};

const getErrorMessage = async (response: Response): Promise<string> => {
  const defaultErrorMessage = "Something went wrong";
  const unexpectedErrorMessage = "An unexpected server error occurred.";

  try {
    const text = await response.text();
    try {
      const errorData = JSON.parse(text);
      return (
        errorData.message || errorData.error || text || defaultErrorMessage
      );
    } catch {
      return text || defaultErrorMessage;
    }
  } catch {
    return unexpectedErrorMessage;
  }
};
