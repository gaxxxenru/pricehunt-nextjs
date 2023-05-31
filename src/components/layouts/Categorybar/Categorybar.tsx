import { Box, Link, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

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


const Categorybar: React.FC = () => {
    const router = useRouter();
    const [visible, setVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
        setPrevScrollPos(currentScrollPos);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);

    return (
        <Box
            sx={{
                display: { xs: "none", md: "flex" },
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'primary.main',
                borderRadius: '10px 10px 0 0',
                borderBottom: '2px solid',
                borderColor: 'primary.light',
                padding: 2,
                top: 0,
                zIndex: 100,
                transition: 'all 0.3s ease',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(-100%)',
                pointerEvents: visible ? 'auto' : 'none',
            }}
        >
            {categories.map((category) => (
                <Box key={category.id} marginRight={1}>
                    <Link
                        color={
                            router.pathname === `/category/${category.id}`
                                ? 'secondary.main'
                                : 'text.primary'
                        }
                        fontWeight={
                            router.pathname === `/category/${category.id}` ? 600 : 400
                        }
                        underline="none"
                        href={`/category/${category.id}`}
                    >
                        <Typography>{category.title}</Typography>
                    </Link>
                </Box>
            ))}
        </Box>
    );
};

export default Categorybar;
