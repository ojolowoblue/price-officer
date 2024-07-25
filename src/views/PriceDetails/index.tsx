import { MessageCircle, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/Breadcrumb';
import { cn } from '@/lib/classnames';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';

export default function PriceDetails() {
  const navigate = useNavigate();

  return (
    <div className="py-5 flex flex-col bg-[#F9FAFB]">
      <Breadcrumb className="mb-8 app-x-spacing">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => navigate('/view-prices')} className="text-[#4B5563] cursor-pointer text-sm">
              View Prices
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-[#192434] text-sm">Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-[18px] mb-[18px] app-x-spacing">
        <div>
          <h3 className="text-sm font-medium pb-1 text-foreground">Morenike Adeyemi</h3>
          <p className="text-xs text-muted">Lekki, Lagos | 12 April 2019 at 10:47 AM</p>
        </div>

        <div>
          <img src="/images/smoke-fish.png" height={120} />
        </div>

        <div>
          <p className="text-sm pb-1 text-foreground">Smoked Eja Abo ( ukpek fish)</p>
          <h3 className="text-xl text-foreground font-semibold">₦ 891.00</h3>
        </div>
      </div>

      <div className="flex items-center gap-6 max-w-max app-x-spacing mb-6">
        <p className="flex gap-1 items-center">
          <span
            className={cn('w-6 h-6 flex items-center justify-center rounded-full bg-[#F5F5F5]', {
              'bg-[#EBFFF3]': true,
            })}
          >
            <ThumbsUp width={12} color={true ? '#01B049' : '#000'} />
          </span>
          <span className="text-[#0A090B] text-xs">1,299</span>
        </p>

        <p className="flex gap-1 items-center">
          <span
            className={cn('w-6 h-6 flex items-center justify-center rounded-full bg-[#F5F5F5]', {
              'bg-[#EBFFF3]': false,
            })}
          >
            <ThumbsDown width={12} color={false ? '#01B049' : '#000'} />
          </span>
          <span className="text-[#0A090B] text-xs">1,200</span>
        </p>

        <p className="flex gap-1 items-center">
          <span
            className={cn('w-6 h-6 flex items-center justify-center rounded-full bg-[#F5F5F5]', {
              'bg-[#EBFFF3]': false,
            })}
          >
            <MessageCircle width={12} color={false ? '#01B049' : '#000'} />
          </span>
          <span className="text-[#0A090B] text-xs">1,200</span>
        </p>
      </div>

      <div>
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="account" className="flex-1">
              Account
            </TabsTrigger>
            <TabsTrigger value="password" className="flex-1">
              Password
            </TabsTrigger>
          </TabsList>
          <TabsContent className="app-x-spacing py-4" value="account">
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-[#f6f6f6] flex justify-center items-center  rounded-full">
                <img src="/images/small-spagh.png" />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-muted">Adams White | 12 April 2019 at 10:47 AM</p>

                <p className="text-sm text-[#525B71]">
                  This is a really a good price, the best price i have seen out there 👌🏼{' '}
                </p>

                <div className="flex items-center gap-6 max-w-max">
                  <p className="flex gap-1 items-center">
                    <span
                      className={cn('w-6 h-6 flex items-center justify-center rounded-full bg-[#F5F5F5]', {
                        'bg-[#EBFFF3]': true,
                      })}
                    >
                      <ThumbsUp width={12} color={true ? '#01B049' : '#000'} />
                    </span>
                    <span className="text-[#0A090B] text-xs">1,299</span>
                  </p>

                  <p className="flex gap-1 items-center">
                    <span
                      className={cn('w-6 h-6 flex items-center justify-center rounded-full bg-[#F5F5F5]', {
                        'bg-[#EBFFF3]': false,
                      })}
                    >
                      <ThumbsDown width={12} color={false ? '#01B049' : '#000'} />
                    </span>
                    <span className="text-[#0A090B] text-xs">1,200</span>
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="password">
            {Array(3)
              .fill('')
              .map((_, idx) => (
                <div key={idx.toString()} className="flex gap-2 border-b py-4 app-x-spacing last:border-0">
                  <div className="w-[50px] h-[50px] bg-[#f6f6f6] rounded-lg flex justify-center items-center">
                    <img src="/images/small-spagh.png" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-muted">Adams White | 12 April 2019 at 10:47 AM</p>

                    <p className="text-sm text-foreground">Golden Penny Spaghetti 500g </p>

                    <h3 className="text-xl text-foreground font-semibold">₦ 891.00</h3>
                  </div>
                </div>
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
