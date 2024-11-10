// src/utils/apiHelpers.ts
export class ValidationError extends Error {}
export class AuthorizationError extends Error {}
export class ServerError extends Error {}

interface ApiResponse {
  status: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}


export const handleApiResponse = (response: ApiResponse) => {
  const { status, data } = response;

  if (status >= 200 && status < 300) {
    return { success: true, data: response.data || null }; // Successful response, return the data
  }

  // Handle errors based on status code
  if (status >= 400 && status < 500) {
    // Client-side errors (e.g., validation, authorization)
    if (status === 400) {
      throw new ValidationError(data.message || 'Validation error occurred');
    } else if (status === 401 || status === 403) {
      throw new AuthorizationError(data.message || 'Unauthorized access');
    } else {
      throw new Error(data.message || 'Client-side error occurred');
    }
  } else if (status >= 500 && status < 600) {
    // Server-side errors
    throw new ServerError(data.message || 'Server error occurred');
  }

  // For any other status codes, throw a general error
  throw new Error(data.message || 'An unknown error occurred');
};
