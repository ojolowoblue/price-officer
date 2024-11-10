import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Menu, X } from 'lucide-react';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/Sheet';
import Logo from '@/assets/logo.svg';
import { appLinks } from '@/constants/appLinks';
import { useToken } from '@/providers/TokenProvider';
import useAuth from '@/hooks/useAuth';
import Button from './ui/Button';
import { Avatar, AvatarFallback } from './ui/Avatar';
import useGetUser from '@/hooks/useGetUser';
import Logout from './Logout';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const loggedIn = useAuth();

  const { access_token } = useToken();

  const userId = access_token ? jwtDecode(access_token ?? '')?.sub : '';

  const { user } = useGetUser(userId ?? '');

  return (
    <header className="h-[72px] z-50 sticky top-0 bg-background w-full flex items-center justify-between app-x-spacing max-w-full border-b border-divider">
      <Sheet>
        <div className="flex gap-3 items-center">
          <SheetTrigger>
            <div className="border-[.84px] rounded-lg flex justify-center items-center border-border w-8 h-8 shadow-[0px 0.84px 1.68px 0px #0000000D]">
              <Menu width={13} height={13} />
            </div>
          </SheetTrigger>

          <div role="button" onClick={() => navigate('/')}>
            <img src={Logo} alt="Price Officer" width={83.5} height={28} />
          </div>
        </div>

        <SheetContent side="left" className="flex flex-col justify-between min-w-[320px]" hideCloseIcon>
          <SheetHeader>
            <SheetClose className="flex gap-3 items-center">
              <span className="border-[.84px] rounded-lg flex justify-center items-center border-border w-8 h-8 shadow-[0px 0.84px 1.68px 0px #0000000D]">
                <X width={13} height={13} />
              </span>

              <div>
                <img src={Logo} alt="Price Officer" width={83.5} height={28} />
              </div>
            </SheetClose>

            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>

            <div className="mt-5 flex flex-col">
              {appLinks.map((link) => (
                <SheetTrigger
                  key={link.name}
                  onClick={() => navigate(link.path)}
                  className="py-4 px-3 w-full text-sm text-placeholder text-left"
                >
                  {link.name}
                </SheetTrigger>
              ))}
            </div>
          </SheetHeader>

          <SheetFooter className="align-bottom">
            {!loggedIn ? (
              <div className="w-full flex flex-col gap-5">
                <Button onClick={() => navigate('/auth/signup')} fullWidth>
                  Sign Up
                </Button>
                <Button onClick={() => navigate('/auth/signin')} fullWidth variant="outline">
                  Login
                </Button>
              </div>
            ) : (
              <div className="flex w-full flex-col gap-8">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarFallback className="uppercase">
                      {user?.name?.[0]}
                      {user?.name?.[1]}
                    </AvatarFallback>
                  </Avatar>

                  <p className="text-sm text-[#667085]">{user?.email}</p>
                </div>

                <Logout />
              </div>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {location.pathname.replace('/', '') !== 'report-price' && (
        <button
          onClick={() => navigate('/report-price')}
          className="h-8 w-[102px] bg-primary-light rounded-lg text-sm text-primary"
        >
          Report Price
        </button>
      )}
    </header>
  );
}
