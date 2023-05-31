import React from 'react';
import {ThemeProvider} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import getTheme from '@/theme';
import {useAppSelector} from "@/redux/store";
import Loader from "@/components/Loader";

interface PageProps {
    children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({children}: PageProps) => {
    const auth = useAppSelector(state => state.auth)
    const user = useAppSelector(state => state.user)

    const isLoaded = (auth.isLoaded && user.isLoaded) || (auth.isLoaded && !auth.isAuthenticated)

    return (
        <>
            {isLoaded ? (
                <>
                    <ThemeProvider theme={getTheme({mode: 'dark'})}>
                        <CssBaseline/>
                        <Paper elevation={0}>{children}</Paper>
                    </ThemeProvider>
                </>
            ) : <Loader/>}
        </>
    );
};

export default Page;
