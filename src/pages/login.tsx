import React from "react";
import Login from "@/components/Auth/Login/Login";
import {useAppSelector} from "@/redux/store";
import {useRouter} from "next/router";
import Loader from "@/components/Loader";


const LoginPage: React.FC = () => {
    const auth = useAppSelector(state => state.auth)
    const router = useRouter()
    {
        auth.isAuthenticated && router.push('/')
    }
    return (<>
            {!auth.isAuthenticated ? <Login/> : <Loader/>}
        </>
    );
};

export default LoginPage;
