import React from 'react';
import { Backdrop, CircularProgress } from "@mui/material";
import { Theme } from "@mui/material/styles";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const Loader: React.FC<LoaderProps> = (props: LoaderProps) => {
    return (
        <div {...props}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme: Theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
        </div>
    );
};

export default Loader;
