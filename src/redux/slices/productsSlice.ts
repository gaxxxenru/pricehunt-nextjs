import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_BASE_URL} from '../../../config';
import axios from "axios";
import {RootState} from "@/redux/store";

axios.defaults.baseURL = API_BASE_URL;


export const loadBriefProducts = createAsyncThunk(
    'products/brief',
    async (data: {
        size: number | undefined,
        page: number | undefined,
        priceFrom: number | undefined,
        priceTo: number | undefined,
        category: string | undefined,
        retailer: string | undefined,
        sortBy: string | undefined,
    }, {getState}) => {
        const {auth} = getState() as RootState;
        const response = await axios.get('/api/product/products/brief', {
            headers: {
                Authorization: `Bearer ${auth.access}`
            },
            params: {
                size: data.size,
                page: data.page,
                priceFrom: data.priceFrom,
                priceTo: data.priceTo,
                category: data.category,
                retailer: data.retailer,
                sortBy: data.sortBy,
            }
        });
        return response.data;
    }
);


export const loadProduct = createAsyncThunk(
    'products/product',
    async (slug: string, {getState}) => {
        const {auth} = getState() as RootState;
        const response = await axios.get(`/api/product/products/${slug}`, {
            headers: {
                Authorization: `Bearer ${auth.access}`
            }
        });
        return response.data;
    }
);


interface ProductBrief {
    id: number
    name: string
    imageUrl: string
    url: string
    lowestPrice: number
}

interface Retailer {
    id: number
    name: string
    imageUrl: string
}

interface ProductRetailer {
    id: string
    productId: number
    retailer: Retailer[]
    price: number
    deliveryPrice: number
}

interface Image {
    id: number
    name: string
    url: string
}

interface Feature {
    key: string
    value: string
}

interface Category {
    id: number
    name: string
    description: string
    slug: string
}

interface Product {
    id: number
    name: string
    description: string
    images: Image[]
    slug: string
    features: Feature[]
    productRetailers: ProductRetailer[]
    categories: Category[]
    lowestPrice: number
}


interface ProductsState {
    content: ProductBrief[];
    product: Product | undefined;
    pageable: {
        sort: {
            sorted: boolean
            unsorted: boolean
            empty: boolean
        },
        offset: number
        pageNumber: number
        pageSize: number
        unpaged: boolean
        paged: boolean
    },
    last: boolean
    totalElements: number
    totalPages: number
    size: number
    number: number
    sort: {
        empty: boolean
        sorted: boolean
        unsorted: boolean
    },
    first: boolean
    numberOfElements: number
    empty: boolean
    isLoaded: boolean;
    error: string | undefined;
}

const initialState: ProductsState = {
    content: [],
    product: undefined,
    pageable: {
        sort: {
            sorted: false,
            unsorted: true,
            empty: true,
        },
        offset: 0,
        pageNumber: 0,
        pageSize: 0,
        unpaged: true,
        paged: false
    },
    last: false,
    totalElements: 0,
    totalPages: 0,
    size: 0,
    number: 0,
    sort: {
        empty: true,
        sorted: false,
        unsorted: true,
    },
    first: true,
    numberOfElements: 0,
    empty: true,
    isLoaded: false,
    error: undefined,
}


const productsSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadBriefProducts.pending, (state) => {
                state.isLoaded = false;
                state.error = undefined;
            })
            .addCase(loadBriefProducts.fulfilled, (state, action) => {
                state.isLoaded = true;
                state.content = action.payload.content;
                state.pageable = action.payload.pageable;
                state.last = action.payload.last;
                state.totalElements = action.payload.totalElements;
                state.totalPages = action.payload.totalPages;
                state.size = action.payload.size;
                state.number = action.payload.number;
                state.sort = action.payload.sort;
                state.first = action.payload.first;
                state.numberOfElements = action.payload.numberOfElements;
                state.empty = action.payload.empty;
            })
            .addCase(loadBriefProducts.rejected, (state, action) => {
                state.isLoaded = false;
                state.error = action.error.message;
            })
            .addCase(loadProduct.pending, (state) => {
                state.isLoaded = false;
                state.error = undefined;
            })
            .addCase(loadProduct.fulfilled, (state, action) => {
                state.isLoaded = true;
                state.product = action.payload;
            })
            .addCase(loadProduct.rejected, (state, action) => {
                state.isLoaded = false;
                state.error = action.error.message;
            })
    },
});

export const {} = productsSlice.actions;
export default productsSlice.reducer;
