import React, {useEffect, useState} from "react";
import {Grid, Pagination} from "@mui/material";
import ProductCard from "@/components/Products/ProductsGrid/ProductCard/ProductCard";
import {useAppDispatch, useAppSelector} from "@/redux/store";
import {loadBriefProducts} from "@/redux/slices/productsSlice";

interface Image {
    id: number
    name: string
    url: string
}

interface ProductBrief {
    id: number
    name: string
    images: Image[]
    slug: string
    minPrice: number
}

const ProductsGrid: React.FC = ({}) => {
    const dispatch = useAppDispatch();
    const products = useAppSelector(state => state.products);

    const [size, setSize] = useState(12);
    const [page, setPage] = useState(0);
    const [sortBy, setSortBy] = useState('id');
    const [totalPages, setTotalPages] = useState(3);
    const [priceFrom, setPriceFrom] = useState(undefined);
    const [priceTo, setPriceTo] = useState(undefined);
    const [category, setCategory] = useState(undefined);
    const [retailer, setRetailer] = useState(undefined);


    useEffect(() => {
        dispatch(loadBriefProducts({size, page, priceFrom, priceTo, category, retailer, sortBy})).then(
            result => {
                if (loadBriefProducts.fulfilled.match(result)) {
                    setTotalPages(result.payload.totalPages)
                }
            }
        )
    }, [page]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value-1)
    }

    return (<>
            <Grid container spacing={2}>
                {products.content.map((product: ProductBrief) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
                <Grid marginTop={4} container justifyContent="center" alignItems="center" display="flex">
                    <Pagination color="secondary" page={page+1} count={totalPages} onChange={handlePageChange}
                                shape="rounded"/>
                </Grid>
            </Grid>
        </>
    )

}

export default ProductsGrid;
