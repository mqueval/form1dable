import React, { FC, useContext } from 'react';
import styled from 'styled-components';

import { FormidableContext } from '../../index';

const GridSC = styled.div`
  display: grid;
  column-gap: 1.5rem;
`;

const Grid: FC = ({ children, ...props }) => {
  const { sc } = useContext(FormidableContext);

  return (
    <GridSC as={sc && sc.grid} {...props}>
      {children}
    </GridSC>
  );
};
export default Grid;
