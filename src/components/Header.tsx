import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/Sheet';

import Logo from '@/assets/logo.svg';
import { appLinks } from '@/constants/appLinks';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

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

        <SheetContent side="left" hideCloseIcon>
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
