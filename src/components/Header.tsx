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

export default function Header() {
  return (
    <header className="h-[72px] bg-background w-full flex items-center justify-between px-5 max-w-full  border-b border-divider">
      <Sheet>
        <SheetTrigger className="flex gap-3 items-center">
          <div className="border-[.84px] rounded-lg flex justify-center items-center border-border w-8 h-8 shadow-[0px 0.84px 1.68px 0px #0000000D]">
            <Menu width={13} height={13} />
          </div>

          <div>
            <img src={Logo} alt="Price Officer" width={83.5} height={28} />
          </div>
        </SheetTrigger>

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
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <button className="h-8 w-[102px] bg-primary-light rounded-lg text-sm text-primary">Report Price</button>
    </header>
  );
}
