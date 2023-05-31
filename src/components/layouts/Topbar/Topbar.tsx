import React, { useState } from 'react';
import {
    Box,
    Button,
    IconButton,
    Link,
    Menu,
    MenuItem,
    TextField,
    Typography,
    useTheme,
    Stack,
    useMediaQuery
} from '@mui/material';
import { useRouter } from 'next/router';
import {ArrowDropDown, Favorite, Login, Menu as MenuIcon, Person, Search, ShoppingCart} from '@mui/icons-material';
import { alpha } from '@mui/system';
import {useAppSelector} from "@/redux/store";

interface TopbarProps {
    onSidebarOpen: () => void;
    colorInvert?: boolean;
}

const Topbar: React.FC<TopbarProps> = ({ onSidebarOpen, colorInvert = false }) => {
    const user = useAppSelector(state => state.user)
    const theme = useTheme();
    const router = useRouter();
    const isMd = useMediaQuery(theme.breakpoints.up('md'));
    const logoText = () => {
        if (isMd) {
            return 'PRICEHUNT';
        } else {
            return 'PH';
        }
    };

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            width={1}
            zIndex={2}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: colorInvert ? 'primary.main' : 'primary.main',
                    justifyContent: 'center',
                    color: colorInvert ? 'common.white' : 'common.white',
                    borderRadius: 2,
                    padding: 1,
                }}
            >
                <Typography
                    paddingLeft={1}
                >
                    <Link
                        color={'secondary.main'}
                        underline="none"
                        href="/"
                        marginRight={2}
                        fontSize={22}
                    >
                        <strong>{logoText()}</strong>
                    </Link>
                </Typography>

                <Box
                    sx={{
                        display: { xs: "none", md: "block" },
                        backgroundColor: colorInvert ? "primary.light" : "primary.light",
                        borderRadius: 2,
                        color: "text.secondary",
                        paddingX: 0.5,
                    }}
                >
                    <IconButton
                        size={"small"}
                        color="inherit"
                        aria-label="menu"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenuOpen}
                        sx={{
                            fontSize: 14,
                        }}
                    >
                        Каталог
                        <ArrowDropDown />
                    </IconButton>

                </Box>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center"
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center"
                    }}
                    open={open}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleMenuClose}>Пункт 1</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Пункт 2</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Пункт 3</MenuItem>
                </Menu>
            </Box>
            <Box marginLeft={2} display="flex" flexGrow={1} >
                <TextField
                    label="Поиск"
                    variant="filled"
                    size="small"
                    color="secondary"
                    fullWidth
                    InputProps={{
                        disableUnderline: true,
                        endAdornment: (
                            <IconButton
                                edge="end"
                                size="large"
                                type="submit"
                                aria-label="search"
                                color="inherit"
                            >
                                < Search />
                            </IconButton>
                        ),
                    }}
                />
            </Box>
            <Box marginLeft={2} sx={{ display: { xs: "none", md: "flex" } }} alignItems={"center"}>
                <Box>
                    <Link
                        color={router.pathname === "/favorite" ? "secondary.main" : "text.primary"}
                        fontWeight={router.pathname === "/favorite" ? 600 : 400}
                        underline="none"
                        href="/favorite"
                    >
                        <Stack alignItems="center">
                            <Favorite />
                            Избранное
                        </Stack>
                    </Link>
                </Box>
                <Box marginLeft={4}>
                    <Link
                        color={router.pathname === "/cart" ? "secondary.main" : "text.primary"}
                        fontWeight={router.pathname === "/cart" ? 600 : 400}
                        underline="none"
                        href="/cart"
                    >
                        <Stack alignItems="center">
                            <ShoppingCart />
                            Корзина
                        </Stack>
                    </Link>
                </Box>
                {!user.isAuthorized ? (
                    <Box marginLeft={4}>
                        <Link
                            color={["/login", "/registration"].includes(router.pathname) ? "secondary.main" : "text.primary"}
                            fontWeight={["/login", "/registration"].includes(router.pathname) ? 600 : 400}
                            underline="none"
                            href="/login"
                        >
                            <Stack alignItems="center">
                                <Login />
                                Войти
                            </Stack>
                        </Link>
                    </Box>
                ) : (
                    <Box marginLeft={4}>
                        <Link
                            color={router.pathname === "/profile" ? "secondary.main" : "text.primary"}
                            fontWeight={router.pathname === "/profile" ? 600 : 400}
                            underline="none"
                            href="/profile"
                        >
                            <Stack alignItems="center">
                                <Person />
                                {user.firstName}
                            </Stack>
                        </Link>
                    </Box>
                )}

            </Box>
            <Box bgcolor={"primary.main"}
                 marginLeft={2}
                 alignItems={"center"}
                 borderRadius={2}
                 padding={0.5}
                 sx={{
                     display: { xs: "block", md: "none" },
                 }}>
                <Button
                    onClick={() => onSidebarOpen()}
                    aria-label="Menu"
                    sx={{
                        borderRadius: 10,
                        minWidth: "auto",
                        padding: 1,
                        color : "common.white",
                        borderColor: alpha(theme.palette.divider, 0.2)
                    }}
                >
                    <MenuIcon />
                </Button>
            </Box>
        </Box>
    )
};

export default Topbar;
