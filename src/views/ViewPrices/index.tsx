import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import AppLoader from '@/components/AppLoader';
import useListPriceReports from '@/hooks/useListPriceReports';
import PriceCard from '@/components/PriceCard';
import AutoComplete from '@/components/ui/AutoComplete';
import useDebounce from '@/hooks/useDebounce';
import useListProducts from '../ReportPrice/hooks/useListProducts';

const sortOptions = [
  { label: 'Default sorting', value: undefined },
  { label: 'Sort by popularity', value: 'popularity:desc' },
  { label: 'Sort by average rating', value: 'rating:desc' },
  { label: 'Sort by latest', value: 'updatedAt:desc' },
  { label: 'Sort by price: low to high', value: 'price:asc' },
  { label: 'Sort by price: high to low', value: 'price:desc' },
];

export default function ViewPrices() {
  const [productId, setProductId] = useState<string | undefined>();
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const [sortBy, setSortBy] = useState<string | undefined>();
  const debouncedQuery = useDebounce(searchTerm, 1000);

  const { products = [] } = useListProducts({ name: debouncedQuery || undefined });

  const { data, isLoading, error, listReports } = useListPriceReports({
    include: 'product',
    product: productId,
    sortBy: sortBy || 'updatedAt:desc',
    limit: 20,
  });

  return (
    <div className="bg-[#f9fafb] min-h-[90vh]">
      <div className="app-x-spacing py-5 flex flex-col gap-6">
        <h3 className="text-base font-medium text-foreground leading-5">View Prices</h3>

        <AutoComplete
          className="w-full sm:w-[500px]"
          placeholder="Search by product"
          value={searchTerm}
          onInputValueChange={(v) => {
            setSearchTerm(v);
          }}
          onSetValue={(v) => {
            setProductId(v);
          }}
          options={products.map((prod) => ({ label: prod.name, value: prod.id }))}
        />

        <div className="h-7 flex items-center justify-between">
          <p className="text-sm text-muted">{data ? `${data.totalResults} results` : '...'}</p>

          <div className="flex items-center gap-2">
            {sortBy}
            <Popover>
              <PopoverTrigger className="flex gap-1 items-center text-muted text-sm">
                Sort By <ChevronDown />
              </PopoverTrigger>
              <PopoverContent align="end" className="flex flex-col gap-4">
                {sortOptions.map((opt) => (
                  <PopoverClose
                    key={opt.label}
                    className="text-sm text-left text-[#525B71]"
                    onClick={() => {
                      setSortBy(opt.value);
                    }}
                  >
                    {opt.label}
                  </PopoverClose>
                ))}
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <AppLoader notPage loading={isLoading} errorMessage={error} onRetry={listReports}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3">
            {data?.results.map((p) => (
              <PriceCard key={p.id} {...p} />
            ))}
          </div>
        </AppLoader>
      </div>
    </div>
  );
}
