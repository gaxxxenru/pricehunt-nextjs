import React, {useEffect} from 'react';
import Box from '@mui/material/Box';

import Main from '@/components/layouts/Main';
import Container from '@/components/Container';
import store, {AppThunkDispatch, useAppDispatch, useAppSelector} from "@/redux/store";
import {loadProduct} from "@/redux/slices/productsSlice";
import Typography from "@mui/material/Typography";
import {Grid, Tab, Tabs, useMediaQuery} from "@mui/material";
import {useRouter} from "next/router";
import {useTheme} from "@mui/material/styles";
import About from "@/components/Products/Product/About/About";
import Loader from "@/components/Loader";

interface ProductProps {
    slug: string | string[] | undefined;
}

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

const Product: React.FC<ProductProps> = ({slug}) => {
    const dispatch = store.dispatch as AppThunkDispatch
    const router = useRouter()
    const product = useAppSelector(state => state.products.product)
    const [value, setValue] = React.useState(0);
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('md'));

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    useEffect(() => {
        if (slug) {
            const slugString = Array.isArray(slug) ? slug[0] : slug;
            dispatch(loadProduct(slugString))
        }
    }, []);
    return (
        <Main>
            <Container>
                {!product ? <Loader/> :
                    <>
                        <Typography variant="subtitle1">
                            Каталог Смартфоны Apple
                        </Typography>
                        <Typography variant="h4" fontWeight="bold">
                            {product.name}
                        </Typography>
                        <Grid container>
                            <Grid item xs={12} md={12} marginY={1} boxShadow={1}>
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        bgcolor: 'primary.main',
                                        borderRadius: 2,
                                        display: 'flex',
                                        minWidth: 200,
                                    }}
                                >
                                    <Tabs
                                        orientation={"horizontal"}
                                        value={value}
                                        onChange={handleChange}
                                        aria-label="Меню"
                                        variant={"scrollable"}
                                        TabIndicatorProps={{
                                            style: {
                                                backgroundColor: "#8673E0",
                                            }
                                        }}
                                        sx={{
                                            borderBottom: isXs ? 2 : 0,
                                            borderBottomRightRadius: 8,
                                            borderTopRightRadius: 8,
                                            borderTopLeftRadius: 8,
                                            borderBottomLeftRadius: 8,
                                            borderColor: 'divider',
                                            bgcolor: 'primary.main',
                                        }}
                                    >
                                        <Tab label="Описание"/>
                                        <Tab label="Характеристики"/>
                                        <Tab label="Сравнить цены"/>
                                        <Tab label="История цен"/>
                                        <Tab label="Комментарии"/>
                                    </Tabs>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <TabPanel value={value} index={0} {...a11yProps(0)}>
                                    <About/>
                                </TabPanel>
                                <TabPanel value={value} index={1} {...a11yProps(1)}>
                                    Безопасность
                                </TabPanel>
                            </Grid>
                        </Grid>
                    </>
                }
            </Container>
        </Main>
    );
};

export default Product;
