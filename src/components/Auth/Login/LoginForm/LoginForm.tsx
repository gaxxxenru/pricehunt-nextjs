import React from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {login} from "@/redux/slices/authSlice";
import {useAppDispatch, useAppSelector} from "@/redux/store";
import {loadMe} from "@/redux/slices/userSlice";


interface LoginFormValues {
    email: string
    password: string
}

const validationSchema = yup.object({
    email: yup
        .string()
        .trim()
        .email('Пожалуйста, введите корректный email')
        .required('Почта обязательна'),
    password: yup
        .string()
        .required('Пожалуйста, введите пароль')
        .min(6, 'Пароль должен быть не менее 6 символов'),
});

const LoginForm: React.FC = () => {
    const auth = useAppSelector(state => state.auth)
    const initialValues: LoginFormValues = {
        email: '',
        password: '',
    };
    const dispatch = useAppDispatch()
    const onSubmit = (formData: LoginFormValues) => {
        dispatch(login(formData)).then(result => {
            if (login.fulfilled.match(result)) {
                dispatch(loadMe());
            }
        })
    };

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit: onSubmit,
    });

    return (
        <Box
            bgcolor={'primary.main'}
            padding={{xs: 2, sm: 4, md: 6}}
            borderRadius={8}
            boxShadow={1}
        >
            <Box marginBottom={4}>
                <Typography
                    sx={{
                        textTransform: 'uppercase',
                        fontWeight: 'medium',
                    }}
                    gutterBottom
                    color={'text.secondary'}
                >
                    Авторизация
                </Typography>
                <Typography
                    variant='h4'
                    sx={{
                        fontWeight: 700,
                    }}
                >
                    С возвращением!
                </Typography>
                <Typography color='text.secondary'>
                    Авторизуйтесь, чтобы продолжить
                </Typography>
            </Box>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant={'subtitle2'} sx={{marginBottom: 2}}>
                            Введите ваш email
                        </Typography>
                        <TextField
                            label='Email *'
                            variant='outlined'
                            name={'email'}
                            color="secondary"
                            fullWidth
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            display='flex'
                            flexDirection={{xs: 'column', sm: 'row'}}
                            alignItems={{xs: 'stretched', sm: 'center'}}
                            justifyContent={'space-between'}
                            width={1}
                            marginBottom={2}
                        >
                            <Box marginBottom={{xs: 1, sm: 0}}>
                                <Typography variant={'subtitle2'}>
                                    Введите ваш пароль
                                </Typography>
                            </Box>
                            <Typography variant={'subtitle2'}>
                                <Link
                                    component={'a'}
                                    color={'secondary'}
                                    href={'/restore'}
                                    underline={'none'}
                                >
                                    Забыли пароль?
                                </Link>
                            </Typography>
                        </Box>
                        <TextField
                            label='Пароль *'
                            variant='outlined'
                            name={'password'}
                            type={'password'}
                            color="secondary"
                            fullWidth
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography color={'error'}>
                            {auth.error}
                        </Typography>
                    </Grid>
                    <Grid item container xs={12}>
                        <Box
                            display='flex'
                            flexDirection={{xs: 'column', sm: 'row'}}
                            alignItems={{xs: 'stretched', sm: 'center'}}
                            justifyContent={'space-between'}
                            width={1}
                            maxWidth={600}
                            margin={'0 auto'}
                        >
                            <Box marginBottom={{xs: 1, sm: 0}}>
                                <Typography variant={'subtitle2'}>
                                    Нет аккаунта?{' '}
                                    <Link
                                        color={'secondary'}
                                        href={'/registration'}
                                        underline={'none'}
                                    >
                                        Зарегистрируйтесь
                                    </Link>
                                </Typography>
                            </Box>
                            <Button color="secondary" size={'large'} variant={'contained'} type={'submit'}>
                                Войти
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default LoginForm;

