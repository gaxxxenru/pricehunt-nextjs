import React, {ReactNode, useState} from "react";
import {useTheme, useMediaQuery, Box, AppBar, Divider, useScrollTrigger} from '@mui/material'
import Footer from "@/components/layouts/Footer/Footer";
import Sidebar from "@/components/layouts/Sidebar/Sidebar";
import Topbar from "@/components/layouts/Topbar/Topbar";
import Categorybar from "@/components/layouts/Categorybar/Categorybar";
import Topnav from "@/components/layouts/Topnav/Topnav";
import Container from "@/components/Container";

interface MainProps {
    children?: ReactNode;
    colorInvert?: boolean;
    bgcolor?: string;
}

const Main: React.FC<MainProps> = ({children, colorInvert = false, bgcolor = "transparent"}) => {
    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up("md"), {
        defaultMatches: true
    });

    const [openSidebar, setOpenSidebar] = useState(false);

    const handleSidebarOpen = () => {
        setOpenSidebar(true);
    };

    const handleSidebarClose = () => {
        setOpenSidebar(false);
    };

    const open = isMd ? false : openSidebar;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 38
    });

    return (
        <Box>
            <Box bgcolor={bgcolor} position={"relative"} zIndex={theme.zIndex.appBar}>
                <Container sx={{
                    paddingTop: "8px !important",
                    paddingBottom: "0 !important",
                }}>
                    <Topnav colorInvert={colorInvert}/>
                </Container>
            </Box>
            <AppBar
                position="sticky"
                sx={{
                    top: 0,
                    backgroundColor: trigger ? theme.palette.background.paper : bgcolor,
                }}
                elevation={trigger ? 1 : 0}
            >
                <Container paddingY={1}>
                    <Topbar
                        onSidebarOpen={handleSidebarOpen}
                        colorInvert={trigger ? false : colorInvert}
                    />
                </Container>
            </AppBar>
            <Box bgcolor={bgcolor} position={"relative"} zIndex={1}>
                <Container sx={{
                    paddingTop: "8px !important",
                    paddingBottom: "0 !important",
                }}>
                    <Categorybar/>
                </Container>
            </Box>
            <Sidebar
                onClose={handleSidebarClose}
                open={open}
                variant="temporary"
            />
            <main>
                {children}
                <Divider/>
            </main>
            <Container sx={{
                paddingY: "4",
            }}>
                <Footer/>
            </Container>
        </Box>
    );
};

export default Main;
