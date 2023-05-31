import type {AppProps} from 'next/app'
import {Provider} from "react-redux";
import store, {AppThunkDispatch} from "@/redux/store";
import Page from "@/components/Page";
import Head from "next/head";
import {useEffect} from "react";
import {refreshToken, validateToken} from "@/redux/slices/authSlice";
import {loadMe} from "@/redux/slices/userSlice";

export default function App({Component, pageProps}: AppProps) {

    const dispatch = store.dispatch as AppThunkDispatch

    useEffect(() => {
        dispatch(validateToken()).then((result) => {
            if (validateToken.fulfilled.match(result)) {
                dispatch(loadMe());
            } else
                dispatch(refreshToken()).then((result) => {
                    if (refreshToken.fulfilled.match(result)) {
                        dispatch(loadMe());
                    }
                });
        });
    }, [])

    return (
        <Provider store={store}>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <title>PriceHunt - Найди лучшую цену на необходимый товар </title>
            </Head>
            <Page>
                <Component {...pageProps} />
            </Page>
        </Provider>
    )
}
