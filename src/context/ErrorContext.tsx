import { createContext, useContext, ReactNode } from 'react';
import { toast } from 'react-toastify';

// Define custom error types
class ValidationError extends Error {}
class AuthorizationError extends Error {}
class ServerError extends Error {}

interface ErrorContextType {
  setError: (error: ValidationError | AuthorizationError | ServerError | Error | unknown) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const setError = (error: ValidationError | AuthorizationError | ServerError | Error | unknown) => {
    let message = 'An unexpected error occurred.';
    let displayType: 'inline' | 'toast' = 'toast'; // Default to show as toast

    if (error instanceof ValidationError) {
      message = error.message;
      displayType = 'inline'; // Show inline for validation errors
    } else if (error instanceof AuthorizationError || error instanceof ServerError) {
      message = error.message || 'A server error occurred.';
    } else if (error instanceof Error) {
      // Fallback for other types of errors that are instances of Error
      message = error.message;
    } else if (typeof error === 'string') {
      // If it's a string, use it as the message
      message = error;
    } else if (typeof error === 'object') {
      // If it's an object, you might want to stringify it
      message = JSON.stringify(error);
    }


    if (displayType === 'toast') {
      toast.error(message); // Show as toast
    } else {
      console.error('Inline error:', message); // Log inline error
    }
  };

  return (
    <ErrorContext.Provider value={{ setError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useErrorContext = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useErrorContext must be used within an ErrorProvider');
  }
  return context;
};
