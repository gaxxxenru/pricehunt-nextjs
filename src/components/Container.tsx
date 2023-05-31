import React, { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
interface ContainerProps {
    children: ReactNode;
    [x: string]: any; // для остальных свойств, которые могут быть переданы в Box
}

const Container: FC<ContainerProps> = ({ children, ...rest }) => (
    <Box
        maxWidth={{ sm: 720, md: 1236 }}
        width={1}
        margin={'0 auto'}
        paddingX={2}
        paddingY={{ xs: 1, sm: 2, md: 3 }}
        {...rest}
    >
        {children}
    </Box>
);

export default Container;
