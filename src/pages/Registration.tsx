import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { z } from "zod";
import { createUserSchema } from "../validations/UserValidations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserService } from "../services/useUserService";

type CreateUserFormData = z.infer<typeof createUserSchema>;

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [registrationType, setRegistrationType] = useState<"student" | "creator">("student");

  const { createUser } = useUserService();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    if (type === "creator") {
      setRegistrationType("creator");
    }
  }, [location.search]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit = async (data: CreateUserFormData) => {
    try {
      const success = await createUser(data, registrationType);
      if (success) {
        navigate("/login");
      } else {
        setErrorMessage("Failed to register. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred during registration.");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-[#711aa0]/90 rounded-[42px] shadow-lg relative p-12 text-white font-['ADLaM Display'] space-y-8">
        <button className="absolute top-5 right-5 w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <span className="w-4 h-4 border-4 border-[#711aa0] rotate-45 block"></span>
        </button>



        <p className="text-xl mb-8 text-center">Welcome, fill in the required fields, please.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="First Name"
                {...register("firstName")}
                className="w-full h-14 bg-white rounded-full px-4 text-[#711aa0] placeholder-[#711aa0] focus:outline-none"
              />
              {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message}</span>}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Last Name"
                {...register("lastName")}
                className="w-full h-14 bg-white rounded-full px-4 text-[#711aa0] placeholder-[#711aa0] focus:outline-none"
              />
              {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message}</span>}
            </div>
          </div>

          <div className="relative space-y-6">
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full h-14 bg-white rounded-full px-4 text-[#711aa0] placeholder-[#711aa0] focus:outline-none"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>

          <div className="relative space-y-6">
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full h-14 bg-white rounded-full px-4 text-[#711aa0] placeholder-[#711aa0] focus:outline-none"
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" className="h-6 w-6 text-[#711aa0]" />
            <span>I agree to join the Skills Circle platform</span>
          </div>

          <p className="text-center text-lg underline cursor-pointer">What is the Skills Circle policy?</p>

          <button
            type="submit"
            className="w-full h-16 bg-[#4a0072] text-2xl rounded-full flex items-center justify-center"
          >
            Joining
          </button>

          <div className="flex justify-center mt-4">
            <p className="text-lg">Already have an account? <span className="underline cursor-pointer">Log in</span></p>
          </div>

          <p className="text-center text-lg mt-4 underline cursor-pointer">joining in with Google</p>
        </form>

        {errorMessage && <div className="text-red-500 text-center mt-4">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default Registration;
