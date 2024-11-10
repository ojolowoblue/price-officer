import { InfoIcon } from 'lucide-react';

import Button from './ui/Button';
import useLogout from '@/hooks/useLogout';
import { useToken } from '@/providers/TokenProvider';
import { navigateToLogin } from '@/libs/logout';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/Dialog';

export default function ResetPassword() {
  const { isLoading, logout } = useLogout();

  const { refresh_token } = useToken();

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="text-destructive border-destructive" fullWidth>
            Logout
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-[335px]" hideClose>
          <DialogHeader className="flex flex-col items-center">
            <DialogTitle className="mb-5 text-center w-14 h-14 rounded-full bg-destructive/5 flex items-center justify-center">
              <InfoIcon className="w-8 text-destructive" />
            </DialogTitle>
            <DialogTitle className="font-medium text-xl mb-5 text-center">Logout</DialogTitle>
            <DialogDescription className="text-muted font-normal leading-[24px] text-center">
              Are you sure you want to log out from this account?
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-center flex-col gap-5 mt-2">
            <Button
              onClick={() => {
                if (refresh_token) {
                  logout({ refreshToken: refresh_token }, { onSuccess: navigateToLogin });
                } else {
                  navigateToLogin();
                }
              }}
              variant="primary"
              loading={isLoading}
              className="bg-destructive"
              fullWidth
            >
              Yes, Log me out
            </Button>

            <DialogClose asChild>
              <Button variant="outline" fullWidth>
                Cancel
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
