import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import Switch from '@/components/ui/Switch';

import ImgIcon from '@/assets/img-icon.png';
import { productNames, units } from './utils';

export default function ReportPrice() {
  return (
    <div className="app-x-spacing py-4">
      <div className="flex flex-col gap-2 mb-8">
        <h2 className="text-base font-medium text-foreground">Report Price</h2>

        <p className="text-muted text-sm">Enter these details to report the price of products around you </p>
      </div>

      <div className="flex flex-col gap-6 md:grid md:grid-cols-2">
        <Select>
          <SelectGroup>
            <SelectLabel>Product</SelectLabel>
            <SelectTrigger>
              <SelectValue placeholder="Enter product name" />
            </SelectTrigger>
            <SelectContent>
              {productNames.map((prod) => (
                <SelectItem key={prod.name} value={prod.name}>
                  {prod.name}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectGroup>
        </Select>

        <Select>
          <SelectGroup>
            <SelectLabel>Unit/Quantity</SelectLabel>
            <SelectTrigger>
              <SelectValue placeholder="Select Unit" />
            </SelectTrigger>
            <SelectContent>
              {units.map((unit) => (
                <SelectItem key={unit} value={unit}>
                  {unit}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectGroup>
        </Select>

        <Input label="Price" placeholder="Enter price" />

        <Select>
          <SelectGroup>
            <SelectLabel className="mb-1">Location</SelectLabel>
            <div className="mb-2.5 flex items-center justify-between">
              <p className="text-muted text-sm">Use my current location as shop location</p>
              <Switch />
            </div>
            <SelectTrigger>
              <SelectValue placeholder="Select location" className="placeholder:text-placeholder" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </SelectGroup>
        </Select>

        <Input label="Shop Name / Address" placeholder="Enter shop details" />
      </div>

      <div className="mb-3.5 mt-4">
        <Label className="mb-2.5">
          Product Image <span className="text-muted text-xs">(Optional)</span>
        </Label>

        <div className="w-full h-[196px] dashed-border rounded-lg border-border flex flex-col items-center justify-center">
          <img src={ImgIcon} alt="Upload File" width={50} className="mb-5" />

          <h2 className="text-foreground text-base mb-1">Snap or Upload the product image</h2>

          <p className="text-placeholder text-sm">Maximum size: 50MB</p>
        </div>
      </div>

      <Dialog>
        <DialogTrigger className="w-full">
          <div
            role="button"
            className="flex items-center justify-center h-12 px-6 bg-primary text-white text-base rounded-lg w-full"
          >
            Report Price
          </div>
        </DialogTrigger>

        <DialogContent className="max-w-[335px]">
          <DialogHeader className="flex flex-col items-center">
            <DialogTitle className="mb-5 text-center">
              <span className="font-bold text-[40px]">🎉</span>
            </DialogTitle>
            <DialogTitle className="font-medium text-xl mb-5 text-center">Price Report Successful</DialogTitle>
            <DialogDescription className="text-muted leading-[24px] text-center">
              Yayy! You have just reported the price in your area, Thanks!
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-center">
            <DialogClose className='bg-background border rounded-lg border-border w-[82px] h-[33px] text-sm mt-3"'>
              Done
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
