import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

import useGoogleSignin from '@/hooks/useGoogleSignIn';
import { useTokenDispatch } from '@/providers/TokenProvider';
import { parseError } from '@/libs/error';
import { toast } from '@/hooks/useToast';
import Button from './Button';

interface Props {
  text?: string;
}

export default function GoogleSignin({ text }: Props) {
  const navigate = useNavigate();
  const dispatch = useTokenDispatch();

  const { googleSignin } = useGoogleSignin();

  const handleGoogleSignIn = (cred: { access_token: string }) => {
    const token = cred.access_token;

    googleSignin(
      { token },
      {
        onSuccess(data) {
          dispatch({
            type: 'SET_TOKENS',
            payload: { access_token: data.data.tokens.access.token, refresh_token: data.data.tokens.refresh.token },
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

  const login = useGoogleLogin({
    scope: 'email profile',
    flow: 'implicit',
    onSuccess: handleGoogleSignIn,
  });

  return (
    <div>
      <Button fullWidth variant="outline" onClick={() => login()}>
        {text ?? 'Sign In With Google'}
      </Button>
    </div>
  );
}
