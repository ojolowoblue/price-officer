import { AxiosError } from 'axios';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import useSignup from './hooks/useSignup';
import { generateUniqueIdentifier } from '@/helpers';
import { useTokenDispatch } from '@/providers/TokenProvider';
import { parseError } from '@/libs/error';
import { useToast } from '@/hooks/useToast';
import GoogleSignin from '@/components/ui/GoogleLogin';

const schema = Yup.object({
  name: Yup.string().required(),
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  passwordConfirm: Yup.string().oneOf([Yup.ref('password'), ''], 'Passwords must match'),
});

export default function Signup() {
  const { signup, isLoading } = useSignup();
  const dispatch = useTokenDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = ({ passwordConfirm, ...rest }: Yup.InferType<typeof schema>) => {
    signup(
      {
        ...rest,
        identifier: generateUniqueIdentifier(),
      },
      {
        onSuccess(data) {
          dispatch({
            type: 'SET_TOKENS',
            payload: { access_token: data.data.tokens.access.token },
          });

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
      },
    );
  };

  return (
    <div className="p-5 flex flex-col min-h-screen bg-white">
      <h1 className="text-[16px] font-[500] mb-8">Sign up to create an account</h1>

      <GoogleSignin text="Sign Up" />

      <div className="flex items-center w-full mt-8 mb-10">
        <div className="border-t border-[#f3f3f3] flex-grow"></div>
        <span className="mx-4 text-muted text-xs">Or</span>
        <div className="border-t border-[#f3f3f3] flex-grow"></div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:grid grid-cols-2 gap-4">
        <Input
          placeholder="Name"
          label="Name"
          error={!!errors.name}
          errorMessage={errors.email?.message}
          {...register('name')}
        />
        <Input
          placeholder="Username"
          label="Username"
          error={!!errors.username}
          errorMessage={errors.username?.message}
          {...register('username')}
        />
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
        <Input
          type="password"
          placeholder="*****"
          label="Confirm Password"
          error={!!errors.passwordConfirm}
          errorMessage={errors.passwordConfirm?.message}
          {...register('passwordConfirm')}
        />
        <div className="flex items-end mt-6">
          <Button loading={isLoading} fullWidth>
            Create Account
          </Button>
        </div>
      </form>

      <p className="text-sm my-5 text-center">
        Already have an account?{' '}
        <Link to="/auth/signin" className="text-primary">
          Log in
        </Link>
      </p>
    </div>
  );
}
