import SearchBox from '@/components/ui/Search';

import PriceCard, { Price } from './components/PriceCard';

const priceList: Price[] = [
  {
    name: 'Smoked Eja Abo ( ukpek fish)',
    location: 'Lekki, Lagos',
    updatedAt: new Date().toISOString(),
    image: '/images/eja.png',
    price: 2500,
  },
  {
    name: 'Cocoa',
    location: 'Lekki, Lagos',
    updatedAt: new Date().toISOString(),
    image: '/images/cocoa.png',
    price: 5480,
  },
  {
    name: 'Golden Penny Spaghetti 500g',
    location: 'Lekki, Lagos',
    updatedAt: new Date().toISOString(),
    image: '/images/spaghetti.png',
    price: 890,
  },
  {
    name: 'Ofada Rice, 1 derica',
    location: 'Lekki, Lagos',
    updatedAt: new Date().toISOString(),
    image: '/images/ofada.png',
    price: 3000,
  },
  {
    name: 'Plain baking flour (half paint)',
    location: 'Lekki, Lagos',
    updatedAt: new Date().toISOString(),
    image: '/images/flour.png',
    price: 3500,
  },
];

export default function Entry() {
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3">
          {priceList.map((p) => (
            <PriceCard key={p.name} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
}
