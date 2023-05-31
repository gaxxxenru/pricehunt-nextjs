import React from "react";
import {useAppSelector} from "@/redux/store";
import {useRouter} from "next/router";
import Loader from "@/components/Loader";
import Product from "@/components/Products/Product/Product";


const ProductPage: React.FC = () => {
    const auth = useAppSelector(state => state.auth)
    const router = useRouter()
    const {slug} = router.query
    {
        !auth.isAuthenticated && router.push('/')
    }
    return (<>
            {auth.isAuthenticated ? <Product slug={slug}/> : <Loader/>}
        </>
    );
};

export default ProductPage;
