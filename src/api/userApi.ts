// src/api/userApi.ts
import axios from 'axios';
import {  CreateUserDto,
  UpdateUserProfileDto,
  UpdatePasswordDto,
  ResetPasswordDto,
  UserDetailsDto, } from '../dtos/UserDtos';
import axiosInstance from '../api/axiosInstance';
import {handleApiResponse} from '../utils/apiHelpers'

type Result<T> = {
  success: boolean;
  data: T | null;
};

export const userApi = {
  // Create user
  createUser: async (data: CreateUserDto): Promise<Result<null>> => {
    const response = await axios.post('/create-student', data);
    return handleApiResponse(response);
  },

  // Create student user
  createStudent: async (data: CreateUserDto): Promise<Result<null>> => {
    const response = await axios.post('/users/create-student', data);
    return handleApiResponse(response);
  },

  // Create instructor user
  createInstructor: async (data: CreateUserDto): Promise<Result<null>> => {
    const response = await axios.post('/users/create-instructor', data);
    return handleApiResponse(response);
  },

  // Update user profile
  updateUserProfile: async (data: UpdateUserProfileDto): Promise<Result<null>> => {
    const response = await axiosInstance.put('/users/update', data);
    return handleApiResponse(response);
  },

  // Upload profile photo
  uploadProfilePhoto: async (userId: string, formData: FormData): Promise<Result<{ photoUrl: string }>> => {
    const response = await axiosInstance.post<{ photoUrl: string }>(
      `/users/${userId}/upload-profile-photo`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return handleApiResponse(response);
  },

  // Change password
  changePassword: async (data: UpdatePasswordDto): Promise<Result<null>> => {
    const response = await axiosInstance.post('/users/change-password', data);
    return handleApiResponse(response);
  },

  // Generate password reset token
  generatePasswordResetToken: async (email: string): Promise<Result<null>> => {
    const response = await axiosInstance.post('/users/generate-password-reset-token', { email });
    return handleApiResponse(response);
  },

  // Reset password
  resetPassword: async (data: ResetPasswordDto): Promise<Result<null>> => {
    const response = await axios.post('/users/reset-password', data);
    return handleApiResponse(response);
  },

  // Send email verification
  sendEmailVerification: async (email: string): Promise<Result<null>> => {
    const response = await axiosInstance.post('/users/send-email-verification', { email });
    return handleApiResponse(response);
  },

  // Confirm email
  confirmEmail: async (email: string, token: string): Promise<Result<string>> => {
    const response = await axios.post('users/confirm-email', { email, token });
    return handleApiResponse(response);
  },

  // Get user details
  getUserDetails: async (userId: string): Promise<Result<UserDetailsDto>> => {
    const response = await axiosInstance.get<UserDetailsDto>(`/users/${userId}`);
    return handleApiResponse(response);
  },

  // Deactivate user
  deactivateUser: async (userId: string): Promise<Result<null>> => {
    const response = await axiosInstance.put(`/users/${userId}/deactivate`);
    return handleApiResponse(response);
  },

  // Activate user
  activateUser: async (userId: string): Promise<Result<null>> => {
    const response = await axiosInstance.put(`/users/${userId}/activate`);
    return handleApiResponse(response);
  },
};
