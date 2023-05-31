import React, {useState} from 'react';
import { Box, Link, Typography, Select, MenuItem, SelectChangeEvent  } from '@mui/material';
import { useRouter } from 'next/router';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface TopnavProps {
    colorInvert?: boolean;
}

const Topnav: React.FC<TopnavProps> = ({ colorInvert = false }) => {
    const router = useRouter();
    const [currency, setCurrency] = useState<string>("RUB");
    const handleCurrencyChange = (event: SelectChangeEvent) => {
        setCurrency(event.target.value as string);
    };

    const NoIcon = () => null;

    return (
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} paddingX={1}>
            <Box display={"flex"} alignItems={"center"}>
                <Select
                    value={currency}
                    onChange={handleCurrencyChange}
                    variant={"standard"}
                    disableUnderline={true}
                    IconComponent={NoIcon}
                    sx={{
                        paddingTop: 0.25,
                        alignItems: "center",
                        verticalAlign: "center",
                        color: colorInvert ? "common.white" : "text.primary",
                        fontSize: 14,
                        fontWeight: 600,
                    }}
                >
                    <MenuItem value="RUB">RUB</MenuItem>
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                </Select>
                <LocationOnIcon
                    sx={{
                        display: { xs: "none", md: "flex" },
                        backgroundColor: "primary.dark",
                        fontSize: 16,
                }}
                />
                <Typography
                    sx={{ display: { xs: "none", md: "flex" } }}
                >
                    Москва
                </Typography>
            </Box>
            <Box display={"flex"} fontSize={14}>
                <Box>
                    <Link
                        color={router.pathname === "/about" ? "secondary.main" : "text.primary"}
                        fontWeight={router.pathname === "/about" ? 600 : 400}
                        underline="none"
                        href="/about"
                    >
                        О нас
                    </Link>
                </Box>
                <Box marginLeft={4}>
                    <Link
                        color={router.pathname === "/contacts" ? "secondary.main" : "text.primary"}
                        fontWeight={router.pathname === "/contacts" ? 600 : 400}
                        underline="none"
                        href="/contacts"
                    >
                        Контакты
                    </Link>
                </Box>
                <Box marginLeft={4}>
                    <Link
                        color={router.pathname === "/news" ? "secondary.main" : "text.primary"}
                        fontWeight={router.pathname === "/news" ? 600 : 400}
                        underline="none"
                        href="/news"
                    >
                        Новости
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default Topnav;
