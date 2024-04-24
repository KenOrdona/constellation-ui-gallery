import { useMemo } from 'react';
import { LocationDisplay, MapsContext, Configuration } from '@pega/cosmos-react-core';

type MapUtilityProps = {
  incidentLocation: string;
  getPConnect: any;
};

export default function PegaExtensionsMapUtility(props: MapUtilityProps) {
  const { getPConnect, incidentLocation } = props;

  const ctx = useMemo(
    () => ({ name: 'google', apiKey: 'AIzaSyAROmkAnwdwkU2Iq2HHMt4WvPSe8NDOIkM' }),
    [mapApiKey]
  );

  return (
    <Configuration>
      <MapsContext.Provider value={ctx}>
        <LocationDisplay
          value={incidentLocation}
          zoomLevel={13}
          height='25rem'
          variant='map'
          displayText=''
        />
      </MapsContext.Provider>
    </Configuration>
  );
}
