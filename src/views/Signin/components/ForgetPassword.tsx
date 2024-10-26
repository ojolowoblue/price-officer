import { useState } from 'react';
import { Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { AxiosError } from 'axios';

import Button from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import Input from '@/components/ui/Input';
import useSendResetEmail from '../hooks/useSendResetEmail';
import { parseError } from '@/libs/error';

const schema = Yup.object({
  email: Yup.string().email().required(),
});

export default function ForgetPassword() {
  const [step, setStep] = useState<'email' | 'confirm'>('email');
  const { sendResetEmail, isLoading } = useSendResetEmail();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = ({ email }: Yup.InferType<typeof schema>) => {
    sendResetEmail(
      { email },
      {
        onSuccess() {
          setStep('confirm');
        },
        onError(error) {
          setError('email', { message: parseError(error as AxiosError) });
        },
      },
    );
  };

  return (
    <div>
      <Dialog onOpenChange={() => setStep('email')}>
        <DialogTrigger type="button" className="text-primary mt-4">
          Forget password?
        </DialogTrigger>

        <DialogContent className="max-w-[375px] px-5" hideClose>
          {step === 'email' && (
            <>
              <DialogHeader className="flex flex-col">
                <DialogTitle className="font-medium text-xl mb-1">Forgot Password</DialogTitle>
                <DialogDescription className="text-muted font-normal leading-[24px]">
                  Fill in your email, we will send you a link to reset your password
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center flex-col gap-16 mt-4">
                <Input
                  type="email"
                  placeholder="Enter Email"
                  label="Email Address"
                  error={!!errors.email}
                  errorMessage={errors.email?.message}
                  {...register('email')}
                />

                <Button loading={isLoading} variant="primary" fullWidth>
                  Reset Password
                </Button>
              </form>
            </>
          )}

          {step === 'confirm' && (
            <>
              <DialogHeader className="flex flex-col items-center py-4">
                <DialogTitle className="mb-5 text-center w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center">
                  <Send className="w-8 text-primary" />
                </DialogTitle>
                <DialogTitle className="font-medium text-xl mb-5 text-center">Email has been sent!</DialogTitle>
                <DialogDescription className="text-muted font-normal leading-[24px] text-center">
                  Please check your email inbox and click the link to reset your password
                </DialogDescription>
              </DialogHeader>

              <div className="flex justify-center flex-col gap-16 mt-4">
                <Button onClick={() => navigate('/auth/reset-password')} variant="primary" fullWidth>
                  Proceed
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
