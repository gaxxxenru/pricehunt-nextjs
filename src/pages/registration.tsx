import React from "react";
import Registration from "@/components/Auth/Registration/Registration";
import {useAppSelector} from "@/redux/store";
import {useRouter} from "next/router";
import Loader from "@/components/Loader";


const RegistrationPage: React.FC = () => {
    const auth = useAppSelector(state => state.auth)
    const router = useRouter()
    {
        auth.isAuthenticated && router.push('/')
    }
    return (<>
            {!auth.isAuthenticated ? <Registration/> : <Loader/>}
        </>
    );
};

export default RegistrationPage;
