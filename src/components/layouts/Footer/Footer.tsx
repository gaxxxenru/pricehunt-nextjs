import React from 'react';
import {useRouter} from "next/router";
import {Box, Grid, Link, Typography} from "@mui/material";


interface FooterProps {
    colorInvert?: boolean;
}

const Footer: React.FC<FooterProps> = ({ colorInvert = false }) => {
    const router = useRouter();

    return (
        <Grid container spacing={2} padding={3}>
            <Grid item xs={12}>
                <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    width={1}
                    flexDirection={{ xs: 'column', sm: 'row' }}
                >
                    <Link
                        color={"primary.contrastText"}
                        underline="none"
                        href="/"
                        fontSize={22}
                    >
                        <strong>PRICEHUNT</strong>
                    </Link>
                    <Box display='flex' flexWrap={'wrap'} alignItems={'center'}>
                        <Box marginTop={1} marginRight={2}>
                            <Link
                                color={router.pathname === "/about" ? "secondary.main" : "text.primary"}
                                fontWeight={router.pathname === '/about' ? 600 : 400}
                                underline='none'
                                href='/about'
                                variant={'subtitle2'}
                            >
                                О нас
                            </Link>
                        </Box>
                        <Box marginTop={1} marginRight={2}>
                            <Link
                                color={router.pathname === "/contacts" ? "secondary.main" : "text.primary"}
                                fontWeight={router.pathname === '/contacts' ? 600 : 400}
                                underline='none'
                                href='/contacts'
                                variant={'subtitle2'}
                            >
                                Контакты
                            </Link>
                        </Box>
                        <Box marginTop={1} marginRight={2}>
                            <Link
                                color={router.pathname === "/news" ? "secondary.main" : "text.primary"}
                                fontWeight={router.pathname === '/news' ? 600 : 400}
                                underline='none'
                                href='/news'
                                variant={'subtitle2'}
                            >
                                Новости
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Typography
                    align={'center'}
                    variant={'subtitle2'}
                    color='text.secondary'
                    gutterBottom
                >
                    &copy; PriceHunt. 2023, Москва, ул. Бориса Галушкина, д.9. Все права защищены.
                </Typography>
                <Typography
                    align={'center'}
                    variant={'caption'}
                    color='text.secondary'
                    component={'p'}
                >
                    Когда вы заходите на сайт, вы соглашаетесь с использованием файлов cookie.
                    Мы используем файлы cookie для того, чтобы улучшить ваше взаимодействие с сайтом, а также для анализа трафика.
                    Подробнее об использовании файлов cookie читайте в нашей Политике конфиденциальности.
                </Typography>
            </Grid>
        </Grid>
    );
};

export default Footer;
