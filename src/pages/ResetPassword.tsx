// src/pages/ResetPassword.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema} from "../validations/UserValidations";
import { useUserService } from "../services/useUserService";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {z} from "zod";
import { ResetPasswordDto } from "../dtos/UserDtos";

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;


const ResetPassword: React.FC = () => {
  const { resetPassword } = useUserService();
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize navigate function
  
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token,
      email,
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordDto) => {
    const success = await resetPassword(data);
    if (success) {
        setMessage("Password reset successfully.");
        setTimeout(() => navigate("/login"), 2000); // Redirect to login after a delay
      } else {
        setMessage("Failed to reset password.");
      }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input type="hidden" {...register("token")} />
          <input type="hidden" {...register("email")} />
        </div>
        <div>
          <input
            type="password"
            placeholder="New Password"
            {...register("newPassword")}
          />
          {errors.newPassword && <p>{errors.newPassword.message}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm New Password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
