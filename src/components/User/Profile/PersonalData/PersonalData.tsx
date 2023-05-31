import {
    Box,
    Switch,
    Typography,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid, useMediaQuery
} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import Image from 'next/image'
import {useState} from "react";
import {useTheme} from "@mui/material/styles";

const validationSchema = Yup.object({
    firstName: Yup.string().required("Обязательное поле"),
    lastName: Yup.string().required("Обязательное поле"),
    email: Yup.string().email("Неверный формат email").required("Обязательное поле"),
    phone: Yup.string().required("Обязательное поле"),
    gender: Yup.string().required("Обязательное поле"),
});

export const PersonalData = () => {
    const [subscriptions, setSubscriptions] = useState({offers: false, personal: false, favorites: false});
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            gender: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} justifyContent={"space-between"}>
                <Grid item xs={12} sm={4} bgcolor={"primary.main"} padding={2} borderRadius={2}
                      alignItems={"center"} display={"flex"} direction={"column"}>
                    <Typography fontWeight="bold" variant={"h6"}>Пользователь</Typography>
                    <Image
                        src="https://i.ibb.co/jzLkRd8/123431.png"
                        alt="Avatar"
                        width={160}
                        height={160}
                        style={{borderRadius: '15%'}}
                    />
                </Grid>
                <Grid item xs={12} sm={7} bgcolor={"primary.main"} padding={2} borderRadius={2}
                      marginTop={isSm ? 2 : 0}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography fontWeight="bold" variant={"h6"}>Основные данные</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Имя" name="firstName" value={formik.values.firstName}
                                       onChange={formik.handleChange} color={"secondary"} fullWidth
                                       size={isSm ? "small" : "medium"}
                                       error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                       helperText={formik.touched.firstName && formik.errors.firstName}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Фамилия" name="lastName" value={formik.values.lastName}
                                       onChange={formik.handleChange} color={"secondary"} fullWidth
                                       size={isSm ? "small" : "medium"}
                                       error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                       helperText={formik.touched.lastName && formik.errors.lastName}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Email" name="email" value={formik.values.email}
                                       onChange={formik.handleChange} color={"secondary"} fullWidth
                                       size={isSm ? "small" : "medium"}
                                       error={formik.touched.email && Boolean(formik.errors.email)}
                                       helperText={formik.touched.email && formik.errors.email}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Телефон" name="phone" value={formik.values.phone}
                                       onChange={formik.handleChange} fullWidth
                                       size={isSm ? "small" : "medium"}
                                       error={formik.touched.phone && Boolean(formik.errors.phone)}
                                       helperText={formik.touched.phone && formik.errors.phone}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Пол" name="gender" value={formik.values.gender}
                                       onChange={formik.handleChange} fullWidth
                                       size={isSm ? "small" : "medium"}
                                       error={formik.touched.gender && Boolean(formik.errors.gender)}
                                       helperText={formik.touched.gender && formik.errors.gender}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button color="secondary" sx={{height: "100%"}} variant={'contained'} type={'submit'}
                                    fullWidth>
                                <Typography fontWeight="bold">
                                    Сохранить
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container spacing={2} marginTop={isSm ? 2 : 4} justifyContent={"space-between"}>
                <Grid item xs={12} sm={7} bgcolor={"primary.main"} padding={2} borderRadius={2}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography fontWeight="bold" variant={"h6"}>Активные сеансы</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{display: 'flex', flexDirection: 'column', marginBottom: 2}}>
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Браузер</TableCell>
                                                <TableCell>IP</TableCell>
                                                <TableCell>Последний вход</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {/* здесь данные о сеансах */}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item xs={12} sm={4} bgcolor={"primary.main"} padding={2} borderRadius={2}
                      marginTop={isSm ? 2 : 0}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography fontWeight="bold" variant={"h6"}>Подписки</Typography>
                        </Grid>
                        <Grid item xs={6} display="flex" justifyContent="center" alignItems="center"
                              direction={"column"}>
                            <Switch checked={subscriptions.offers} color={"secondary"}
                                    onChange={() => setSubscriptions({
                                        ...subscriptions,
                                        offers: !subscriptions.offers
                                    })}/>
                            <Typography>Акции</Typography>
                        </Grid>
                        <Grid item xs={6} display="flex" justifyContent="center" alignItems="center"
                              direction={"column"}>
                            <Switch checked={subscriptions.favorites} color={"secondary"}
                                    onChange={() => setSubscriptions({
                                        ...subscriptions,
                                        favorites: !subscriptions.favorites
                                    })}/>
                            <Typography>Избранное</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container spacing={2} marginTop={isSm ? 2 : 4} justifyContent={"space-between"}>
                <Grid item xs={12} sm={5} bgcolor={"primary.main"} padding={2} borderRadius={2}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography fontWeight={"bold"} variant={"h6"}>Удаление аккаунта</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={"subtitle1"}>Вместе с аккаунтом все ваши данные будут
                                удалены</Typography>
                        </Grid>
                        <Grid item xs={12} display="flex" justifyContent="flex-end" alignItems="flex-end">
                            <Button variant={"contained"} color={"secondary"}>
                                <Typography fontWeight="bold">
                                    Удалить аккаунт
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item xs={12} sm={6} bgcolor={"primary.main"} padding={2} borderRadius={2}
                      marginTop={isSm ? 2 : 0}>
                    <Grid container spacing={1}>

                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
};

export default PersonalData;
