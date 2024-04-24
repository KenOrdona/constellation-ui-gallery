import PegaCustomComponentsCountryStateNavigator from './index.tsx';

export default {
  title: 'PegaCustomComponentsCountryStateNavigator',
  component: PegaCustomComponentsCountryStateNavigator
};

if (!window.PCore) {
  window.PCore = {};
}

window.PCore.getDataApiUtils = () => {
  return {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getData: (dataView, parameters, options) => {
      return new Promise(resolve => {
        if (dataView === 'D_pyStateList' && parameters.dataViewParameters.pyCountry === 'USA') {
          resolve({
            data: {
              data: [
                {
                  pyLabel: 'Alabama',
                  pyStateCode: 'AL'
                },
                {
                  pyLabel: 'Alaska',
                  pyStateCode: 'AK'
                }
              ]
            }
          });
        } else {
          resolve({
            data: {
              data: []
            }
          });
        }
      });
    }
  };
};

export const basePegaCustomComponentsCountryStateNavigator = () => {
  const props = {
    countryList: {
      source: [
        {
          objectClass: 'Rule-Obj-FieldValue',
          value: 'United Kingdom',
          id: 'RULE-OBJ-FIELDVALUE @BASECLASS PYCOUNTRYCODE!GBR #20180713T132223.211 GMT',
          name: 'GBR'
        },
        {
          objectClass: 'Rule-Obj-FieldValue',
          value: 'United States',
          id: 'RULE-OBJ-FIELDVALUE @BASECLASS PYCOUNTRYCODE!USA #20180713T132225.795 GMT',
          name: 'USA'
        }
      ]
    },
    headerText: 'Country and State Navigator'
  };

  return <PegaCustomComponentsCountryStateNavigator {...props} />;
};
