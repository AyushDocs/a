import { useEffect, useState } from "react";

const ReactImage= (props:any)=> {
    const src=props.src
    const [loadedSrc, setLoadedSrc] = useState(null);
    useEffect(() => {
        setLoadedSrc(null);
        if (!src) return
        const handleLoad = () => setLoadedSrc(src)
        const image = new Image();
        image.addEventListener('load', handleLoad);
        image.src = src;
        return () => {
            image.removeEventListener('load', handleLoad);
        };
    }, [src]);
    if (loadedSrc !== src)  return null;
    return <img alt='' {...props}/>;
};
export default ReactImage