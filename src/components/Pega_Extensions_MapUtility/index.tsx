import { useMemo } from 'react';
import { LocationDisplay, MapsContext, Configuration } from '@pega/cosmos-react-core';

type MapUtilityProps = {
  location: string;
  getPConnect: any;
};

export default function PegaExtensionsMapUtility(props: MapUtilityProps) {
  const { getPConnect, location } = props;

  const mapApiKey: any = getPConnect().getGoogleMapsAPIKey();

  const ctx = useMemo(() => ({ name: 'google', apiKey: mapApiKey }), [mapApiKey]);

  if (location === '') return null;
  return (
    <Configuration>
      <MapsContext.Provider value={ctx}>
        <LocationDisplay
          value={location}
          zoomLevel={13}
          height='25rem'
          variant='map'
          displayText=''
        />
      </MapsContext.Provider>
    </Configuration>
  );
}
