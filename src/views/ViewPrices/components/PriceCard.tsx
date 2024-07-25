import { useNavigate } from 'react-router-dom';
import { MessageCircle, ThumbsDown, ThumbsUp } from 'lucide-react';

import { cn } from '@/lib/classnames';
import { formatDateStr } from '@/lib/date';
import { formatMoney } from '@/lib/money';

export interface Price {
  name: string;
  price: number;
  image: string;
  location: string;
  updatedAt: string;
}

export default function PriceCard(props: Price) {
  const { image, name, location, updatedAt, price } = props;

  const navigate = useNavigate();

  return (
    <div
      role="contentinfo"
      onClick={() => navigate('uuid')}
      className="border bg-background border-[#F0F2F5] p-4 flex gap-4 rounded-lg"
    >
      <img src={image} alt={name} />

      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-xs leading-[14px] text-[#667085]">
            {location} | {formatDateStr(updatedAt, 'DD MMM YYYY [at] hh:mm a')}
          </p>

          <p className="text-sm text-[#1F2937]">{name}</p>

          <h2 className="text-xl font-semibold text-[#101928]">{formatMoney(price)}</h2>
        </div>

        <div className="flex items-center justify-between">
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
      </div>
    </div>
  );
}
