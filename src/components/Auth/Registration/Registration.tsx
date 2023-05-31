import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

import Main from '@/components/layouts/Main';
import Container from '@/components/Container';
import RegistrationForm from "@/components/Auth/Registration/RegistrationForm/RegistrationForm";


const Registration: React.FC = () => {
    const theme = useTheme();
    return (
        <Main>
            <Box
                sx={{
                    width: 1,
                    height: 1,
                    overflow: 'hidden',
                }}
            >
                <Container paddingX={0} paddingY={0} minWidth={{sm: 1, md: 1}}>
                    <Box
                        display={'flex'}
                        flexDirection={{xs: 'column', md: 'row'}}
                        position={'relative'}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Box
                            width={{xs: 1, md: 500}}
                            order={{xs: 2, md: 1}}
                            display={'flex'}
                            alignItems={'center'}
                        >
                            <Container>
                                <RegistrationForm/>
                            </Container>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Main>
    );
};

export default Registration;
