import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text, Label, Configuration } from '@pega/cosmos-react-core';
import type { PConnFieldProps } from './PConnProps';
import StyledPegaCustomComponentsWitnessUtilityWrapper from './styles';

type WitnessUtilityProps = {
  witnessName: string;
  witnessPhone: string;
  getPConnect: any;
};
// Duplicated runtime code from Constellation Design System Component

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
export default function PegaCustomComponentsWitnessUtility(props: WitnessUtilityProps) {
  const { getPConnect, witnessName, witnessPhone } = props;
  const pConn = getPConnect();
  const caseProp: string = PCore.getConstants().CASE_INFO.CASE_INFO_ID;
  const caseID = pConn.getValue(caseProp, '');
  const context = pConn.getContextName();

  return (
    <Configuration>
      <StyledPegaCustomComponentsWitnessUtilityWrapper>
        <h3>Witness Information</h3>
        <Label>Witness Name</Label>
        <div>
          <Text>{witnessName}</Text>
        </div>

        <Label>Witness Phone</Label>
        <div>
          <Text>{witnessPhone}</Text>
        </div>
      </StyledPegaCustomComponentsWitnessUtilityWrapper>
    </Configuration>
  );
}

PegaCustomComponentsWitnessUtility.defaultProps = {};

PegaCustomComponentsWitnessUtility.propTypes = {
  getPConnect: PropTypes.func.isRequired
};
