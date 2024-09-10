import { ChevronDown } from 'lucide-react';

import SearchBox from '@/components/ui/Search';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import AppLoader from '@/components/AppLoader';
import useListPriceReports from '@/hooks/useListPriceReports';
import PriceCard from '@/components/PriceCard';

const sortOptions = [
  'Default sorting',
  'Sort by popularity',
  'Sort by average rating',
  'Sort by latest',
  'Sort by price: low to high',
  'Sort by price: high to low',
];

export default function ViewPrices() {
  const { data, isLoading, error, listReports } = useListPriceReports({
    include: 'products',
    sortBy: 'desc',
    limit: 20,
  });

  return (
    <div className="bg-[#f9fafb] min-h-[90vh]">
      <div className="app-x-spacing py-5 flex flex-col gap-6">
        <h3 className="text-base font-medium text-foreground leading-5">View Prices</h3>

        <SearchBox placeholder="Search Items" className="sm:max-w-[500px]" />

        <div className="h-7 flex items-center justify-between">
          <p className="text-sm text-muted">{data ? `${data.totalResults} results` : '...'}</p>

          <Popover>
            <PopoverTrigger className="flex gap-1 items-center text-muted text-sm">
              Sort By <ChevronDown />
            </PopoverTrigger>
            <PopoverContent align="end" className="flex flex-col gap-4">
              {sortOptions.map((opt) => (
                <p key={opt} className="text-sm text-[#525B71]">
                  {opt}
                </p>
              ))}
            </PopoverContent>
          </Popover>
        </div>

        <AppLoader notPage loading={isLoading} errorMessage={error} onRetry={listReports}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3">
            {data?.results.map((p) => (
              <PriceCard {...p} />
            ))}
          </div>
        </AppLoader>
      </div>
    </div>
  );
}
