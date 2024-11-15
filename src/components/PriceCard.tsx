import { useNavigate } from 'react-router-dom';
import { MessageCircle, ThumbsUp } from 'lucide-react';

import { cn } from '@/libs/classnames';
import { formatDateStr } from '@/libs/date';
import { formatMoney } from '@/libs/money';
import { PriceReport } from '@/model/report';

export default function PriceCard(props: PriceReport & { likes: number; comments: number }) {
  const { location, updatedAt, price, description, images, id, product, likes, comments } = props;

  const navigate = useNavigate();

  return (
    <div
      role="contentinfo"
      onClick={() => navigate(`/view-prices/${id}`)}
      className="border bg-background border-[#F0F2F5] p-4 flex gap-4 rounded-lg cursor-pointer"
    >
      <img
        src={images.length ? images[0] : '/images/grocs-bag.jpg'}
        alt={description}
        className="w-[70px] h-[120ox] object-cover rounded-lg"
      />

      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-xs leading-[14px] text-[#667085] truncate max-w-[200px] block">{location}</p>
          <p className="text-xs leading-[14px] text-[#667085]">
            {formatDateStr(updatedAt, 'DD MMM YYYY [at] hh:mm a')}
          </p>
          <p className="text-sm text-[#1F2937] capitalize">{product.name}</p>

          <h2 className="text-xl font-semibold text-[#101928]">{formatMoney(price)}</h2>
        </div>

        <div className="flex items-center gap-6">
          <p className="flex gap-1 items-center">
            <span
              className={cn('w-6 h-6 flex items-center justify-center rounded-full bg-[#F5F5F5]', {
                'bg-[#EBFFF3]': false,
              })}
            >
              <ThumbsUp width={12} color={false ? '#01B049' : '#000'} />
            </span>
            <span className="text-[#0A090B] text-xs">{likes}</span>
          </p>

          <p className="flex gap-1 items-center">
            <span
              className={cn('w-6 h-6 flex items-center justify-center rounded-full bg-[#F5F5F5]', {
                'bg-[#EBFFF3]': false,
              })}
            >
              <MessageCircle width={12} color={false ? '#01B049' : '#000'} />
            </span>
            <span className="text-[#0A090B] text-xs">{comments}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
