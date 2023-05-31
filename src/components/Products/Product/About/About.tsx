import React from 'react';
import {useAppSelector} from "@/redux/store";
import {useRouter} from "next/router";
import {Grid, Stack, Paper, Button} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import {CreditCardOutlined, LocalShippingOutlined, LocationOnOutlined, ShoppingBagOutlined} from "@mui/icons-material";
import Link from "@mui/material/Link";
import {ArgumentAxis, Chart, ValueAxis, LineSeries} from "@devexpress/dx-react-chart-material-ui";
import {useTheme} from "@mui/material/styles";
import { scaleTime, scaleLinear } from 'd3-scale';
import {ArgumentScale, ValueScale, Animation} from "@devexpress/dx-react-chart";


function translateKey(key: string) {
    switch (key) {
        case 'color':
            return 'Цвет';
        case 'material':
            return 'Материал';
        case 'size':
            return 'Размер';
        default:
            return key;
    }
}

function pluralizeStores(count: number): string {
    const remainder10 = count % 10;
    const remainder100 = count % 100;

    if (remainder10 === 1 && remainder100 !== 11) {
        return 'магазин';
    } else if (remainder10 >= 2 && remainder10 <= 4 && (remainder100 < 10 || remainder100 > 20)) {
        return 'магазина';
    } else {
        return 'магазинов';
    }
}

interface Feature {
    key: string
    value: string
}

const format = (): ((tick: string) => string) => {
    return (tick: string) => {
        const date = new Date(tick);
        const month = date.toLocaleString('default', {month: '2-digit'});
        const day = date.toLocaleString('default', {day: '2-digit'});
        return `${month}.${day}`;
    };
};

const About = () => {
    const auth = useAppSelector(state => state.auth)
    const product = useAppSelector(state => state.products.product)
    const theme = useTheme();
    const router = useRouter()
    {
        !auth.isAuthenticated && router.push('/login')
    }
    return (
        <Grid container spacing={4} justifyContent="space-between" marginTop={1}>
            <Grid item xs={5}>
                <Grid container spacing={1} justifyContent="space-between">
                    <Grid item xs={3}>
                        <Stack spacing={1}>
                            <Image
                                src={product.images[0].url}
                                alt="ProductImage"
                                width={0}
                                height={0}
                                sizes="100vw"
                                priority
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: 8,
                                }}
                            />
                            <Image
                                src={product.images[0].url}
                                alt="ProductImage"
                                width={0}
                                height={0}
                                sizes="100vw"
                                priority
                                style={{width: '100%', height: 'auto', borderRadius: 8}}
                            />
                            <Image
                                src={product.images[0].url}
                                alt="ProductImage"
                                width={0}
                                height={0}
                                sizes="100vw"
                                priority
                                style={{width: '100%', height: 'auto', borderRadius: 8}}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={9}>
                        <Image
                            src={product.images[0].url}
                            alt="ProductImage"
                            width={0}
                            height={0}
                            sizes="100vw"
                            priority
                            style={{width: '100%', height: 'auto', borderRadius: 8}}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={3}>
                <Stack direction="row" spacing={1} justifyContent="space-between">
                    <Stack>
                        {product.features.map((feature: Feature, index: number) => (
                            <Paper key={index} elevation={0} style={{ marginBottom: 4 }}>
                                <Typography variant="body1">{translateKey(feature.key)}</Typography>
                            </Paper>
                        ))}
                    </Stack>
                    <Stack>
                        {product.features.map((feature: Feature, index: number) => (
                            <Paper key={index} elevation={0} style={{ marginBottom: 4 }}>
                                <Typography variant="body1">{feature.value}</Typography>
                            </Paper>
                        ))}
                    </Stack>

                </Stack>
            </Grid>
            <Grid item xs={4}>
                <Stack spacing={1}>
                    <Box bgcolor="primary.main" padding={2} borderRadius={2} boxShadow={1}>
                        <Stack spacing={1}>
                            <Typography
                                variant="h4"
                                fontWeight="bold"
                                textAlign="center"

                            >
                                {product.minPrice} ₽
                            </Typography>
                            <Button variant={"contained"} color={"secondary"}>
                                <Typography fontWeight="bold">
                                    В магазин
                                </Typography>
                            </Button>
                            <Typography variant="subtitle1" display="flex">
                                <ShoppingBagOutlined style={{
                                    marginRight: 4
                                }}/>
                                Доставка есть
                            </Typography>
                            <Typography variant="subtitle1" display="flex">
                                <LocalShippingOutlined style={{
                                    marginRight: 4
                                }}/>
                                Самовывоз есть
                            </Typography>
                            <Typography variant="subtitle1" display="flex">
                                <LocationOnOutlined style={{
                                    marginRight: 4
                                }}/>
                                Оплата картой и наличными
                            </Typography>
                            <Typography variant="subtitle1" display="flex">
                                <CreditCardOutlined style={{
                                    marginRight: 4
                                }}/>
                                М.Видео
                            </Typography>
                        </Stack>
                    </Box>
                    <Box bgcolor="primary.main" padding={2} borderRadius={2} boxShadow={1}>
                        <Link href="/">
                            <Typography variant="h6" textAlign="center" fontWeight="bold" color="secondary.main">
                                Ещё 1 магазин
                            </Typography>
                        </Link>
                    </Box>
                </Stack>
            </Grid>
            <Grid item xs={8}>
                <Box bgcolor="primary.main" padding={2} borderRadius={2} boxShadow={1}>
                    <Typography variant="h5">
                        Описание
                    </Typography>
                    <Typography variant="body1">
                        {product.description}
                    </Typography>
                </Box>

            </Grid>
            <Grid item xs={4}>
                <Box bgcolor="primary.main" padding={2} borderRadius={2} boxShadow={1}>
                    <Typography variant="h5">
                        Динамика цен
                    </Typography>
                    <Chart
                        height={200}
                        data={[
                            {argument: new Date(2023, 0, 1), price: 10},
                            {argument: new Date(2023, 0, 2), price: 500},
                            {argument: new Date(2023, 0, 3), price: 5000},
                            {argument: new Date(2023, 0, 4), price: 10},
                            {argument: new Date(2023, 0, 5), price: 500},
                            {argument: new Date(2023, 0, 6), price: 5000},
                            {argument: new Date(2023, 0, 7), price: 10},
                            {argument: new Date(2023, 0, 8), price: 500},
                            {argument: new Date(2023, 0, 9), price: 5000},

                        ]}
                    >
                        <ArgumentScale factory={scaleTime} />
                        <ValueScale factory={scaleLinear} />
                        <ArgumentAxis tickFormat={format} showLine={false} showTicks={false} />
                        <ValueAxis showGrid={false}/>

                        <LineSeries
                            valueField="price"
                            argumentField="argument"
                        />
                        <Animation />
                    </Chart>
                </Box>
            </Grid>
        </Grid>
    );
};

export default About;
