import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const schema = Yup.object({
  password: Yup.string().required(),
  passwordConfirm: Yup.string().oneOf([Yup.ref('password'), ''], 'Passwords must match'),
});

export default function ResetPassword() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = ({ passwordConfirm, ...rest }: Yup.InferType<typeof schema>) => {
    console.log(rest);
  };

  return (
    <div className="p-5 flex flex-col min-h-screen bg-white">
      <h1 className="text-[16px] font-[500] mb-8">Set New Password</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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

        <div className="mt-6">
          <Button fullWidth>Set Password</Button>
        </div>
      </form>
    </div>
  );
}
