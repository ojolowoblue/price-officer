import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import useSignup from './hooks/useSignup';
import { generateUniqueIdentifier } from '@/helpers';
import { useTokenDispatch } from '@/providers/TokenProvider';

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
          console.log(data.data);
          dispatch({
            type: 'SET_TOKENS',
            payload: { access_token: data.data.data.tokens.access.token },
          });

          navigate("/")
        },
      },
    );
  };

  return (
    <div className="p-5 flex flex-col min-h-screen bg-[#F9FAFB]">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
        <Button disabled={isLoading} loading={isLoading}>
          Submit
        </Button>
      </form>
    </div>
  );
}
