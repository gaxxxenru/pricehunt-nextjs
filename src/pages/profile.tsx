import React from "react";
import {useAppSelector} from "@/redux/store";
import {useRouter} from "next/router";
import Loader from "@/components/Loader";
import Profile from "@/components/User/Profile/Profile";


const ProfilePage: React.FC = () => {
    const auth = useAppSelector(state => state.auth)
    const router = useRouter()
    {
        !auth.isAuthenticated && router.push('/login')
    }
    return (<>
            {auth.isAuthenticated ? <Profile/> : <Loader/>}
        </>
    );
};

export default ProfilePage;
