import { useMemo, useState } from 'react';
import { LocationInput, MapsContext } from '@pega/cosmos-react-core';

const LocationInputDemo = () => {
  const [value, setValue] = useState('');
  const ctx = useMemo(
    () => ({ name: 'google', apiKey: 'AIzaSyAROmkAnwdwkU2Iq2HHMt4WvPSe8NDOIkM' }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ['']
  );

  return (
    <MapsContext.Provider value={ctx}>
      <LocationInput
        defaultToCurrentLocation
        value={value}
        label='Location'
        labelHidden={false}
        onChange={inputValue => {
          setValue(inputValue);
        }}
        onSelect={selectedValueObj => {
          setValue(selectedValueObj.name ?? '');
        }}
        status={undefined}
        required
        disabled={false}
        readOnly={false}
        additionalInfo={
          // eslint-disable-next-line no-constant-condition
          false
            ? {
                heading: 'Additional Info',
                content: 'Please enter your location'
              }
            : undefined
        }
      />
    </MapsContext.Provider>
  );
};

export default LocationInputDemo;
