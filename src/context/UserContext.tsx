// src/context/UserContext.tsx
import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react";
import { useUserService } from "../services/useUserService";
import { UserDetailsDto } from "../dtos/UserDtos";
import { useAuth } from "./AuthContext";
import { authService } from "../services/authService";

import { jwtDecode } from "jwt-decode";

interface UserContextType {
  user: UserDetailsDto | null;
  updateUser: (data: UserDetailsDto) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [user, setUser] = useState<UserDetailsDto | null>(null);
  const { isAuthenticated } = useAuth();

  const {getUserDetails} = useUserService();

  // Define fetchUserData outside of useEffect to avoid including it in the dependency array
  const fetchUserData = useCallback(async () => {
    if (isAuthenticated) {
      const token = authService.getToken();
      const userId = decodeuserId(token!);
      if (userId) {
        // Only proceed if userId is successfully decoded
        try {
          const result = await getUserDetails(userId);
          const userData = result.data // Fetch user details from API
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      } else {
        console.error("Failed to decode userId from token.");
      }
    }
  }, [isAuthenticated]); // Only depend on isAuthenticated

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData(); // Fetch user data only if the user is authenticated
    }
  }, [isAuthenticated, fetchUserData]); // Now fetchUserData is stable due to useCallback

  const updateUser = (data: UserDetailsDto) => {
    setUser(data);
  };

  // Decode the token and handle any errors during decoding
  const decodeuserId = (token: string): string | null => {
    try {
      const decodedToken = jwtDecode<{ sub: string }>(token);
      return decodedToken?.sub || null; // Return userId from 'sub' claim, or null if not found
    } catch (error) {
      console.error("Error decoding token:", error);
      return null; // Return null if the token cannot be decoded
    }
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export { UserContext };
