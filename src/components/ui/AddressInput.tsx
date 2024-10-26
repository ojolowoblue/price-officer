import { useEffect } from 'react';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

import AddressAutoComplete from './AddressAutoComplete';
import useCoordinates from '@/hooks/useCoordinates';
import request from '@/api/request';
import useUpdatedEffect from '@/hooks/useUpdatedEffect';

interface Props {
  placeholder?: string;
  useCurrentLocation?: boolean;
  onChange: (v: string) => void;
  value?: string;
}

export default function AddressInput({ placeholder, useCurrentLocation, value = '', onChange }: Props) {
  const [coordinates] = useCoordinates(!!useCurrentLocation);

  const { placesService, placePredictions, getPlacePredictions, isPlacePredictionsLoading } = usePlacesService({
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    options: { region: 'NG', input: '' },
  });

  useEffect(() => {
    if (placePredictions.length)
      placesService?.getDetails(
        {
          placeId: placePredictions[0].place_id,
        },
        () => {},
      );
  }, [placePredictions]);

  const getAddressFromCoordinates = async () => {
    if (!coordinates) return;

    const response = await request.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=${
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      }`,
      {
        headers: {
          noToken: true,
        },
      },
    );

    onChange(response.data.results[0].formatted_address);
  };

  useUpdatedEffect(() => {
    if (!coordinates) return;

    getAddressFromCoordinates();
  }, [coordinates]);

  return (
    <AddressAutoComplete
      isLoading={isPlacePredictionsLoading}
      emptyMessage="No Address"
      defaultInputValue={value}
      onInputValueChange={(v) => getPlacePredictions({ input: v })}
      onSetValue={onChange}
      placeholder={placeholder}
      options={placePredictions.map((item) => ({ label: item.description, value: item.description }))}
    />
  );
}
