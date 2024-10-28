'use client';

import * as z from 'zod';
import Spinner from '@/Components/Spinner/Spinner';
import { loginSchema } from '@/validation/loginSchema';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useToast } from '@chakra-ui/react';

type LoginFormType = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormType>({ resolver: zodResolver(loginSchema) });

  const router = useRouter();
  const toast = useToast();

  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const onSubmit = (data: LoginFormType) => {
    setIsButtonLoading(true);
    if (
      (data.email === 'sayf@mgt.com' && data.password === 'Sayfmgt@1234') ||
      (data.email === 'thomas.hampf@gmx.de' && data.password === 'Thomas@1234')
    ) {
      setIsButtonLoading(false);
      toast({
        title: 'Login successful',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
      router.push('/dashboard/clients');
    } else {
      toast({
        title: 'Email or password does not exist.',
        description: 'You might using the worng credentials.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      setIsButtonLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col w-full mt-28"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="text-primary text-h4">Login to MGT!</p>
      <div className="form-control w-full max-w-sm mb-4">
        <label className="label">
          <span className="label-text text-accent">Email Address *</span>
        </label>
        <input
          type="text"
          id="email"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          // disabled={isLoading}
          {...register('email')}
          placeholder="e.g.samule@smith.com"
          className="input w-full max-w-sm bg-base-200"
        />
        {errors?.email && (
          <p className="px-1 mt-2 text-xs text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="form-control w-full max-w-sm mb-4">
        <label className="label text-accent">
          <span className="label-text">Password *</span>
        </label>
        <input
          id="password"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          // disabled={isLoading}
          {...register('password')}
          type="password"
          placeholder="****************"
          className="input w-full max-w-sm bg-base-200"
        />
        {errors?.password && (
          <p className="px-1 mt-2 text-xs text-red-600">
            {errors.password.message}
          </p>
        )}
      </div>
      <div className="w-full max-w-sm flex justify-end mb-5">
        <p className="text-accent cursor-pointer">Forgot Password?</p>
      </div>
      <button
        className={`btn btn-primary w-full max-w-sm mb-6 ${
          isButtonLoading && 'btn-disabled'
        }`}
        type="submit"
      >
        {isButtonLoading && <Spinner className="m-3 h-5 w-5" />}
        <span>Sign In</span>
      </button>
    </form>
  );
};

export default LoginForm;
