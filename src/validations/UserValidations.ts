// src/validations/UserValidations.ts
import { z } from 'zod';

// Password validation rules: at least 8 characters, one uppercase, one lowercase, one digit, and one special character
export const passwordValidationSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[\W_]/, 'Password must contain at least one special character (e.g., !@#$%^&)');

// Confirm password schema that ensures the two password fields match
export const resetPasswordSchema = z
  .object({
    newPassword: passwordValidationSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    token: z.string(),
    email: z.string().email(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // this will mark the confirmPassword field with the error
  });

// Validation schema for user login
export const loginSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .min(1, 'Email is required'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .min(1, 'Password is required'),
});



// Validation schema for user registration
export const registrationSchema = z
  .object({
    email: z
      .string()
      .email('Invalid email address')
      .min(1, 'Email is required'),

    password: passwordValidationSchema,

    confirmPassword: z
      .string()
      .min(1, 'Please confirm your password'),

    firstName: z
      .string()
      .max(50, 'First name must be at most 50 characters')
      .min(1, 'First name is required'),

    lastName: z
      .string()
      .max(50, 'Last name must be at most 50 characters')
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
  
// Add more schemas if needed for other user-related actions
export const createUserSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});