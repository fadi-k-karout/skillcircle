// src/pages/Login.tsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { loginSchema } from '../validations/UserValidations';
import { z } from 'zod';

const backendUrl = import.meta.env.BACKEND_URL;

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateFields = () => {
    try {
      loginSchema.parse({ email, password });
      setErrors({});
    } catch (err: unknown) {
      if (err instanceof z.ZodError) {
        const newErrors: { email?: string; password?: string } = {};
        err.errors.forEach((e) => {
          const key = e.path[0] as keyof typeof newErrors;
          newErrors[key] = e.message;
        });
        setErrors(newErrors);
      }
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${backendUrl}/api/auth/external-login`;
  };

  return (
    <div className="w-[730px] h-[653px] bg-[#711aa0] relative mx-auto mt-20 rounded-lg p-8 shadow-lg text-white font-['ADLaM Display']">
      <div className="text-4xl font-normal mb-8">Welcome back, log in, please</div>
      
      <form onSubmit={handleLogin} className="space-y-6">
        {/* Email Input */}
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateFields();
            }}
            placeholder="Email"
            className="w-full px-6 py-2 rounded-[25px] bg-white text-[#711aa0] text-xl outline-none"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password Input */}
        <div className="relative">
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validateFields();
            }}
            placeholder="Password"
            className="w-full px-6 py-2 rounded-[25px] bg-white text-[#711aa0] text-xl outline-none"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Remember Me */}
        <div className="flex items-center space-x-2 mt-4">
          <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
            <input type="checkbox" className="w-4 h-4 opacity-0" />
          </div>
          <span className="text-2xl">Remember me</span>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={Object.keys(errors).length > 0}
          className="w-[300px] py-3 mt-6 bg-[#278FD0] text-white text-2xl font-normal rounded-lg mx-auto block"
        >
          log in
        </button>
      </form>

      {/* Forgot Password */}
      <div className="flex justify-center mt-6">
        <Link to="/forgot-password" className="text-2xl">
          Forgot your password?
        </Link>
      </div>

      {/* Join Now */}
      <div className="flex justify-center mt-6">
        <span className="text-2xl">Don't have an account?</span>
        <Link to="/signup" className="ml-2 text-[28.67px]">
          Join now
        </Link>
      </div>

      {/* Google Login */}
      <button
        onClick={handleGoogleLogin}
        className="mt-8 mx-auto text-2xl text-white flex items-center justify-center space-x-2"
      >
        log in with Google
      </button>

      {/* Close Button */}
      <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center">
        <div className="w-6 h-[2px] bg-[#711aa0] transform rotate-45 absolute"></div>
        <div className="w-6 h-[2px] bg-[#711aa0] transform -rotate-45 absolute"></div>
      </div>
    </div>
  );
};

export default Login;
