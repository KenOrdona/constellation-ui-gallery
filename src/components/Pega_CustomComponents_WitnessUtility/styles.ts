// utilizing theming, comment out, if want individual style
import styled, { css } from 'styled-components';
import { Configuration } from '@pega/cosmos-react-core';

export default styled(Configuration)``;

export const StyledCard = styled.article(() => {
  return css`
    width: 25rem;
  `;
});
