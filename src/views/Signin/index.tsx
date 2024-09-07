import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useTokenDispatch } from '@/providers/TokenProvider';
import useSignin from './hooks/useSignin';

const schema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

export default function Signin() {
  const { signin, isLoading } = useSignin();
  const dispatch = useTokenDispatch();
  const navigate = useNavigate();

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
          payload: { access_token: data.data.tokens.access.token },
        });

        navigate('/view-prices');
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
    </div>
  );
}
