import React from 'react';
import {Box, Button, Link, Typography, Stack, useTheme} from '@mui/material';
import { useRouter } from 'next/router';

interface SidebarNavProps {
    colorInvert?: boolean;
}

interface Category {
    id: number;
    title: string;
}

const categories: Category[] = [
    { id: 1, title: 'Категория 1' },
    { id: 2, title: 'Категория 2' },
    { id: 3, title: 'Категория 3' },
    { id: 4, title: 'Категория 4' },
    { id: 5, title: 'Категория 5' },
    { id: 6, title: 'Категория 6' },
    { id: 7, title: 'Категория 7' },
    { id: 8, title: 'Категория 8' },
];


const SidebarNav: React.FC<SidebarNavProps> = ({ colorInvert = false }) => {
    const theme = useTheme();
    const { mode } = theme.palette;
    const router = useRouter();

    return (
        <Stack
            alignItems={"left"}
            spacing={2}

        >
            <Box paddingY={1} bgcolor={"primary.main"} borderRadius={2}>
                <Typography
                    align={'center'}
                >
                    <Link
                        color={'secondary.main'}
                        underline="none"
                        href="/"
                        fontSize={22}
                    >
                        <strong>PRICEHUNT</strong>
                    </Link>
                </Typography>
            </Box>
            {categories.map((category) => (
                <Box key={category.id} paddingX={2}>
                    <Box marginBottom={1}>
                        <Link
                            color={"primary.contrastText"}
                            fontWeight={router.pathname === "/" ? 600 : 400}
                            underline="none"
                            href="/"
                            sx={{
                                '&:hover': {
                                    color: "red"
                                }
                            }}
                        >
                            {category.title}
                        </Link>
                    </Box>
                </Box>
            ))}
            <Box marginTop={1}>
                <Button
                    size={'large'}
                    variant="contained"
                    color="secondary"
                    fullWidth
                    href="/order"
                >
                    Все категории
                </Button>
            </Box>
        </Stack>
    );
};

export default SidebarNav;
