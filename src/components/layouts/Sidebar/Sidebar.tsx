import React from "react";
import { Box, Drawer } from '@mui/material';
import SidebarNav from "@/components/layouts/Sidebar/SidebarNav/SidebarNav";

interface SidebarProps {
    open: boolean;
    variant: string;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, variant, onClose }) => {
    return (
        <Drawer
            anchor="left"
            onClose={onClose}
            open={open}
            sx={{
                variant: {variant},
                '& .MuiPaper-root': {
                    width: '100%',
                    maxWidth: 280,
                    borderBottomRightRadius: 20,
                    borderTopRightRadius: 20,
                },
            }}
        >
            <Box
                sx={{
                    height: '100%',
                    padding: 1,
                }}
            >
                <SidebarNav />
            </Box>
        </Drawer>
    );
};

export default Sidebar;
