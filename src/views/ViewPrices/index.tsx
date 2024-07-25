import { ChevronDown } from 'lucide-react';

import SearchBox from '@/components/ui/Search';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { priceList } from '@/constants/data';
import PriceCard from './components/PriceCard';

const sortOptions = [
  'Default sorting',
  'Sort by popularity',
  'Sort by average rating',
  'Sort by latest',
  'Sort by price: low to high',
  'Sort by price: high to low',
];

export default function ViewPrices() {
  return (
    <div className="bg-[#f9fafb] min-h-[90vh]">
      <div className="app-x-spacing py-5 flex flex-col gap-6">
        <h3 className="text-base font-medium text-foreground leading-5">View Prices</h3>

        <SearchBox placeholder="Search Items" className="sm:max-w-[500px]" />

        <div className="h-7 flex items-center justify-between">
          <p className="text-sm text-muted">25,973 results</p>

          <Popover>
            <PopoverTrigger className="flex gap-1 items-center text-muted text-sm">
              Sort By <ChevronDown />
            </PopoverTrigger>
            <PopoverContent align="end" className="flex flex-col gap-4">
              {sortOptions.map((opt) => (
                <p key={opt} className="text-sm text-[#525B71]">
                  {opt}
                </p>
              ))}{' '}
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3">
          {priceList.map((p) => (
            <PriceCard key={p.name} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
}
