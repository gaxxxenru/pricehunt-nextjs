import React from "react";
import {createTheme, responsiveFontSizes} from "@mui/material";
import {Shadows} from "@mui/material/styles/shadows";
import {dark, light} from "./palette";
import shadows from "./shadows";
import NextLink from "next/link";
import {LinkProps} from '@mui/material/Link';

interface PaletteMode {
    mode: 'light' | 'dark',
}

// const LinkBehaviour = forwardRef<HTMLAnchorElement, any>((props, ref) => (
//     <NextLink ref={ref} {...props}/>
// ));
// LinkBehaviour.displayName = "LinkBehaviour";


const LinkBehavior = React.forwardRef<
    any,
    { href: string }
>((props, ref) => {
    const {href, ...other} = props;
    // Map href (MUI) -> to (NextLink)
    return <NextLink href={href} passHref {...other} ref={ref}/>;
});
LinkBehavior.displayName = 'LinkBehavior';


const getTheme = ({mode}: PaletteMode) =>
    responsiveFontSizes(
        createTheme({
            palette: mode === 'light' ? light : dark,
            shadows: shadows(mode) as Shadows,
            typography: {
                fontFamily: "\"Proxima Nova\", sans-serif",
                button: {
                    textTransform: "none",
                    fontWeight: "medium"
                }
            },
            zIndex: {
                appBar: 1200,
                drawer: 1300
            },
            components: {
                MuiLink: {
                    defaultProps: {
                        component: LinkBehavior
                    } as LinkProps,
                    styleOverrides: {
                        root: {
                            cursor: "pointer",
                            "&:hover": {
                                color: "#8673E0",
                                transform: 'scale(1.05)',
                            },
                            transition: 'color 0.3s ease, transform 0.3s ease',

                        }
                    }
                },
                MuiButtonBase: {
                    defaultProps: {
                        LinkComponent: LinkBehavior
                    }

                },
                MuiButton: {
                    styleOverrides: {
                        root: {
                            fontWeight: 400,
                            borderRadius: 10,
                            paddingTop: 10,
                            paddingBottom: 10
                        },
                        containedSecondary: mode === 'light' ? {color: "white"} : {}
                    }
                },
                MuiInputBase: {
                    styleOverrides: {
                        root: {
                            borderRadius: 10
                        }
                    }
                },
                MuiTab: {
                    styleOverrides: {
                        root: {
                            "&.Mui-selected": {
                                color: "#8673E0",
                            }
                        }
                    }

                },
                MuiOutlinedInput: {
                    styleOverrides: {
                        root: {
                            borderRadius: 10,
                            backgroundColor: "#535353",

                        },
                        input: {
                            borderRadius: 10,
                        },
                    }
                },
                MuiFormHelperText: {
                    styleOverrides: {
                        root: {
                            color: "red",
                        }
                    }
                },
                MuiFilledInput: {
                    styleOverrides: {
                        root: {
                            backgroundColor: "#212121",
                            borderRadius: 10,
                            ":hover": {
                                backgroundColor: "#535353",
                            }
                        }
                    }
                },
                MuiCard: {
                    styleOverrides: {
                        root: {
                            borderRadius: 10
                        }
                    }
                },
                MuiPagination: {
                    styleOverrides: {
                        root: {
                            button: {
                                borderRadius: 8,
                                bgcolor: "red",
                            }
                        }
                    }
                }
            },
        })
    );

export default getTheme;
