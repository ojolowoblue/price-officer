import { AxiosError } from 'axios';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useTokenDispatch } from '@/providers/TokenProvider';
import useSignin from './hooks/useSignin';
import { parseError } from '@/libs/error';
import { useToast } from '@/hooks/useToast';
import GoogleSignin from '@/components/ui/GoogleLogin';
import { useUserDispatch } from '@/providers/UserProvider';

const schema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

export default function Signin() {
  const { signin, isLoading } = useSignin();
  const dispatch = useTokenDispatch();
  const dispatchUser = useUserDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (payload: Yup.InferType<typeof schema>) => {
    signin(payload, {
      onSuccess(data) {
        dispatch({
          type: 'SET_TOKENS',
          payload: { access_token: data.data.tokens.access.token, refresh_token: data.data.tokens.refresh.token },
        });

        dispatchUser({ type: 'SET_USER', payload: data.data.user });
        navigate('/view-prices');
      },
      onError(error) {
        const errMsg = error ? parseError(error as AxiosError) : undefined;

        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: errMsg,
        });
      },
    });
  };

  return (
    <div className="p-5 flex flex-col min-h-screen bg-white">
      <h1 className="text-2xl mb-10">Signin to your account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:grid grid-cols-2 gap-4">
        <Input
          placeholder="Email"
          label="Email"
          error={!!errors.email}
          errorMessage={errors.email?.message}
          {...register('email')}
        />
        <Input
          type="password"
          placeholder="*****"
          label="Password"
          error={!!errors.password}
          errorMessage={errors.password?.message}
          {...register('password')}
        />

        <div className="flex items-end">
          <Button disabled={isLoading} loading={isLoading} fullWidth>
            Submit
          </Button>
        </div>
      </form>

      <p className="text-sm my-4">
        Don't have an account?{' '}
        <Link to="/auth/signup" className="text-primary">
          {' '}
          Sign up
        </Link>
      </p>

      <GoogleSignin />
    </div>
  );
}
