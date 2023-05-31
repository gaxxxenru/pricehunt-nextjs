import React from 'react';
import Main from '@/components/layouts/Main';
import Container from '@/components/Container';
import {Grid, Box, Typography, Tab, Tabs, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import PersonalData from "@/components/User/Profile/PersonalData/PersonalData";
import store, {AppThunkDispatch} from "@/redux/store";
import {logout} from "@/redux/slices/authSlice";
import {useRouter} from "next/router";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const Profile: React.FC = () => {
    const dispatch = store.dispatch as AppThunkDispatch
    const router = useRouter()
    const [value, setValue] = React.useState(0);
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('md'));

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleLogout = () => {
        dispatch(logout()).finally(() => {
            router.push("/")
        })
    }

    return (
        <Main>
            <Container>
                <Typography variant={"h5"}>
                    Профиль
                </Typography>
                <Grid container>
                    <Grid item xs={12} md={2} marginY={1}>
                        <Box
                            sx={{
                                flexGrow: 1,
                                bgcolor: isXs ? 'primary.main' : 'transparent',
                                borderRadius: isXs ? 2 : 0,
                                display: 'flex',
                                minWidth: 200,
                            }}
                        >
                            <Tabs
                                orientation={isXs ? "horizontal" : "vertical"}
                                value={value}
                                onChange={handleChange}
                                aria-label="Меню"
                                variant={isXs ? "scrollable" : "standard"}
                                TabIndicatorProps={{
                                    style: {
                                        backgroundColor: "#8673E0",
                                    }
                                }}
                                sx={{
                                    borderRight: isXs ? 0 : 2,
                                    borderBottom: isXs ? 2 : 0,
                                    borderBottomRightRadius: 8,
                                    borderTopRightRadius: 8,
                                    borderTopLeftRadius: 8,
                                    borderBottomLeftRadius: 8,
                                    borderColor: 'divider',
                                    bgcolor: 'primary.main',
                                }}
                            >
                                <Tab label="Личные данные"/>
                                <Tab label="Безопасность"/>
                                <Tab label="Приватность"/>
                                <Tab label="Уведомления"/>
                                <Tab label="Поддержка"/>
                                <Tab onClick={handleLogout} label="Выйти"/>
                            </Tabs>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={10}>
                        <TabPanel value={value} index={0} {...a11yProps(0)}>
                            <PersonalData/>
                        </TabPanel>
                        <TabPanel value={value} index={1} {...a11yProps(1)}>
                            Безопасность
                        </TabPanel>
                    </Grid>

                </Grid>
            </Container>
        </Main>
    );
};

export default Profile;
