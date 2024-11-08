import { useState } from 'react';
import { MessageCircle, Send, ThumbsUp } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

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
import useListPriceReports from '@/hooks/useListPriceReports';
import { capitalize } from '@/helpers';
import { useToken } from '@/providers/TokenProvider';
import { useHasUserCommented, useProductComments, useUpdateCommentLikes } from '@/hooks/useProductComments';
import { useProductLikes } from '@/hooks/useProductLikes';
import { useAddComment } from '@/hooks/useProductComments';
import { DEFAULT_TIMESTAMP_FORMAT } from '@/constants/variables';

const nigerianFullNames = [
  'Chukwuemeka Obi',
  'Ngozi Okafor',
  'Tunde Alabi',
  'Amaka Nwosu',
  'Ifeanyi Eze',
  'Adebayo Adetokunbo',
  'Folake Adebisi',
  'Chinelo Uzor',
  'Segun Olatunji',
  'Yewande Afolayan',
];

export default function PriceDetails() {
  const [comment, setComment] = useState('');

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const productId = id ?? '';

  const { access_token } = useToken();

  const userId = access_token ? jwtDecode(access_token ?? '')?.sub ?? '' : '';

  const { likes = [], like, hasLiked, unlike } = useProductLikes(productId, userId);

  const { data, isLoading, error, getReport } = useGetPriceReport(productId);

  const { data: comparedReports } = useListPriceReports({
    product: productId,
    include: 'product',
    sortBy: 'updatedAt:desc',
  });

  const onLikeToggle = () => (hasLiked ? unlike() : like());

  const { data: hasCommented } = useHasUserCommented({ productId, userId });
  const { data: comments = [], isLoading: isLoadingComments } = useProductComments(productId);
  const { mutate: addComment, isPending: isCommenting } = useAddComment();
  const { mutate: updateLikes } = useUpdateCommentLikes();

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
                {<h3 className="text-sm font-medium pb-1 text-foreground">{data.description}</h3>}
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
                <p className="text-sm pb-1 text-foreground">
                  {capitalize(data.product.name)} {data.unit}
                </p>
                <h3 className="text-xl text-foreground font-semibold">
                  {formatMoney(data.price, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-6 max-w-max app-x-spacing mb-6">
              <p className="flex gap-1 items-center">
                <span
                  className={cn('w-6 h-6 flex items-center justify-center rounded-full bg-[#F5F5F5]', {
                    'bg-[#EBFFF3]': hasLiked,
                  })}
                >
                  <ThumbsUp onClick={onLikeToggle} role="button" width={12} color={hasLiked ? '#01B049' : '#000'} />
                </span>
                <span className="text-[#0A090B] text-xs">{likes.length}</span>
              </p>

              <p className="flex gap-1 items-center">
                <span
                  className={cn('w-6 h-6 flex items-center justify-center rounded-full bg-[#F5F5F5]', {
                    'bg-[#EBFFF3]': hasCommented,
                  })}
                >
                  <MessageCircle width={12} color={hasCommented ? '#01B049' : '#000'} />
                </span>
                <span className="text-[#0A090B] text-xs">{comments.length}</span>
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
                  <AppLoader loading={isLoadingComments}>
                    <div className="flex flex-col pb-[72px]">
                      {comments.length ? (
                        comments.map((comment) => (
                          <div key={comment.id} className="flex gap-2  py-4 border-b last:border-0 app-x-spacing">
                            <div className="w-8 h-8 bg-[#f6f6f6] flex justify-center items-center rounded-full">
                              <img
                                src={data.images.length ? data.images[0] : '/images/grocs-bag.jpg'}
                                alt={data.description}
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <p className="text-sm text-muted">
                                {nigerianFullNames[Math.floor(Math.random() * 10)]} |{' '}
                                {formatDateStr(comment.timestamp, DEFAULT_TIMESTAMP_FORMAT)}
                              </p>

                              <p className="text-sm text-[#525B71]">{comment.comment}</p>

                              <div className="flex items-center gap-6 max-w-max">
                                <p className="flex gap-1 items-center">
                                  <span
                                    className={cn(
                                      'w-6 h-6 flex items-center justify-center rounded-full bg-[#F5F5F5]',
                                      {
                                        'bg-[#EBFFF3]': false,
                                      },
                                    )}
                                  >
                                    <ThumbsUp
                                      onClick={() => updateLikes({ commentId: comment.id, productId, increment: true })}
                                      role="button"
                                      width={12}
                                      color={false ? '#01B049' : '#000'}
                                    />
                                  </span>
                                  <span className="text-muted text-xs">{comment.likes}</span>
                                </p>

                                {/* <p className="flex gap-1 items-center">
                                <span className="text-muted text-xs">Reply</span>
                              </p> */}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="p-14 text-center">No Comments</p>
                      )}
                    </div>

                    <div className="bg-background h-[88px] flex items-center justify-center w-full left-0 fixed z-50 bottom-0">
                      <div className="flex items-center justify-center gap-2">
                        <Input
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Add a comment...  "
                          className="h-10 bg-[#F0F2F5] min-w-[287px]"
                        />
                        <Button
                          disabled={!comment}
                          loading={isCommenting}
                          onClick={() =>
                            addComment(
                              {
                                productId,
                                comment: { comment, userId },
                              },
                              {
                                onSuccess() {
                                  setComment('');
                                },
                              },
                            )
                          }
                          className="w-10 h-10 rounded-[10px] p-0 flex justify-center items-center"
                        >
                          <Send width={16} />
                        </Button>
                      </div>
                    </div>
                  </AppLoader>
                </TabsContent>
                <TabsContent value="compare">
                  {comparedReports?.results.length ? (
                    (comparedReports?.results ?? []).map((report) => (
                      <div
                        role="button"
                        onClick={() => navigate(`/view-prices/${report.id}`)}
                        key={report.id}
                        className="flex gap-2 border-b py-4 app-x-spacing last:border-0"
                      >
                        <div className="w-[50px] h-[50px] bg-[#f6f6f6] rounded-lg flex justify-center items-center">
                          <img
                            src={report.images.length ? report.images[0] : '/images/grocs-bag.jpg'}
                            alt={report.product.name}
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <p className="text-xs leading-[14px] text-muted truncate max-w-[250px] block">
                            {report.location}
                          </p>
                          <p className="text-xs leading-[14px] text-muted">
                            {formatDateStr(new Date().toISOString(), 'DD MMM YYYY [at] hh:mm a')}
                          </p>

                          <p className="text-sm text-foreground capitalize">{report.product.name}</p>

                          <h3 className="text-xl text-foreground font-semibold">{formatMoney(report.price)}</h3>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="p-14 text-center">No Compared Reports</p>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </>
        )}
      </AppLoader>
    </div>
  );
}
