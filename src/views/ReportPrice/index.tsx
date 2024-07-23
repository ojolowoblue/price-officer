import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
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
import Button from '@/components/ui/Button';

export default function ReportPrice() {
  return (
    <div className="app-x-spacing py-4">
      <div className="flex flex-col gap-2 mb-8">
        <h2 className="text-base font-medium text-foreground">Report Price</h2>

        <p className="text-muted text-sm">Enter these details to report the price of products around you </p>
      </div>

      <div className="flex flex-col gap-6 md:grid md:grid-cols-2">
        <Input label="Product" placeholder="Enter product name" />

        <Select>
          <SelectGroup>
            <SelectLabel>Unit/Quantity</SelectLabel>
            <SelectTrigger>
              <SelectValue placeholder="Select Unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
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

      <Button fullWidth>Report Price</Button>
    </div>
  );
}
