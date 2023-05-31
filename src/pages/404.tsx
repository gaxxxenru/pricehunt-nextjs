import {Box, Link, Typography} from '@mui/material';
import {SentimentVeryDissatisfied} from '@mui/icons-material';

export default function FourOhFour() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh'
            }}
        >
            <SentimentVeryDissatisfied
                color="secondary"
                sx={{fontSize: 100}}
            />
            <Typography
                variant="h1"
            >
                404
            </Typography>
            <Typography
                variant="h4"
            >
                Страница не найдена
            </Typography>
            <Link
                href="/"
                underline="none"
                color={"primary.contrastText"}
            >
                Вернуться на главную
            </Link>
        </Box>
    );
}
