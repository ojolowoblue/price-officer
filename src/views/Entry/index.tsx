import { useState } from 'react';

import AppLoader from '@/components/AppLoader';
import PriceCard from '@/components/PriceCard';
import useListPriceReports from '@/hooks/useListPriceReports';
import useDebounce from '@/hooks/useDebounce';
import AutoComplete from '@/components/ui/AutoComplete';
import useListProducts from '../ReportPrice/hooks/useListProducts';
import EmptyState from '@/components/EmptyState';

export default function Entry() {
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const [productId, setProductId] = useState<string | undefined>();

  const debouncedQuery = useDebounce(searchTerm, 1000);

  const { products = [] } = useListProducts({ name: debouncedQuery || undefined });

  const { data, isLoading, error, listReports } = useListPriceReports({
    include: 'product',
    sortBy: 'updatedAt:desc',
    product: productId,
    limit: 20,
  });

  return (
    <div>
      <div className="bg-primary app-x-spacing py-8 flex flex-col items-center gap-5">
        <h2 className="text-[18px]  leading-[28px] text-white">Find the Best Prices Around</h2>

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
      </div>

      <div className="py-5 app-x-spacing xl:py-10 flex justify-center">
        <div className="bg-[#fee1dd] max-w-[500px] pl-4 h-[128px] overflow-hidden rounded-[12px] flex items-center justify-between">
          <div>
            <h1 className="max-w-[200px] text-base leading-[120%] font-semibold">
              Place Adverts for your business here
            </h1>

            <p className="text-[10px] mt-1 text-[#1F2937]">Increase sales today!</p>

            <button className="bg-[#FE4644] px-3 py-2 rounded-3xl text-[10px] text-white mt-3">
              Call - 08067084125
            </button>
          </div>

          <div>
            <img src="/images/ad.png" width={158} />
          </div>
        </div>
      </div>

      <div className="app-x-spacing pb-5 flex flex-col gap-4">
        <h3 className="text-base font-medium text-foreground leading-5">Best Prices</h3>

        <AppLoader notPage loading={isLoading} errorMessage={error} onRetry={listReports}>
          {data && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3">
              {data.results.map((p) => (
                <PriceCard key={p.id} {...p} />
              ))}
            </div>
          )}

          {!data?.results.length && <EmptyState title="No data found" />}
        </AppLoader>
      </div>
    </div>
  );
}
