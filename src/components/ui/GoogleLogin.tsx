import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

import useGoogleSignin from '@/hooks/useGoogleSignIn';
import { useTokenDispatch } from '@/providers/TokenProvider';
import { parseError } from '@/libs/error';
import { toast } from '@/hooks/useToast';

export default function GoogleSignin() {
  const navigate = useNavigate();
  const dispatch = useTokenDispatch();
  const { googleSignin } = useGoogleSignin();

  const handleGoogleSignIn = (cred: CredentialResponse) => {
    const token = cred.credential as string;

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

  return (
    <div>
      <GoogleLogin onSuccess={handleGoogleSignIn} onError={() => console.log('Error')} />
    </div>
  );
}
