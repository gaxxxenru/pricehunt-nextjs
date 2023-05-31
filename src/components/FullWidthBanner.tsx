import React, {FC} from 'react';
import Image from "next/image";

interface BannerProps {
    imgSrc: string;
}


const Banner: FC<BannerProps> = ({imgSrc}) => {
    return (
        <Image
            src={imgSrc}
            alt="Banner"
            width={0}
            height={0}
            sizes="100vw"
            priority
            style={{ width: '100%', height: 'auto' }}
        />
    );
};

export default Banner;
