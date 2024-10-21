import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface SignupForm {
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<SignupForm>();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: SignupForm) => {
    if (data.password !== data.confirmPassword) {
      return;
    }
    try {
      await signup(data.email, data.password);
      navigate('/studio');
    } catch (error) {
      console.error('Failed to sign up', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            id="email"
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="w-full px-3 py-2 border rounded text-black"
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Password</label>
          <input
            id="password"
            type="password"
            {...register('password', { required: 'Password is required', minLength: 6 })}
            className="w-full px-3 py-2 border rounded text-black"
          />
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block mb-1">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) => value === watch('password') || 'Passwords do not match'
            })}
            className="w-full px-3 py-2 border rounded text-black"
          />
          {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;