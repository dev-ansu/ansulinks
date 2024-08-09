import { ReactNode } from "react";

interface SocialProps{
    url:string;
    children:ReactNode;
}

const Social = ({url, children}: SocialProps)=>{
    return(
        <a 
            rel="noopener noreferrer"
            target="_blank"
            href={url}
        >
            {children}
        </a>
    )
}

export default Social;