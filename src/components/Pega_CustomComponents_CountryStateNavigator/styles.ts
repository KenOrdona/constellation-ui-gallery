import styled, { css } from 'styled-components';

export const StyledCard = styled.article(() => {
  return css`
    width: 2.75rem;
    list-style: none;
    > li {
      display: contents;
      &:first-child {
        border-start-start-radius: inherit;
        border-start-end-radius: inherit;
      }
      &:last-child {
        border-end-start-radius: inherit;
        border-end-end-radius: inherit;
      }
    }
  `;
});
