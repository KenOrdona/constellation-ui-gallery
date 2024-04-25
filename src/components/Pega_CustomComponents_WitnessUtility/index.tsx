import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardContent,
  Text,
  Label,
  Configuration,
  PhoneDisplay
} from '@pega/cosmos-react-core';
import type { PConnFieldProps } from './PConnProps';
import StyledPegaCustomComponentsWitnessUtilityWrapper, { StyledCard } from './styles';

type WitnessUtilityProps = {
  heading: string;
  witnessName: string;
  witnessPhone: string;
  getPConnect: any;
};
// Duplicated runtime code from Constellation Design System Component

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
export default function PegaCustomComponentsWitnessUtility(props: WitnessUtilityProps) {
  const { getPConnect, heading, witnessName, witnessPhone } = props;
  const pConn = getPConnect();
  const caseProp: string = PCore.getConstants().CASE_INFO.CASE_INFO_ID;
  const caseID = pConn.getValue(caseProp, '');
  const context = pConn.getContextName();

  const theme = {
    components: {
      card: {
        'border-radius': '0.5rem',
        'padding-top': '12px'
      }
    }
  };

  return (
    <Configuration theme={theme}>
      <StyledPegaCustomComponentsWitnessUtilityWrapper>
        <Card
          container={{ direction: 'column', alignItems: 'left' }}
          as={StyledCard}
          aria-label='utilities_witness_data'
          role='list'
        >
          <CardHeader>
            <Text variant='h4'>{heading}</Text>
          </CardHeader>
          <CardContent>
            <Label>Witness Name</Label>
            <div>
              <Text>{witnessName}</Text>
            </div>
            <br />
            <Label>Witness Phone</Label>
            <div>
              <PhoneDisplay
                value={witnessPhone}
                formattingOptions={{ showCountryCode: true }}
              ></PhoneDisplay>
            </div>
          </CardContent>
        </Card>
      </StyledPegaCustomComponentsWitnessUtilityWrapper>
    </Configuration>
  );
}

PegaCustomComponentsWitnessUtility.defaultProps = {};

PegaCustomComponentsWitnessUtility.propTypes = {
  getPConnect: PropTypes.func.isRequired
};
