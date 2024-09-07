import { MessageCircle, Send, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/Breadcrumb';
import { cn } from '@/libs/classnames';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import useGetPriceReport from './hooks/useGetPriceReport';
import AppLoader from '@/components/AppLoader';
import { formatMoney } from '@/libs/money';
import { formatDateStr } from '@/libs/date';
import useGetUser from '@/hooks/useGetUser';

export default function PriceDetails() {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error, getReport } = useGetPriceReport(id ?? '');

  const { user } = useGetUser(data?.user ?? '');

  return (
    <div className="py-5 flex flex-col min-h-screen bg-[#F9FAFB]">
      <Breadcrumb className="mb-8 app-x-spacing">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => navigate('/view-prices')} className="text-[#4B5563] cursor-pointer text-sm">
              View Prices
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-[#192434] text-sm">Price Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <AppLoader loading={isLoading} errorMessage={error} onRetry={getReport}>
        {data && (
          <>
            <div className="flex flex-col gap-[18px] mb-[18px] app-x-spacing">
              <div>
                {user && <h3 className="text-sm font-medium pb-1 text-foreground">{user.name ?? '...'}</h3>}
                <p className="text-xs text-muted">
                  {data.location} | {formatDateStr(new Date().toISOString(), 'MMM DD, YYYY [at] hh:mma')}
                </p>
              </div>

              <div>
                <img
                  src={data.images.length ? data.images[0] : '/images/grocs-bag.jpg'}
                  alt={data.description}
                  className="w-[70px] h-[120ox] object-cover rounded-lg"
                />
              </div>

              <div>
                <p className="text-sm pb-1 text-foreground">{data.description}</p>
                <h3 className="text-xl text-foreground font-semibold">
                  {formatMoney(data.price, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-6 max-w-max app-x-spacing mb-6">
              <p className="flex gap-1 items-center">
                <span
                  className={cn('w-6 h-6 flex items-center justify-center rounded-full bg-[#F5F5F5]', {
                    'bg-[#EBFFF3]': false,
                  })}
                >
                  <ThumbsUp width={12} color={false ? '#01B049' : '#000'} />
                </span>
                <span className="text-[#0A090B] text-xs">{data.stat.likes}</span>
              </p>

              <p className="flex gap-1 items-center">
                <span
                  className={cn('w-6 h-6 flex items-center justify-center rounded-full bg-[#F5F5F5]', {
                    'bg-[#EBFFF3]': false,
                  })}
                >
                  <ThumbsDown width={12} color={false ? '#01B049' : '#000'} />
                </span>
                <span className="text-[#0A090B] text-xs">{data.stat.dislikes}</span>
              </p>

              <p className="flex gap-1 items-center">
                <span
                  className={cn('w-6 h-6 flex items-center justify-center rounded-full bg-[#F5F5F5]', {
                    'bg-[#EBFFF3]': false,
                  })}
                >
                  <MessageCircle width={12} color={false ? '#01B049' : '#000'} />
                </span>
                <span className="text-[#0A090B] text-xs">{data.stat.comments}</span>
              </p>
            </div>

            <div>
              <Tabs defaultValue="comments" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="comments" className="flex-1">
                    Comments
                  </TabsTrigger>
                  <TabsTrigger value="compare" className="flex-1">
                    Compare
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="comments">
                  <div className="flex flex-col pb-[72px]">
                    {Array(2)
                      .fill('')
                      .map((_, idx) => (
                        <div key={idx.toString()} className="flex gap-2  py-4 border-b last:border-0 app-x-spacing">
                          <div className="w-8 h-8 bg-[#f6f6f6] flex justify-center items-center rounded-full">
                            <img
                              src={data.images.length ? data.images[0] : '/images/grocs-bag.jpg'}
                              alt={data.description}
                            />
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
                                <span className="text-muted text-xs">1,299</span>
                              </p>

                              <p className="flex gap-1 items-center">
                                <span
                                  className={cn('w-6 h-6 flex items-center justify-center rounded-full bg-[#F5F5F5]', {
                                    'bg-[#EBFFF3]': false,
                                  })}
                                >
                                  <ThumbsDown width={12} color={false ? '#01B049' : '#000'} />
                                </span>
                                <span className="text-muted text-xs">1,200</span>
                              </p>

                              <p className="flex gap-1 items-center">
                                <span className="text-muted text-xs">Reply</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="bg-background h-[88px] flex items-center justify-center w-full left-0 fixed z-50 bottom-0">
                    <div className="flex items-center justify-center gap-2">
                      <Input placeholder="Add a comment...  " className="h-10 bg-[#F0F2F5] min-w-[287px]" />
                      <Button className="w-10 h-10 rounded-[10px] p-0 flex justify-center items-center">
                        <Send width={16} />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="compare">
                  {Array(3)
                    .fill('')
                    .map((_, idx) => (
                      <div key={idx.toString()} className="flex gap-2 border-b py-4 app-x-spacing last:border-0">
                        <div className="w-[50px] h-[50px] bg-[#f6f6f6] rounded-lg flex justify-center items-center">
                          <img
                            src={data.images.length ? data.images[0] : '/images/grocs-bag.jpg'}
                            alt={data.description}
                          />
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
          </>
        )}
      </AppLoader>
    </div>
  );
}
