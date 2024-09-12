import { AxiosError } from 'axios';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';

import Switch from '@/components/ui/Switch';

// import ImgIcon from '@/assets/img-icon.png';
import useListProducts, { useListUnits } from './hooks/useListProducts';
import AutoComplete from '@/components/ui/AutoComplete';
import useDebounce from '@/hooks/useDebounce';
import useCreateProduct from './hooks/useCreateProduct';
import AmountInput from '@/components/ui/AmountInput';
import AddressInput from '@/components/ui/AddressInput';
import Button from '@/components/ui/Button';
import useCreateReport from './hooks/useCreateReport';
import { parseError } from '@/libs/error';
import { useToast } from '@/hooks/useToast';

const schema = Yup.object({
  product: Yup.string().required(),
  unit: Yup.string().required(),
  price: Yup.number().required(),
  location: Yup.string().required(),
  images: Yup.array(Yup.string()),
  description: Yup.string().required(),
});

export default function ReportPrice() {
  const [searchTerm, setSearchTerm] = useState('');
  const [newProduct, setNewProduct] = useState('');
  const [newUnit, setNewUnit] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const queryClient = useQueryClient();

  const { products = [] } = useListProducts({ name: debouncedSearchTerm || undefined });
  const { units = [] } = useListUnits();
  const { createProduct } = useCreateProduct();
  const { createReport, isLoading } = useCreateReport();

  const { control, setValue, register, handleSubmit, watch } = useForm({
    resolver: yupResolver(schema),
  });

  const product = watch('product');

  const onSubmit = (payload: Yup.InferType<typeof schema>) => {
    createReport(
      {
        ...payload,
        images: [],
        currency: 'NGN',
      },
      {
        onSuccess() {
          queryClient.invalidateQueries({ queryKey: ['price-reports'] });
          setShowFeedback(true);
        },
        onError(error) {
          const errMsg = error ? parseError(error as AxiosError) : undefined;

          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: errMsg,
          });
        },
      },
    );
  };

  return (
    <form className="app-x-spacing py-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2 mb-8">
        <h2 className="text-base font-medium text-foreground">Report Price</h2>

        <p className="text-muted text-sm">Enter these details to report the price of products around you </p>
      </div>

      <div className="flex flex-col gap-6 md:grid md:grid-cols-2">
        <Controller
          control={control}
          name="product"
          render={({ field }) => (
            <AutoComplete
              label="Select Product"
              value={field.value}
              onInputValueChange={(v) => {
                setSearchTerm(v);
              }}
              onSetValue={(v) => {
                setValue('product', v, { shouldDirty: true });
              }}
              onCreateNewOption={(val) => {
                setNewProduct(val);
              }}
              options={products.map((prod) => ({ label: prod.name, value: prod.id }))}
            />
          )}
        />

        {(newProduct || product) && (
          <Controller
            control={control}
            name="unit"
            render={({ field }) => (
              <>
                <AutoComplete
                  label="Select unit"
                  value={field.value}
                  onInputValueChange={(v) => {
                    setNewUnit(v);
                  }}
                  onSetValue={(unit) => {
                    setValue('unit', unit, { shouldDirty: true });

                    if (newProduct) {
                      createProduct(
                        {
                          category: '66da36f010bc481868f18d03',
                          description: newProduct,
                          images: [],
                          name: newProduct,
                          unit,
                        },
                        {
                          onSuccess(data) {
                            queryClient.invalidateQueries({ queryKey: ['products'] });
                            setValue('product', data.data.id);
                          },
                        },
                      );
                    }
                  }}
                  onCreateNewOption={(unit) => {
                    setValue('unit', unit);

                    if (newProduct) {
                      createProduct(
                        {
                          category: '66da36f010bc481868f18d03',
                          description: newProduct,
                          images: [],
                          name: newProduct,
                          unit,
                        },
                        {
                          onSuccess(data) {
                            queryClient.invalidateQueries({ queryKey: ['products'] });
                            setValue('product', data.data.id);
                          },
                        },
                      );
                    }
                  }}
                  options={Array.from(new Set(units.map((prod) => prod.unit)))
                    .map((unit) => ({
                      label: unit,
                      value: unit,
                    }))
                    .filter((u) => u.value.includes(newUnit))}
                />
              </>
            )}
          />
        )}

        <Controller
          control={control}
          name="price"
          render={({ field }) => (
            <AmountInput
              value={field.value}
              label="Price"
              placeholder="Enter price"
              onValueChange={(v) => setValue('price', v, { shouldDirty: true })}
            />
          )}
        />

        <Controller
          control={control}
          name="location"
          render={({ field }) => (
            <div>
              <div className="mb-2.5 flex items-center justify-between">
                <p className="text-muted text-sm">Use my current location as shop location</p>
                <Switch onCheckedChange={(v) => setCurrentLocation(v)} />
              </div>

              <Label className="mb-2.5">Shop Location</Label>

              <AddressInput
                value={field.value}
                useCurrentLocation={currentLocation}
                onChange={(v) => setValue('location', v, { shouldDirty: true })}
              />
            </div>
          )}
        />

        <Input label="Shop Name / Details" placeholder="Enter shop details" {...register('description')} />
      </div>

      {/* <div className="mb-3.5 mt-4">
        <Label className="mb-2.5">
          Product Image <span className="text-muted text-xs">(Optional)</span>
        </Label>

        <div className="w-full h-[196px] dashed-border rounded-lg border-border flex flex-col items-center justify-center">
          <img src={ImgIcon} alt="Upload File" width={50} className="mb-5" />

          <h2 className="text-foreground text-base mb-1">Snap or Upload the product image</h2>

          <p className="text-placeholder text-sm">Maximum size: 50MB</p>
        </div>
      </div> */}

      <Button
        loading={isLoading}
        type="submit"
        fullWidth
        className="flex my-4 items-center justify-center h-12 px-6 bg-primary text-white text-base rounded-lg w-full"
      >
        Report Price
      </Button>

      <Dialog open={showFeedback}>
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
            <DialogClose
              onClick={() => {
                setShowFeedback(false);
                navigate('/view-prices');
              }}
              className='bg-background border rounded-lg border-border w-[82px] h-[33px] text-sm mt-3"'
            >
              Done
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </form>
  );
}
