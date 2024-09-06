import SearchBox from '@/components/ui/Search';

import AppLoader from '@/components/AppLoader';
import PriceCard from './components/PriceCard';
import useListPriceReports from '../ViewPrices/hooks/useListPriceReports';

export default function Entry() {
  const { data, isLoading, error, listReports } = useListPriceReports();

  return (
    <div className="bg-[#f9fafb]">
      <div className="bg-primary app-x-spacing py-8 flex flex-col items-center gap-5">
        <h2 className="text-[18px]  leading-[28px] text-white">Find the Best Prices Around</h2>

        <SearchBox placeholder="Search Items" className="sm:max-w-[500px]" />
      </div>

      <div className="py-5 app-x-spacing xl:py-10">
        <img src="/images/promotion.png" alt="Promo" className="max-h-[200px] object-cover w-full" />
      </div>

      <div className="app-x-spacing pb-5 flex flex-col gap-4">
        <h3 className="text-base font-medium text-foreground leading-5">Best Prices</h3>

        <AppLoader loading={isLoading} errorMessage={error} onRetry={listReports}>
          {data && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3">
              {data.results.map((p) => (
                <PriceCard key={p.id} {...p} />
              ))}
            </div>
          )}
        </AppLoader>
      </div>
    </div>
  );
}
