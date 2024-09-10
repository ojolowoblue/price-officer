import Logo from '@/assets/logo-white.svg';

export default function About() {
  return (
    <div className="app-x-spacing py-5 pb-20">
      <div className="flex flex-col gap-4 mb-6">
        <h3 className="text-base font-medium text-foreground leading-5">About Price Officer</h3>

        <div className="bg-[#100435] rounded-lg w-full h-[120px] flex justify-center items-center">
          <img src={Logo} alt="Price Officer" width={83.5} height={28} />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="mb-2 font-medium">Welcome to Price Officer!</h2>

        <p className="text-muted text-sm leading-6">
          At Price Officer, our mission is to empower communities by providing transparent and up-to-date information on
          the prices of goods in your area. We believe that everyone deserves access to the best deals and the most
          accurate pricing information, enabling smarter shopping decisions and promoting economic fairness.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="mb-2 font-medium">Our Story</h2>

        <p className="text-muted text-sm leading-6">
          Founded with the vision of making price transparency a reality, Price Officer is dedicated to bridging the gap
          between consumers and the marketplace. We understand that prices can vary significantly from one store to
          another, and our goal is to bring this information to your fingertips.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="mb-2 font-medium">What We Do</h2>

        <p className="text-muted text-sm leading-6">
          Price Officer is a community-driven platform where users can report and view prices of goods in their
          locality. By leveraging the power of community contributions, we collect real-time data on a wide range of
          products, from groceries and electronics to clothing and household items. Our platform allows you to:
        </p>

        <ul className="mt-4 list-disc pl-6">
          <li className="text-muted text-sm leading-6">
            Report Prices: Easily share the prices you encounter while shopping, helping others in your community find
            the best deals.
          </li>
          <li className="text-muted text-sm leading-6">
            View Prices: Search for and compare prices of products in different stores around you, ensuring you always
            get the best value for your money.
          </li>
          <li className="text-muted text-sm leading-6">
            Track Trends: Stay informed about price changes and trends over time, so you can plan your purchases
            accordingly.
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <img src="/icons/ig.svg" />
          <p>priceofficer</p>
        </div>

        <div className="flex gap-2 items-center">
          <img src="/icons/whatsapp.svg" />
          <p>07009090900</p>
        </div>

        <div className="flex gap-2 items-center">
          <img src="/icons/x.svg" />
          <p>priceofficer</p>
        </div>

        <div className="flex gap-2 items-center">
          <img src="/icons/mail.svg" />
          <p>support@priceofficer.com</p>
        </div>
      </div>
    </div>
  );
}
