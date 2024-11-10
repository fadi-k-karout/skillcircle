import { userApi } from '../api/userApi'; // Assuming userApi is imported correctly
import { CreateUserDto, UpdateUserProfileDto, UpdatePasswordDto, ResetPasswordDto, UserDetailsDto } from '../dtos/UserDtos'; // Your DTOs should be imported here
import { useErrorContext } from '../context/ErrorContext';
type Result<T> = {
  success: boolean;
  data: T | null;
};

export const useUserService = () => {
  const { setError } = useErrorContext();

  // Create user
  const createUser = async (data: CreateUserDto, userType: 'student' | 'creator'): Promise<boolean> => {
    try {
      let result: Result<null>;

      if (userType === 'student') {
        result  = await userApi.createUser(data);
      } else {
        result = await userApi.createInstructor(data);
      }
     
      return result.success;
    } catch (error) {
      setError(error);  // Pass the error to the ErrorContext for centralized handling
      return false;
    }
  };



  // Update user profile
  const updateUserProfile = async (data: UpdateUserProfileDto): Promise<boolean> => {
    try {
      const result: Result<null> = await userApi.updateUserProfile(data);
      return result.success;
    } catch (error) {
      setError(error);  // Handle the error via the ErrorContext
      return false;
    }
  };

  // Upload profile photo
  const uploadProfilePhoto = async (userId: string, formData: FormData): Promise<Result<{ photoUrl: string }>> => {
    try {
      const result: Result<{ photoUrl: string }> = await userApi.uploadProfilePhoto(userId, formData);
      return result;
    } catch (error) {
      setError(error);  // Handle the error via the ErrorContext
      return { success: false, data: null };
    }
  };

  // Change password
  const changePassword = async (data: UpdatePasswordDto): Promise<boolean> => {
    try {
      const result: Result<null> = await userApi.changePassword(data);
      return result.success;
    } catch (error) {
      setError(error);  // Handle the error via the ErrorContext
      return false;
    }
  };

  // Generate password reset token
  const generatePasswordResetToken = async (email: string): Promise<boolean> => {
    try {
      const result: Result<null> = await userApi.generatePasswordResetToken(email);
      return result.success;
    } catch (error) {
      setError(error);  // Handle the error via the ErrorContext
      return false;
    }
  };

  // Reset password
  const resetPassword = async (data: ResetPasswordDto): Promise<boolean> => {
    try {
      const result: Result<null> = await userApi.resetPassword(data);
      return result.success;
    } catch (error) {
      setError(error);  // Handle the error via the ErrorContext
      return false;
    }
  };

  // Send email verification
  const sendEmailVerification = async (email: string): Promise<boolean> => {
    try {
      const result: Result<null> = await userApi.sendEmailVerification(email);
      return result.success;
    } catch (error) {
      setError(error);  // Handle the error via the ErrorContext
      return false;
    }
  };

  // Confirm email
  const confirmEmail = async (email: string, token: string): Promise<boolean> => {
    try {
      const result: Result<string> = await userApi.confirmEmail(email, token);
      return result.success;
    } catch (error) {
      setError(error);  // Handle the error via the ErrorContext
      return false;
    }
  };

  // Get user details
  const getUserDetails = async (userId: string): Promise<Result<UserDetailsDto>> => {
    try {
      const result: Result<UserDetailsDto> = await userApi.getUserDetails(userId);
      return result;
    } catch (error) {
      setError(error);  // Handle the error via the ErrorContext
      return { success: false, data: null };
    }
  };

  // Deactivate user
  const deactivateUser = async (userId: string): Promise<boolean> => {
    try {
      const result: Result<null> = await userApi.deactivateUser(userId);
      return result.success;
    } catch (error) {
      setError(error);  // Handle the error via the ErrorContext
      return false;
    }
  };

  // Activate user
  const activateUser = async (userId: string): Promise<boolean> => {
    try {
      const result: Result<null> = await userApi.activateUser(userId);
      return result.success;
    } catch (error) {
      setError(error);  // Handle the error via the ErrorContext
      return false;
    }
  };

  return {
    createUser,
    updateUserProfile,
    uploadProfilePhoto,
    changePassword,
    generatePasswordResetToken,
    resetPassword,
    sendEmailVerification,
    confirmEmail,
    getUserDetails,
    deactivateUser,
    activateUser,
  };
};
