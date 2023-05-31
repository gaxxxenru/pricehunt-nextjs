import React from "react";
import {Grid, Card, CardMedia, CardContent, Typography, IconButton, useTheme} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Image from "next/image";
import {useRouter} from "next/router";

interface Image {
    id: number
    name: string
    url: string
}

interface ProductCardProps {
    product: {
        id: number
        name: string
        images: Image[]
        slug: string
        minPrice: number
    };
}


const ProductCard: React.FC<ProductCardProps> = ({product}) => {

    const router = useRouter()
    const theme = useTheme()

    const handleFavoriteClick = () => {
        // Обработчик клика по кнопке избранного
    };

    const handleCardClick = () => {
        router.push("/product/" + product.slug)
    }

    return (
        <Grid item xs={6} sm={4} md={4} lg={2} xl={2}>
            <Card elevation={0} onClick={handleCardClick} sx={{
                bgcolor: "primary.main",
                ':hover': {
                    boxShadow: 20,
                    color: "secondary",
                    bgcolor: "secondary.light",
                    cursor: "pointer"
                }
            }}>
                <CardMedia
                >
                    <Image
                        src={product.images[0].url}
                        alt={product.images[0].name}
                        width={0}
                        height={0}
                        sizes="100vw"
                        priority
                        style={{width: '100%', height: 'auto'}}
                    />
                </CardMedia>
                <CardContent>
                    <Typography variant="h6">
                        {product.name}
                    </Typography>
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Typography variant="subtitle1">
                                {product.minPrice} ₽
                            </Typography>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleFavoriteClick} color={"secondary"}>
                                {/*{product.favorite ? (*/}
                                {/*    <FavoriteIcon color="primary"/>*/}
                                {/*) : (*/}
                                {/*    <FavoriteBorderIcon/>*/}
                                {/*)}*/}
                            </IconButton>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default ProductCard;
