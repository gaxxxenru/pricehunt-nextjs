import React, {FC} from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
// import {registerUser} from '../../../../actions/authActions';
import {useAppDispatch, useAppSelector} from "@/redux/store";
import {register} from "@/redux/slices/authSlice";
import {loadMe} from "@/redux/slices/userSlice";

interface RegistrationFormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const validationSchema = yup.object({
    firstName: yup
        .string()
        .trim()
        .min(2, 'Имя должно быть не менее 2 символов')
        .max(50, 'Имя должно быть не более 20 символов')
        .required('Пожалуйста, введите имя'),
    lastName: yup
        .string()
        .trim()
        .min(2, 'Фамилия должна быть не менее 2 символов')
        .max(30, 'Фамилия должна быть не более 30 символов')
        .required('Пожалуйста, введите фамилию'),
    email: yup
        .string()
        .trim()
        .email('Пожалуйста, введите корректный email')
        .required('Пожалуйста, введите email'),
    password: yup
        .string()
        .required('Пожалуйста, введите пароль')
        .min(6, 'Пароль должен быть не менее 6 символов'),
});

const RegistrationForm: FC = () => {
    const auth = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    const initialValues: RegistrationFormValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    };

    const onSubmit = (formData: RegistrationFormValues) => {
        dispatch(register(formData)).then(result => {
            if (register.fulfilled.match(result)) {
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
            boxShadow={1}>
            <Box marginBottom={4}>
                <Typography
                    sx={{
                        textTransform: 'uppercase',
                        fontWeight: 'medium',
                    }}
                    gutterBottom
                    color={'text.secondary'}
                >
                    Регистрация
                </Typography>
                <Typography
                    variant='h4'
                    sx={{
                        fontWeight: 700,
                    }}
                >
                    Создайте аккаунт
                </Typography>
                <Typography color='text.secondary'>
                    Заполните форму ниже, чтобы создать аккаунт
                </Typography>
            </Box>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant={'subtitle2'} sx={{marginBottom: 2}}>
                            Введите имя
                        </Typography>
                        <TextField
                            label='Имя *'
                            variant='outlined'
                            name={'firstName'}
                            fullWidth
                            color="secondary"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.firstName && Boolean(formik.errors.firstName)
                            }
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant={'subtitle2'} sx={{marginBottom: 2}}>
                            Введите фамилию
                        </Typography>
                        <TextField
                            label='Фамилия *'
                            variant='outlined'
                            name={'lastName'}
                            fullWidth
                            color="secondary"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={'subtitle2'} sx={{marginBottom: 2}}>
                            Введите email
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
                        <Typography variant={'subtitle2'} sx={{marginBottom: 2}}>
                            Введите пароль
                        </Typography>
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
                                    Уже есть аккаунт?{' '}
                                    <Link
                                        color={'secondary'}
                                        href={'/login'}
                                        underline={'none'}
                                    >
                                        Войти
                                    </Link>
                                </Typography>
                            </Box>
                            <Button color="secondary" size={'large'} variant={'contained'} type={'submit'}>
                                Зарегистрироваться
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography color={'error'}>
                            {auth.error}
                        </Typography>
                    </Grid>
                </Grid>
            </form>


        </Box>
    )
};

export default RegistrationForm;
